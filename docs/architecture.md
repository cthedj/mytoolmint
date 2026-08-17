# Architecture decision

Status: Accepted — 17 August 2026

MyToolMint uses Astro, strict TypeScript and static output. Public content is rendered as HTML at build time. Interactive tools run selectively in the browser. Phase 1 has no backend, database, CMS, paid API, advertising or analytics.

## Rationale

- Static HTML provides a strong SEO and performance baseline.
- Astro ships no client JavaScript unless a component requires it.
- Word tools operate entirely from a local, preprocessed dataset.
- Counters, calculators and converters execute locally without server round trips.
- GitHub Pages hosts both the review build and the custom-domain production site at no cost, keeping deployment simple and tied to the existing public repository.
- A backend can be introduced for a future tool only when justified by an actual requirement.

## URL indexing policy

Word Unscrambler search state is stored after the URL fragment marker (`#`) for sharing and restoration. Fragments are not sent to the host or treated as separate crawlable pages. The canonical URL remains the clean tool path, and search states are omitted from the sitemap.

## Tool-page layout rule

Every utility page uses the reusable ToolLayout with breadcrumbs, a concise H1, essential instructions, the interactive tool and original supporting content. The interface remains prominent on mobile and desktop. Supporting explanations, examples, limitations and FAQs follow the functional tool.

## Root URL and navigation

The root URL is an indexable MyToolMint brand homepage that includes the complete Word Unscrambler and links to every launch tool. Each tool also keeps one clean canonical URL for focused search intent, sharing and supporting content. The header exposes all tools through an accessible, grouped pop-out menu; company and legal links remain in the footer.

## Deployment and indexing

The GitHub Pages workflow reads the configured Pages origin and base path at build time. Before the custom domain is attached, the `cthedj.github.io/mytoolmint` review build emits `noindex, nofollow`. After `mytoolmint.com` is configured in GitHub Pages, the same workflow builds root-relative production URLs, production canonicals and indexable pages automatically. Query-string tool states canonicalise to the clean path and are not added to the sitemap.
