import { describe, expect, it } from 'vitest';
import { canBuildWord, canBuildWordWithWildcards, groupByLength, letterCounts, sanitiseLetters, sanitiseTiles, solveWords, tileScore, tileScoreFromTiles } from './word-solver';

const words = ['a', 'art', 'arts', 'aster', 'ear', 'east', 'eats', 'rate', 'rates', 'seat', 'stare', 'state', 'taste', 'teas', 'tests', 'treat', 'treats', 'zzz'];

describe('input sanitising', () => {
  it('normalises case, spaces and punctuation', () => expect(sanitiseLetters(' T-Ra eS! ')).toBe('traes'));
  it('removes non-English characters and limits long input', () => expect(sanitiseLetters(`é${'a'.repeat(40)}`)).toHaveLength(30));
  it('preserves question marks used as blank tiles', () => expect(sanitiseTiles(' ST-A?E! ')).toBe('sta?e'));
});

describe('letter accounting', () => {
  it('allows duplicate letters only when supplied', () => {
    expect(canBuildWord('state', letterCounts('state'))).toBe(true);
    expect(canBuildWord('state', letterCounts('stare'))).toBe(false);
  });
  it('uses question marks as single-letter wildcards', () => { expect(canBuildWordWithWildcards('state', 'sta??')).toBe(true); expect(canBuildWordWithWildcards('state', 'sta?')).toBe(false); });
});

describe('solver', () => {
  it('finds words without generating permutations', () => {
    const result = solveWords(words, 'TRAES');
    expect(result.results.map(({ word }) => word)).toContain('stare');
    expect(result.results.map(({ word }) => word)).not.toContain('state');
  });

  it('uses blank tiles while respecting every supplied letter', () => {
    const oneBlank = solveWords(words, 'sta?e');
    expect(oneBlank.results.map(({ word }) => word)).toContain('state');
    expect(oneBlank.results.map(({ word }) => word)).not.toContain('tests');

    const twoBlanks = solveWords(words, 'sta??');
    expect(twoBlanks.results.map(({ word }) => word)).toContain('state');
  });

  it('supports exact, minimum and maximum lengths', () => {
    expect(solveWords(words, 'TRAES', { filters: { exactLength: 4 } }).results.every((word) => word.length === 4)).toBe(true);
    expect(solveWords(words, 'TRAES', { filters: { minLength: 4, maxLength: 4 } }).results.every((word) => word.length === 4)).toBe(true);
  });

  it('supports combined pattern filters', () => {
    const result = solveWords(words, 'TRAES', { filters: { startsWith: 'E', endsWith: 'T', contains: 'AS' } });
    expect(result.results.map(({ word }) => word)).toEqual(['east']);
  });

  it('sorts alphabetically, longest, shortest and by score', () => {
    expect(solveWords(words, 'TRAES', { sort: 'alphabetical' }).results[0]?.word).toBe('art');
    expect(solveWords(words, 'TRAES', { sort: 'longest' }).results[0]?.length).toBe(5);
    expect(solveWords(words, 'TRAES', { sort: 'shortest' }).results[0]?.length).toBe(3);
    const scored = solveWords(['quiz', 'zips'], 'quizps', { sort: 'score' });
    expect(scored.results[0]?.word).toBe('quiz');
  });

  it('returns clear empty states for insufficient or unmatched input', () => {
    expect(solveWords(words, 'a').total).toBe(0);
    expect(solveWords(words, 'qq').total).toBe(0);
  });

  it('deduplicates dictionary entries and groups results', () => {
    const result = solveWords(['art', 'art', 'rate'], 'rate');
    expect(result.total).toBe(2);
    expect(groupByLength(result.results).get(3)?.[0]?.word).toBe('art');
  });
});

describe('tile score', () => {
  it('uses familiar English tile values', () => expect(tileScore('quiz')).toBe(22));
  it('scores letters represented by blank tiles as zero', () => expect(tileScoreFromTiles('quiz', 'qui?')).toBe(12));
});
