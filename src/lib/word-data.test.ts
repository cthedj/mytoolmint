import { describe, expect, it, vi } from 'vitest';
import { bucketLettersForInput, loadWordBuckets } from './word-data';

describe('word data buckets', () => {
  it('loads only unique possible starting-letter buckets', () => {
    expect(bucketLettersForInput('T-reaTs!')).toEqual(['a', 'e', 'r', 's', 't']);
  });

  it('loads every starting-letter bucket when a blank tile is supplied', () => {
    expect(bucketLettersForInput('tra?s')).toEqual('abcdefghijklmnopqrstuvwxyz'.split(''));
  });

  it('joins successfully loaded buckets', async () => {
    const fetcher = vi.fn(async (input: string | URL | Request) => {
      const letter = String(input).match(/([a-z])\.json$/)?.[1];
      return new Response(JSON.stringify(letter === 'a' ? ['art'] : ['tea']), { status: 200 });
    });
    await expect(loadWordBuckets('at', '/mytoolmint/', fetcher)).resolves.toEqual(['art', 'tea']);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('rejects missing or malformed bucket data', async () => {
    await expect(loadWordBuckets('a', '/', async () => new Response('', { status: 404 }))).rejects.toThrow('Unable to load');
    await expect(loadWordBuckets('a', '/', async () => new Response('{}', { status: 200 }))).rejects.toThrow('Invalid word data');
  });
});
