import { describe, expect, it } from 'vitest';
import { findWordleWords, sanitiseWordleMisplaced } from './wordle-solver';

const words = ['alert', 'alter', 'arise', 'aster', 'stare', 'store', 'tears'];

describe('Wordle solver', () => {
  it('normalises a misplaced-position pattern', () => {
    expect(sanitiseWordleMisplaced(' S-? ')).toBe('s????');
  });

  it('combines correct positions, misplaced letters and excluded letters', () => {
    const result = findWordleWords(words, { correct: 'a????', misplaced: '?t???', excluded: 'l' });
    expect(result.results.map(({ word }) => word)).toEqual(['aster']);
  });

  it('does not allow a misplaced letter to remain in its rejected position', () => {
    const result = findWordleWords(words, { misplaced: 's????' });
    expect(result.results.map(({ word }) => word)).toContain('tears');
    expect(result.results.map(({ word }) => word)).not.toContain('stare');
  });
});
