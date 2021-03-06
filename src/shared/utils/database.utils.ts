export function patch<T>(entity: T, thePatch: Partial<T>): T {
  Object.entries(thePatch)
    .filter(([, value]) => value !== undefined)
    .forEach(([key, value]) => (entity[key] = value));

  return entity;
}
