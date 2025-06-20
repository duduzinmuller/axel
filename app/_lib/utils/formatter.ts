export function normalizeCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");

  const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");

  return formatted;
}

export function normalizeExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 2) {
    return digits;
  }

  const month = digits.slice(0, 2);
  const year = digits.slice(2, 4);

  return `${month}/${year}`;
}

export function normalizeCVV(value: string): string {
  return value.replace(/\D/g, "").slice(0, 4);
}
export function normalizeCPF(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  } else if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  } else {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
  }
}
