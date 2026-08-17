# Architecture decision

Status: Accepted — 17 August 2026

MyToolMint uses Astro, strict TypeScript and static output. Public content is rendered as HTML at build time. Interactive tools run selectively in the browser. Phase 1 has no backend, database, CMS, paid API, advertising or analytics.

## Rationale

- Static HTML provides a strong SEO and performance baseline.
- Astro ships no client JavaScript unless a component requires it.
- Word tools operate entirely from a local, preprocessed dataset.
- Counters, calculators and converters execute locally without server round trips.
- GitHub Pages can host the review build at no cost; Cloudflare Pages is the preferred free custom-domain production option.
- A backend can be introduced for a future tool only when justified by an actual requirement.

## URL indexing policy

Word Unscrambler search state is stored after the URL fragment marker (`#`) for sharing and restoration. Fragments are not sent to the host or treated as separate crawlable pages. The canonical URL remains the clean tool path, and search states are omitted from the sitemap.

## Tool-page layout rule

Every utility page uses the reusable ToolLayout with breadcrumbs, a concise H1, essential instructions, the interactive tool and original supporting content. The interface remains prominent on mobile and desktop. Supporting explanations, examples, limitations and FAQs follow the functional tool.

## Root URL and navigation

The root URL is an indexable MyToolMint brand homepage that links to every launch tool and makes the broader utility positioning clear. Each tool has one clean canonical URL. Primary navigation highlights the flagship tool and complete directory; company and legal links live in the footer.

## Deployment and indexing

The GitHub Pages deployment is a review environment and emits `noindex, nofollow` meta directives. Production canonicals always point to `https://mytoolmint.com`. The noindex directive is removed automatically when the same build is served with the production site URL. Query-string tool states canonicalise to the clean path and are not added to the sitemap.
