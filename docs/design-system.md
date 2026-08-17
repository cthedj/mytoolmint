# Design system

MyToolMint uses a small reusable system defined in `src/styles/global.css` and component-level styles.

## Foundations

- Primary navy: `#081a22` for high-emphasis surfaces and actions
- Mint: `#19b88a`; dark mint `#0b755d` for accessible text accents
- Soft mint: `#dff8ef` for selected and supporting states
- Cream: `#fbfaf6` for page backgrounds; white for tool cards
- Text: navy for headings, `#536b74` for supporting copy
- Border: `#dce7e3`; visible mint focus ring on keyboard focus
- Typography: Inter when available, followed by a system sans-serif stack
- Spacing: fluid page spacing with compact 0.5–1rem control gaps and generous 4–9rem section rhythm
- Radius: 1rem cards and controls, 1.5rem major panels, pill shapes only for compact actions
- Icons: short, recognisable text or Unicode marks used decoratively; no external icon library

## Components

- Primary buttons use navy on white or cream; secondary buttons use a bordered neutral surface.
- Inputs have visible labels, a minimum 44–48px touch height and a high-contrast focus state.
- Tool panels use a white surface, subtle border, large radius and restrained shadow.
- Results use dark summary surfaces or grouped cards with live status where useful.
- ToolLayout standardises breadcrumbs, headings, metadata, interactive-tool placement and supporting content.

## Responsive behaviour

Multi-column cards collapse at 52rem, tool fields generally collapse at 34–44rem, and controls remain full-width or touch-friendly on small screens. Decorative motion is removed when the user prefers reduced motion.
