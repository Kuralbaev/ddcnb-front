const KZ_PHONE_LENGTH = 11;

function normalizeDigits(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.length > 0 && !digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  return digits.slice(0, KZ_PHONE_LENGTH);
}

export function formatKzPhone(value: string): string {
  const digits = normalizeDigits(value);

  if (!digits) return "";

  const national = digits.slice(1);
  const operator = national.slice(0, 3);
  const block1 = national.slice(3, 6);
  const block2 = national.slice(6, 8);
  const block3 = national.slice(8, 10);

  let result = "+7";

  if (operator) {
    result += ` (${operator}`;
  }

  if (operator.length === 3 && block1) {
    result += ")";
  }

  if (block1) {
    result += ` ${block1}`;
  }

  if (block1.length === 3 && block2) {
    result += `-${block2}`;
  }

  if (block2.length === 2 && block3) {
    result += `-${block3}`;
  }

  return result;
}

export function isKzPhoneComplete(value: string): boolean {
  return normalizeDigits(value).length === KZ_PHONE_LENGTH;
}
