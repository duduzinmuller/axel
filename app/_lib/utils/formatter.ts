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
  let v = value.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return v.slice(0, 14);
}
