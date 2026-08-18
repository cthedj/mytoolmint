import { letterCounts, tileScore } from './word-solver';

export const FIVE_LETTER_WORD_LENGTH = 5;

export type FiveLetterSortMode = 'alphabetical' | 'score';

export interface FiveLetterFilters {
  pattern?: string;
  includes?: string;
  excludes?: string;
  sort?: FiveLetterSortMode;
}

export interface FiveLetterResult {
  word: string;
  score: number;
}

export interface FiveLetterSearchResult {
  pattern: string;
  results: FiveLetterResult[];
  total: number;
}

export function sanitiseFiveLetterPattern(value = ''): string {
  return value
    .toLowerCase()
    .replace(/[^a-z?]/g, '')
    .slice(0, FIVE_LETTER_WORD_LENGTH)
    .padEnd(FIVE_LETTER_WORD_LENGTH, '?');
}

export function sanitiseFiveLetterFilter(value = ''): string {
  return value.toLowerCase().replace(/[^a-z]/g, '').slice(0, 26);
}

export function conflictingFiveLetterFilters(filters: FiveLetterFilters): string[] {
  const patternLetters = sanitiseFiveLetterPattern(filters.pattern).replaceAll('?', '');
  const includes = sanitiseFiveLetterFilter(filters.includes);
  const excludes = new Set(sanitiseFiveLetterFilter(filters.excludes));
  return [...new Set([...excludes].filter((letter) => patternLetters.includes(letter) || includes.includes(letter)))].sort();
}

export function findFiveLetterWords(
  dictionary: readonly string[],
  filters: FiveLetterFilters = {},
): FiveLetterSearchResult {
  const pattern = sanitiseFiveLetterPattern(filters.pattern);
  const includes = sanitiseFiveLetterFilter(filters.includes);
  const excludes = new Set(sanitiseFiveLetterFilter(filters.excludes));
  const requiredCounts = letterCounts(includes);
  const patternExpression = new RegExp(`^${pattern.replaceAll('?', '.')}$`);
  const seen = new Set<string>();
  const results: FiveLetterResult[] = [];

  for (const candidate of dictionary) {
    const word = candidate.toLowerCase();
    if (seen.has(word) || !/^[a-z]{5}$/.test(word) || !patternExpression.test(word)) continue;
    if ([...excludes].some((letter) => word.includes(letter))) continue;

    const candidateCounts = letterCounts(word);
    let includesEveryLetter = true;
    for (let index = 0; index < requiredCounts.length; index += 1) {
      if (candidateCounts[index] < requiredCounts[index]) {
        includesEveryLetter = false;
        break;
      }
    }
    if (!includesEveryLetter) continue;

    seen.add(word);
    results.push({ word, score: tileScore(word) });
  }

  results.sort(filters.sort === 'score'
    ? (a, b) => b.score - a.score || a.word.localeCompare(b.word)
    : (a, b) => a.word.localeCompare(b.word));

  return { pattern, results, total: results.length };
}
