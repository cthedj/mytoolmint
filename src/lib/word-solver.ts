export const MAX_INPUT_LETTERS = 30;
export const MIN_WORD_LENGTH = 2;
export const MAX_WORD_LENGTH = 21;

export type SortMode = 'alphabetical' | 'longest' | 'shortest' | 'score';

export interface WordFilters {
  exactLength?: number;
  minLength?: number;
  maxLength?: number;
  startsWith?: string;
  endsWith?: string;
  contains?: string;
}

export interface SolveOptions {
  filters?: WordFilters;
  sort?: SortMode;
}

export interface WordResult {
  word: string;
  length: number;
  score: number;
}

export interface SolveResult {
  letters: string;
  results: WordResult[];
  total: number;
}

const TILE_VALUES: Readonly<Record<string, number>> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1,
  j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1,
  s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
};

export function sanitiseLetters(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, '').slice(0, MAX_INPUT_LETTERS);
}

export function sanitisePattern(value?: string): string {
  return (value ?? '').toLowerCase().replace(/[^a-z]/g, '');
}

export function tileScore(word: string): number {
  let score = 0;
  for (const letter of word.toLowerCase()) score += TILE_VALUES[letter] ?? 0;
  return score;
}

export function letterCounts(value: string): Uint8Array {
  const counts = new Uint8Array(26);
  for (const letter of value) {
    const index = letter.charCodeAt(0) - 97;
    if (index >= 0 && index < 26) counts[index] += 1;
  }
  return counts;
}

export function canBuildWord(word: string, available: Uint8Array): boolean {
  const used = new Uint8Array(26);
  for (const letter of word) {
    const index = letter.charCodeAt(0) - 97;
    if (index < 0 || index >= 26 || ++used[index] > available[index]) return false;
  }
  return true;
}

function normaliseLength(value: number | undefined): number | undefined {
  if (value === undefined || !Number.isFinite(value)) return undefined;
  return Math.max(MIN_WORD_LENGTH, Math.min(MAX_WORD_LENGTH, Math.trunc(value)));
}

function matchesFilters(word: string, filters: WordFilters): boolean {
  const exact = normaliseLength(filters.exactLength);
  const minimum = normaliseLength(filters.minLength);
  const maximum = normaliseLength(filters.maxLength);
  const starts = sanitisePattern(filters.startsWith);
  const ends = sanitisePattern(filters.endsWith);
  const contains = sanitisePattern(filters.contains);

  if (exact !== undefined && word.length !== exact) return false;
  if (exact === undefined && minimum !== undefined && word.length < minimum) return false;
  if (exact === undefined && maximum !== undefined && word.length > maximum) return false;
  if (starts && !word.startsWith(starts)) return false;
  if (ends && !word.endsWith(ends)) return false;
  if (contains && !word.includes(contains)) return false;
  return true;
}

function compareResults(mode: SortMode) {
  return (a: WordResult, b: WordResult): number => {
    if (mode === 'longest') return b.length - a.length || a.word.localeCompare(b.word);
    if (mode === 'shortest') return a.length - b.length || a.word.localeCompare(b.word);
    if (mode === 'score') return b.score - a.score || b.length - a.length || a.word.localeCompare(b.word);
    return a.word.localeCompare(b.word);
  };
}

export function solveWords(dictionary: readonly string[], rawLetters: string, options: SolveOptions = {}): SolveResult {
  const letters = sanitiseLetters(rawLetters);
  if (letters.length < MIN_WORD_LENGTH) return { letters, results: [], total: 0 };

  const available = letterCounts(letters);
  const filters = options.filters ?? {};
  const maximumCandidateLength = Math.min(letters.length, normaliseLength(filters.maxLength) ?? MAX_WORD_LENGTH);
  const seen = new Set<string>();
  const results: WordResult[] = [];

  for (const candidate of dictionary) {
    const word = candidate.toLowerCase();
    if (seen.has(word) || word.length < MIN_WORD_LENGTH || word.length > maximumCandidateLength) continue;
    if (!/^[a-z]+$/.test(word) || !matchesFilters(word, filters) || !canBuildWord(word, available)) continue;
    seen.add(word);
    results.push({ word, length: word.length, score: tileScore(word) });
  }

  results.sort(compareResults(options.sort ?? 'longest'));
  return { letters, results, total: results.length };
}

export function groupByLength(results: readonly WordResult[]): Map<number, WordResult[]> {
  const groups = new Map<number, WordResult[]>();
  for (const result of results) {
    const group = groups.get(result.length) ?? [];
    group.push(result);
    groups.set(result.length, group);
  }
  return groups;
}
