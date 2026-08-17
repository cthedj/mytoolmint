# Word dataset decision

Status: Implemented and pinned.

## Source

The Phase 1 word list is generated reproducibly from the official American and British `-ise` size-60 English Speller Database/SCOWL plain word lists. The source is pinned to `en-wl/wordlist-diff` tag `rel-2026.02.25` and validated against recorded SHA-256 checksums.

## Intended filters

- lowercase ASCII alphabetic entries only
- exclude proper names, abbreviations, possessives and punctuation
- retain duplicate-letter words
- apply documented minimum and maximum lengths
- lengths from 2 through 21 characters

## Product wording

Results are words in the MyToolMint English word list. MyToolMint must not describe the list as an official tournament or publisher-approved word-game dictionary.

## Licence obligations

The required SCOWL copyright and permission notice is preserved in `THIRD_PARTY_NOTICES.md`, and the public `/word-list-and-scoring` page explains the dataset source, coverage and limitations.

The generator is `scripts/build-word-data.mjs`. It downloads or reads the two pinned source files, verifies their checksums, applies the documented filters, deduplicates and sorts the result, and writes one JSON bucket for each initial letter plus metadata. The generated word data is a build product; the pinned inputs and generator remain the source of truth.

Run against a local checkout of the generated upstream repository with:

```sh
npm run data:build -- --source-dir=/path/to/wordlist-diff
```
