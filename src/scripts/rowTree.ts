// The checkbox tree of a lesson's rows (src/components/LessonRowTree.astro) inside the export and flash-card dialogs.

export type Row = [korean: string, hungarian: string];

export interface RowGroup {
  /** The "data-tree-rows" key of the leaf checkbox ("point-2-examples", "vocabulary-textbook"). */
  key: string;
  rows: Row[];
}

const checkboxes = (root: ParentNode, selector: string) => Array.from(root.querySelectorAll<HTMLInputElement>(`input[type="checkbox"]${selector}`));

/** The rows of the checked leaf checkboxes in page order; a row that occurs twice is kept once, at its first place. */
export function selectedGroups(dialog: HTMLElement): RowGroup[] {
  const data = JSON.parse(dialog.querySelector('[data-tree-data]')?.textContent || '{}') as Record<string, Row[]>;
  const seen = new Set<string>();
  return checkboxes(dialog, '[data-tree-rows]:checked').map(checkbox => {
    const key = checkbox.dataset.treeRows!;
    const rows = (data[key] ?? []).filter(row => {
      const rowKey = row.join('\t');
      if (seen.has(rowKey)) return false;
      seen.add(rowKey);
      return true;
    });
    return { key, rows };
  });
}

export const selectedRows = (dialog: HTMLElement): Row[] => selectedGroups(dialog).flatMap(group => group.rows);

/** Everything selected again. */
export function resetTree(dialog: HTMLElement): void {
  for (const checkbox of checkboxes(dialog, ':not(:disabled)')) {
    checkbox.checked = true;
    checkbox.indeterminate = false;
  }
}

/** A parent is checked if all of its children are, and indeterminate if only some are. */
function updateParents(dialog: HTMLElement): void {
  for (const parent of checkboxes(dialog, '[data-tree-parent]')) {
    const children = checkboxes(dialog, `[data-tree-child-of="${parent.dataset.treeParent}"]`);
    const checkedCount = children.filter(child => child.checked).length;
    parent.checked = checkedCount > 0 && checkedCount === children.length;
    parent.indeterminate = checkedCount > 0 && checkedCount < children.length;
  }
}

/** Follows a changed checkbox of the tree: a parent sets its children, then the parents follow their children. */
export function applyTreeChange(dialog: HTMLElement, checkbox: HTMLInputElement): void {
  if (checkbox.dataset.treeParent) {
    for (const child of checkboxes(dialog, `[data-tree-child-of="${checkbox.dataset.treeParent}"]`)) child.checked = checkbox.checked;
  }
  updateParents(dialog);
}

/** Whether an event target is a checkbox of the tree in this dialog. */
export const isTreeCheckbox = (dialog: HTMLElement, target: EventTarget | null): target is HTMLInputElement =>
  target instanceof HTMLInputElement && target.type === 'checkbox' && !!target.closest('.row-tree') && dialog.contains(target);
