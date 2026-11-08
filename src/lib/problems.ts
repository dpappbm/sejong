// Content problems found while the site is rendered (missing translation, dead reference, …).
// The content test fails if this list is not empty.
export const problems: string[] = [];

export function reportProblem(message: string): void {
  problems.push(message);
}
