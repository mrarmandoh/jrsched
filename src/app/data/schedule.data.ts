/**
 * Rotation matrix: each row is a week (0-indexed), each column is a day (Mon-Fri).
 * Values are group indices into the GROUPS array.
 *
 * Week 1: A B C D E
 * Week 2: B C D E A
 * Week 3: C D E A B
 * Week 4: D E A B C
 * Week 5: E A B C D
 */
export const ROTATION_MATRIX: number[][] = [
  [0, 1, 2, 3, 4],
  [1, 2, 3, 4, 0],
  [2, 3, 4, 0, 1],
  [3, 4, 0, 1, 2],
  [4, 0, 1, 2, 3],
];
