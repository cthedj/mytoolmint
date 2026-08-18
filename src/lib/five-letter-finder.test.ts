import { describe, expect, it } from 'vitest';
import {
  conflictingFiveLetterFilters,
  findFiveLetterWords,
  sanitiseFiveLetterFilter,
  sanitiseFiveLetterPattern,
} from './five-letter-finder';

const words = ['alone', 'alert', 'alter', 'arise', 'aster', 'eager', 'rates', 'stare', 'store', 'tears', 'tests', 'tree', 'toolong'];

describe('five-letter input normalising', () => {
  it('normalises and pads position patterns', () => {
    expect(sanitiseFiveLetterPattern(' S-?R! ')).toBe('s?r??');
    expect(sanitiseFiveLetterPattern('STAREX')).toBe('stare');
  });

  it('keeps only five filter letters', () => {
    expect(sanitiseFiveLetterFilter(' A-E!Iou')).toBe('aeiou');
  });
});

describe('five-letter search', () => {
  it('matches fixed positions and only returns five-letter words', () => {
    const result = findFiveLetterWords(words, { pattern: 's??re' });
    expect(result.results.map(({ word }) => word)).toEqual(['stare', 'store']);
  });

  it('requires included letters and rejects excluded letters', () => {
    const result = findFiveLetterWords(words, { includes: 'ae', excludes: 'g' });
    expect(result.results.map(({ word }) => word)).toContain('alert');
    expect(result.results.map(({ word }) => word)).not.toContain('eager');
  });

  it('respects repeated required letters', () => {
    expect(findFiveLetterWords(words, { includes: 'ee' }).results.map(({ word }) => word)).toContain('eager');
    expect(findFiveLetterWords(words, { includes: 'ee' }).results.map(({ word }) => word)).not.toContain('tears');
  });

  it('sorts by tile score when requested', () => {
    const result = findFiveLetterWords(['fuzzy', 'arise'], { sort: 'score' });
    expect(result.results[0]?.word).toBe('fuzzy');
  });

  it('reports contradictory include and exclude filters', () => {
    expect(conflictingFiveLetterFilters({ pattern: 's????', includes: 'ae', excludes: 'sx' })).toEqual(['s']);
    expect(conflictingFiveLetterFilters({ includes: 'ae', excludes: 'ez' })).toEqual(['e']);
  });
});
