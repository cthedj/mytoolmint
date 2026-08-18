# MyToolMint roadmap

## Current phase

Phase 1 is live at `mytoolmint.com`. The current phase is measured organic growth, beginning with the word-tools search cluster.

## Completed

- Astro, strict TypeScript and static-first architecture
- Reusable mint, navy and neutral design system with responsive shell, brand mark and favicon
- Purposeful homepage, complete tools directory, About and public GitHub contact route
- 15 working tools: five word tools, five calculators and five converters
- 81,949-word ESDB/SCOWL dataset, pinned source, checksums, generator and public licence notices
- Efficient frequency-based solver, exact anagrams, blank-tile matching, filters, grouping, sorting and generic tile scores
- Client-side counter, calculator and conversion engines with unit tests
- Original explanatory content and limitations on every tool page
- Privacy Policy, Cookie Policy, Terms of Use and Disclaimer aligned to the current implementation
- Production canonicals, GitHub-review noindex protection, metadata, sitemap, robots.txt and appropriate structured data
- Automated unit, dataset, type and built-site checks
- Accessible grouped tools menu in the primary navigation
- Complete Word Unscrambler embedded on the homepage, with its dedicated SEO page retained
- GitHub Pages workflow that adapts automatically to the review URL or production custom domain
- Google Search Console verification and successful sitemap submission
- Bing Webmaster Tools import and initial cross-engine keyword research
- Search-led positioning for Word Unscrambler, Word Finder and Anagram Solver
- Dedicated Five-Letter Word Finder with a compact lazy-loaded dataset, pattern filters and shareable hash state

## Immediate next actions

1. Review Google Search Console and Bing Webmaster data weekly for new queries, pages and indexing issues.
2. Earn the first organic impressions and click for the Word Unscrambler cluster.
3. Improve titles and supporting content only from real query and click-through evidence.
4. Build useful tools or content for validated adjacent intent without cloning thin landing pages.
5. Establish a privacy-respecting engagement baseline only when a clear measurement need justifies it.

## Technical and SEO decisions

- Keep every launch tool static and browser-based; introduce a backend only for a concrete future requirement.
- Maintain one useful canonical page per tool and do not index arbitrary query combinations.
- Add tools only when their functionality and supporting content are complete.
- Keep closely related phrases such as “unscramble words”, “unscramble letters” and “words from letters” on the canonical Word Unscrambler page rather than creating duplicate landing pages.
- Give a search intent its own page only when the interface and supporting guidance are materially different, as with the Five-Letter Word Finder.
- Keep the default GitHub Pages URL non-indexable; make only the verified `mytoolmint.com` production build indexable.
- Defer advertising until after the custom-domain launch, meaningful content review and a separate AdSense-readiness assessment.

## Known issues and external dependencies

- Clipboard actions require browser permission and work best over HTTPS.
- GitHub Pages domain settings, Afrihost DNS and Search Console require account-owner configuration outside the codebase.
- The tools are general utilities; word-game dictionaries, tax rules and financial outcomes vary and must be independently confirmed for high-stakes use.

## Future backlog after launch

- Observe real searches and user feedback before selecting the next tools after the Five-Letter Word Finder.
- Candidate families: richer text tools, date/time utilities, financial calculators and additional converters.
- Add analytics only with a clear measurement question and matching privacy updates.
- Run an AdSense-readiness review after the site has genuine usage and a stable content footprint.
