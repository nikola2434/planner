export function fillArray<T extends Record<string, any> & { x: number }, K>(
  array: T[],
  maxX: number,
  element: K = null,
): (T | K)[] {
  const res: (T | K)[] = Array(maxX).fill(element);

  for (const item of array) {
    res[item.x] = item;
  }

  return res;
}
