// src/utils/pathJoin.ts
export const pathJoin = (...args: string[]): string => {
  return args.join('/').replace(/\/+/g, '/');
};
