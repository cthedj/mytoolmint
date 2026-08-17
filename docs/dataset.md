# Word dataset decision

Status: Accepted in principle; exact SCOWL release and generated profile must be pinned before production data is committed.

## Source

The Phase 1 word list will be generated reproducibly from the Spell Checker Oriented Word Lists (SCOWL), targeting general American and British English through approximately size 70.

## Intended filters

- lowercase alphabetic entries only
- exclude proper names, abbreviations, possessives and punctuation
- retain duplicate-letter words
- apply documented minimum and maximum lengths
- review highly obscure and sensitive entries before launch

## Product wording

Results are words in the MyToolMint English word list. MyToolMint must not describe the list as an official tournament or publisher-approved word-game dictionary.

## Licence obligations

Before the dataset is incorporated:

1. Pin the SCOWL release and source URL.
2. Preserve the full upstream copyright, permission notice and relevant source notices in `THIRD_PARTY_NOTICES.md`.
3. Document the generator options and category exclusions.
4. Record the generated file checksum, word count and compressed size.
5. Make the generation process reproducible; do not treat a copied word file as the source of truth.
