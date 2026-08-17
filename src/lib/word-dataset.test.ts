import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

interface Metadata {
  wordCount: number;
  contentSha256: string;
  buckets: Record<string, number>;
}

describe('generated word dataset', () => {
  it('matches its manifest and bucket invariants', async () => {
    const directory = resolve('public/data/words');
    const metadata: Metadata = JSON.parse(await readFile(resolve(directory, 'metadata.json'), 'utf8'));
    const allWords: string[] = [];

    for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
      const words: string[] = JSON.parse(await readFile(resolve(directory, `${letter}.json`), 'utf8'));
      expect(words).toHaveLength(metadata.buckets[letter]);
      expect(words.every((word) => word.startsWith(letter) && /^[a-z]{2,21}$/.test(word))).toBe(true);
      expect(words).toEqual([...words].sort());
      allWords.push(...words);
    }

    expect(allWords).toHaveLength(metadata.wordCount);
    expect(new Set(allWords).size).toBe(allWords.length);
    const checksum = createHash('sha256').update(`${allWords.join('\n')}\n`).digest('hex');
    expect(checksum).toBe(metadata.contentSha256);
  });
});
