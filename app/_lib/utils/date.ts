/**
 * Utilitários para trabalhar com datas no formato ISO string
 * (necessário para evitar problemas de serialização no Redux)
 */

/**
 * Converte uma string ISO para um objeto Date
 */
export const parseISODate = (isoString: string): Date => {
  return new Date(isoString);
};

/**
 * Converte um objeto Date para string ISO
 */
export const toISOString = (date: Date): string => {
  return date.toISOString();
};

/**
 * Formata uma string ISO para exibição
 */
export const formatISODate = (
  isoString: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const date = parseISODate(isoString);
  return date.toLocaleString("pt-BR", options);
};

/**
 * Formata uma string ISO para exibir apenas a hora
 */
export const formatISOTime = (isoString: string): string => {
  return formatISODate(isoString, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formata uma string ISO para exibir apenas a data
 */
export const formatISODateOnly = (isoString: string): string => {
  return formatISODate(isoString, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
