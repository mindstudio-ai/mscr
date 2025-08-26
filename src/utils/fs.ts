import fg from 'fast-glob';
export const glob = (pattern: string | string[]) =>
  fg(pattern, { dot: false, onlyFiles: true, followSymbolicLinks: true });
