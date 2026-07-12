const PLACEHOLDER_EMAILS = new Set([
  "",
  "your email",
  "email",
  "example@example.com",
]);

export function isValidAuthEmail(value: string): boolean {
  const normalizedEmail = value.trim().toLowerCase();

  if (PLACEHOLDER_EMAILS.has(normalizedEmail)) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
}
