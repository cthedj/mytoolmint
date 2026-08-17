# Architecture decision

Status: Accepted — 17 August 2026

MyToolMint uses Astro, strict TypeScript and static output. Public content is rendered as HTML at build time. Interactive tools run selectively in the browser. Phase 1 has no backend, database, CMS, paid API, advertising or analytics.

## Rationale

- Static HTML provides a strong SEO and performance baseline.
- Astro ships no client JavaScript unless a component requires it.
- The Word Unscrambler can operate entirely from a local, preprocessed dataset.
- Cloudflare Pages can host the output on its free tier.
- A backend can be introduced for a future tool only when justified by an actual requirement.

## URL indexing policy

Search state may be stored in query parameters for sharing and restoration. Query combinations are not separate indexable pages. The canonical URL for all searches remains `/word-unscrambler`.
