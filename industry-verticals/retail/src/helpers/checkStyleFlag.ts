import { StyleFlag } from '@/types/styleFlags';

export const checkStyleFlag = (styles: string | undefined, flag: StyleFlag): boolean => {
  if (!styles) return false;
  const tokens = styles.split(/\s+/).map((s) => s.trim());
  return tokens.includes(flag);
};
