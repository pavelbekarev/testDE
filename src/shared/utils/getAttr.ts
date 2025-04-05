/**
 * Удаляет квадратные скобки с обеих сторон строки.
 *
 * @param {string} str
 * @return {string}
 */
export const getAttr = (str) => {
  return str.replace(/^\[|\]$/g, "").trim();
};
