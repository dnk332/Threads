export function getRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function getRandomNumber(fromZeroTo: number): number {
  return Math.floor(Math.random() * fromZeroTo);
}
