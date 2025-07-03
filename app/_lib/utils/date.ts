export const parseISODate = (isoString: string): Date => {
  return new Date(isoString);
};

export const toISOString = (date: Date): string => {
  return date.toISOString();
};

export const formatISODate = (
  isoString: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const date = parseISODate(isoString);
  return date.toLocaleString("pt-BR", options);
};

export const formatISOTime = (isoString: string): string => {
  return formatISODate(isoString, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatISODateOnly = (isoString: string): string => {
  return formatISODate(isoString, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
