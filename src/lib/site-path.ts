export function pagePath(value: string, base = '/') {
  const normalisedBase = base === '/' ? '/' : `/${base.replace(/^\/+|\/+$/g, '')}/`;
  const normalisedValue = value.replace(/^\/+|\/+$/g, '');

  return normalisedValue ? `${normalisedBase}${normalisedValue}/` : normalisedBase;
}
