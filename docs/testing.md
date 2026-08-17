# Testing plan

## Automated coverage

- Solver sanitisation, uppercase/lowercase handling, duplicates, filters, sorting, grouping and wildcard allocation
- Dataset format, expected buckets, word coverage and duplicate-letter examples
- Percentage, age, VAT, budget, savings and every unit-conversion engine
- Type and Astro template diagnostics
- Static output for every launch route, with title, description, robots directive, canonical and exactly one H1

Run `npm test`, `npm run check` and `npm run build` before merging.

## Manual launch checks

- Search with a single letter, punctuation-only input, spaces, mixed case, duplicate letters, a long input and a no-result rack.
- Exercise every length and pattern filter, every sort mode, grouped/ungrouped results, copy, reset, share and restored URL state.
- Test anagrams, blank tiles, fixed-position patterns and text counting with empty, multiline and punctuation-heavy text.
- Check zero divisors, negative change, invalid date order, leap dates, zero VAT, negative budget balance, zero interest and same-unit conversions.
- Use keyboard-only navigation, visible focus, screen-reader announcements and 320px-wide layout checks.
- Confirm all navigation, policy, dataset and external GitHub links on the production domain.
