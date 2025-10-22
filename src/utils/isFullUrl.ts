export function isFullUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
