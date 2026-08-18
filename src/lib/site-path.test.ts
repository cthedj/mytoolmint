import { describe, expect, it } from 'vitest';
import { pagePath } from './site-path';

describe('pagePath', () => {
  it('keeps the production homepage at the root', () => {
    expect(pagePath('/')).toBe('/');
  });

  it('adds a trailing slash to production page paths', () => {
    expect(pagePath('/word-unscrambler')).toBe('/word-unscrambler/');
  });

  it('preserves an existing trailing slash', () => {
    expect(pagePath('/tools/')).toBe('/tools/');
  });

  it('supports the GitHub Pages preview base path', () => {
    expect(pagePath('/tools', '/mytoolmint/')).toBe('/mytoolmint/tools/');
  });
});
