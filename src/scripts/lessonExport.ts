// The lesson export dialog (src/components/LessonExportDialog.astro): row tree, live preview, copy to clipboard.
// The dialog is part of the swapped page content, so it is looked up on every event; the listeners are bound once.
import { exportText } from '../lib/exportFormat';
import { applyTreeChange, isTreeCheckbox, resetTree, selectedRows } from './rowTree';

const exportDialog = () => document.getElementById('lesson-export-dialog') as HTMLDialogElement | null;

function setStatus(dialog: HTMLDialogElement, text: string): void {
  const status = dialog.querySelector('[data-export-status]');
  if (status) status.textContent = text;
}

function updatePreview(dialog: HTMLDialogElement): void {
  const rows = selectedRows(dialog);
  const count = dialog.querySelector('[data-export-count]');
  if (count) count.textContent = String(rows.length);
  const body = dialog.querySelector('[data-export-preview]');
  if (body) {
    body.replaceChildren(...rows.map(([korean, hungarian]) => {
      const row = document.createElement('tr');
      const koreanCell = document.createElement('td');
      koreanCell.className = 'korean';
      koreanCell.textContent = korean;
      const hungarianCell = document.createElement('td');
      hungarianCell.textContent = hungarian;
      row.append(koreanCell, hungarianCell);
      return row;
    }));
  }
  const copyButton = dialog.querySelector<HTMLButtonElement>('[data-export-copy]');
  if (copyButton) copyButton.disabled = rows.length === 0;
}

/** Every opening starts with everything selected and the preview collapsed. */
function openExportDialog(dialog: HTMLDialogElement): void {
  resetTree(dialog);
  const preview = dialog.querySelector<HTMLDetailsElement>('details.export-preview');
  if (preview) preview.open = false;
  setStatus(dialog, '');
  updatePreview(dialog);
  dialog.showModal();
}

async function copyText(text: string, dialog: HTMLDialogElement): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // No clipboard permission or an insecure context: fall back to copying from a temporary text field.
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.className = 'export-copy-fallback';
    dialog.append(field); // inside the modal dialog, otherwise it cannot be focused
    field.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    }
    field.remove();
    return copied;
  }
}

document.addEventListener('click', event => {
  const target = event.target as Element;
  const dialog = exportDialog();
  if (!dialog) return;
  if (target.closest('.export-button')) {
    openExportDialog(dialog);
  } else if (target.closest('[data-export-close]') || target === dialog) {
    // A click on the dialog element itself is a click on the backdrop.
    dialog.close();
  } else if (target.closest('[data-export-copy]')) {
    const rows = selectedRows(dialog);
    void copyText(exportText(rows), dialog).then(copied => {
      setStatus(dialog, copied ? `Kimásolva: ${rows.length} sor` : 'A másolás nem sikerült – nyisd ki a sorokat, és jelöld ki kézzel.');
    });
  }
});

document.addEventListener('change', event => {
  const dialog = exportDialog();
  if (!dialog || !isTreeCheckbox(dialog, event.target)) return;
  applyTreeChange(dialog, event.target);
  setStatus(dialog, '');
  updatePreview(dialog);
});

// A page change swaps the dialog away; close it first so the modal state does not linger.
document.addEventListener('astro:before-swap', () => {
  const dialog = exportDialog();
  if (dialog?.open) dialog.close();
});
