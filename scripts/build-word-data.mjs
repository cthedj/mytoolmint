import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

const RELEASE = 'rel-2026.02.25';
const SOURCE_REPOSITORY = 'https://github.com/en-wl/wordlist-diff';
const SOURCES = [
  { name: 'en_US.txt', sha256: '4ff7e0b6d86763e1e042ffd746e94cdf4432618702deac303a1669e2a838db04' },
  { name: 'en_GB-ise.txt', sha256: '82b22843c9958a1efac291e0ea7dbef22ce227dd4e5ca0fd84043cbc62e0a4f1' },
];
const MIN_LENGTH = 2;
const MAX_LENGTH = 21;
const outputDirectory = resolve('public/data/words');
const sourceDirectoryArgument = process.argv.find((value) => value.startsWith('--source-dir='));
const sourceDirectory = sourceDirectoryArgument?.split('=').slice(1).join('=');

async function sourceContent(source) {
  if (sourceDirectory) return readFile(join(sourceDirectory, basename(source.name)), 'utf8');
  const url = `https://raw.githubusercontent.com/en-wl/wordlist-diff/${RELEASE}/${source.name}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  return response.text();
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

const words = new Set();
for (const source of SOURCES) {
  const content = await sourceContent(source);
  const checksum = sha256(content);
  if (checksum !== source.sha256) throw new Error(`Checksum mismatch for ${source.name}: ${checksum}`);
  for (const rawWord of content.split(/\r?\n/)) {
    const word = rawWord.trim();
    if (word.length >= MIN_LENGTH && word.length <= MAX_LENGTH && /^[a-z]+$/.test(word)) words.add(word);
  }
}

const sortedWords = [...words].sort();
const buckets = Object.fromEntries('abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => [letter, []]));
for (const word of sortedWords) buckets[word[0]].push(word);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
for (const [letter, entries] of Object.entries(buckets)) {
  await writeFile(join(outputDirectory, `${letter}.json`), `${JSON.stringify(entries)}\n`);
}
await writeFile(
  join(outputDirectory, 'five-letter.json'),
  `${JSON.stringify(sortedWords.filter((word) => word.length === 5))}\n`,
);

const metadata = {
  schemaVersion: 1,
  sourceRepository: SOURCE_REPOSITORY,
  sourceRelease: RELEASE,
  sourceFiles: SOURCES,
  filters: { alphabet: 'a-z', lowercaseOnly: true, minLength: MIN_LENGTH, maxLength: MAX_LENGTH },
  wordCount: sortedWords.length,
  contentSha256: sha256(`${sortedWords.join('\n')}\n`),
  buckets: Object.fromEntries(Object.entries(buckets).map(([letter, entries]) => [letter, entries.length])),
};
await writeFile(join(outputDirectory, 'metadata.json'), `${JSON.stringify(metadata, null, 2)}\n`);
console.log(`Generated ${metadata.wordCount} words (${metadata.contentSha256}).`);
