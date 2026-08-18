import { sanitiseLetters, sanitiseTiles } from './word-solver';

export type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function bucketLettersForInput(rawLetters: string): string[] {
  if (sanitiseTiles(rawLetters).includes('?')) return ALPHABET;
  return [...new Set(sanitiseLetters(rawLetters))].sort();
}

export async function loadWordBuckets(
  rawLetters: string,
  baseUrl = '/',
  fetcher: FetchLike = fetch,
): Promise<string[]> {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const buckets = bucketLettersForInput(rawLetters);
  const responses = await Promise.all(
    buckets.map(async (letter) => {
      const response = await fetcher(`${base}data/words/${letter}.json`);
      if (!response.ok) throw new Error(`Unable to load word data for “${letter}”.`);
      const words: unknown = await response.json();
      if (!Array.isArray(words) || words.some((word) => typeof word !== 'string')) {
        throw new Error(`Invalid word data for “${letter}”.`);
      }
      return words as string[];
    }),
  );
  return responses.flat();
}
