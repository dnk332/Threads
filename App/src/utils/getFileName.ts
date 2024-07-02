export function getFileName(uri: string) {
  if (uri) {
    return uri.substring(uri.lastIndexOf('/') + 1);
  }
  return null;
}
