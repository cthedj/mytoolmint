# MyToolMint roadmap

## Current phase

Phase 1 implementation complete in code. Merge, production-domain connection and live launch checks remain.

## Completed

- Astro, strict TypeScript and static-first architecture
- Reusable mint, navy and neutral design system with responsive shell, brand mark and favicon
- Purposeful homepage, complete tools directory, About and public GitHub contact route
- 14 working launch tools: four word tools, five calculators and five converters
- 81,949-word ESDB/SCOWL dataset, pinned source, checksums, generator and public licence notices
- Efficient frequency-based solver, exact anagrams, blank-tile matching, filters, grouping, sorting and generic tile scores
- Client-side counter, calculator and conversion engines with unit tests
- Original explanatory content and limitations on every tool page
- Privacy Policy, Cookie Policy, Terms of Use and Disclaimer aligned to the current implementation
- Production canonicals, GitHub-review noindex protection, metadata, sitemap, robots.txt and appropriate structured data
- Automated unit, dataset, type and built-site checks

## Immediate next actions

1. Merge the complete-platform pull request and review the GitHub Pages deployment.
2. Connect `mytoolmint.com` to the selected production host.
3. Run final live-domain mobile, keyboard, accessibility and link checks.
4. Add and verify the production property in Google Search Console, then submit the sitemap.
5. Establish a privacy-respecting analytics baseline only if measurement needs justify it.

## Technical and SEO decisions

- Keep every launch tool static and browser-based; introduce a backend only for a concrete future requirement.
- Maintain one useful canonical page per tool and do not index arbitrary query combinations.
- Add tools only when their functionality and supporting content are complete.
- Keep GitHub Pages non-indexable while it serves as the review URL.
- Defer advertising until after the custom-domain launch, meaningful content review and a separate AdSense-readiness assessment.

## Known issues and external dependencies

- Clipboard actions require browser permission and work best over HTTPS.
- DNS, custom-domain hosting and Search Console require account-owner configuration outside the codebase.
- The tools are general utilities; word-game dictionaries, tax rules and financial outcomes vary and must be independently confirmed for high-stakes use.

## Future backlog after launch

- Observe real searches and user feedback before selecting the next tools.
- Candidate families: richer text tools, date/time utilities, financial calculators and additional converters.
- Add analytics only with a clear measurement question and matching privacy updates.
- Run an AdSense-readiness review after the site has genuine usage and a stable content footprint.
