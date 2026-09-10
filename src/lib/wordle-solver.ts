import { findFiveLetterWords, sanitiseFiveLetterPattern, type FiveLetterResult } from './five-letter-finder';

export interface WordleFilters {
  correct?: string;
  misplaced?: string;
  excluded?: string;
}

export interface WordleSearchResult {
  correct: string;
  misplaced: string;
  excluded: string;
  results: FiveLetterResult[];
}

export function sanitiseWordleMisplaced(value = ''): string {
  return sanitiseFiveLetterPattern(value);
}

export function findWordleWords(dictionary: readonly string[], filters: WordleFilters = {}): WordleSearchResult {
  const correct = sanitiseFiveLetterPattern(filters.correct);
  const misplaced = sanitiseWordleMisplaced(filters.misplaced);
  const excluded = (filters.excluded ?? '').toLowerCase().replace(/[^a-z]/g, '');
  const requiredLetters = [...misplaced].filter((letter) => letter !== '?').join('');
  const candidates = findFiveLetterWords(dictionary, {
    pattern: correct,
    includes: requiredLetters,
    excludes: excluded,
  }).results;
  const results = candidates.filter(({ word }) => [...misplaced].every((letter, index) => letter === '?' || word[index] !== letter));

  return { correct, misplaced, excluded, results };
}
