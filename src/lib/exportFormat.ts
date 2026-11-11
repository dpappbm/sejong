// The text format of the lesson export, shared by the build (tests) and the browser script.

/** One "korean<TAB>hungarian" line per row, each line closed by a line break (the format flash-card tools import). */
export const exportText = (rows: [korean: string, hungarian: string][]) => rows.map(([korean, hungarian]) => `${korean}\t${hungarian}\n`).join('');
