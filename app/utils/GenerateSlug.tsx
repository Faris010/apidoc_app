export function GenerateSlug(text: string): string {
  return text?.replace(/\s+/g, '-');
}
