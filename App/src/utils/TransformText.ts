export function snakeToCamel(snakeStr: string): string {
  // Handle empty strings
  if (!snakeStr) {
    return snakeStr;
  }
  return snakeStr.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
export function transformObjectKeysToCamelCase(obj: any): {[key: string]: any} {
  const transformed: {[key: string]: any} = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      transformed[snakeToCamel(key)] = obj[key];
    }
  }

  return transformed;
}
