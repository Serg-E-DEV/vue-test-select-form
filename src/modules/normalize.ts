export function normalizeInput(inputText: string): string {
  if (!inputText) {
    return '';
  }
  return inputText.trim();
}
