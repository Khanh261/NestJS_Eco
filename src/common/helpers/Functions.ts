export function toSlug(str: string, character?: string) {
  character = character ? character : '-';
  let strSlug = str.toLowerCase();

  strSlug = strSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  strSlug = strSlug.replace(/[^0-9a-z-\s]/g, '');
  strSlug = strSlug.replace(/(\s+)/g, character);
  strSlug = strSlug.replace(/-+/g, character);
  strSlug = strSlug.replace(/[đD]/g, 'd');

  strSlug = strSlug.replace(/-+|-s+$/g, '');
  strSlug = strSlug.replace(/^_+|_+$/g, '');

  return strSlug;
}
