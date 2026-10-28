# Fish Sort Wiki Project Guide

## Background

Fish Sort Wiki is an independent playable guide. Its homepage embeds the YIGOT HTML5 game distributed by GameMonetize, while its level walkthrough library covers the separate Shycheese game identified by the Android package `triple.sorting.bubble.fish.match`.

The production domain is `fishsortpuzzle.app`; Fish Sort Wiki remains the visible brand and every public page must keep the independent, unofficial identity clear.

## Product Goal

- Help players reach an exact level walkthrough quickly.
- Build a useful Wiki around mechanics, boosters, fish, events, rewards, and troubleshooting.
- Send downloads only to verified official storefronts.
- Remain clearly unofficial and avoid copying game branding or hosting APK files.
- Keep the YIGOT browser game and Shycheese mobile walkthroughs clearly labeled as separate versions.

## Working Rules

- Source availability: on 2026-10-28, original Daisy Gaming videos were reported unavailable; sampled removals were confirmed. Historical mapping verification does not imply current playback. The site must render a player and VideoObject only for sources marked currently available. Replacement research is recorded in `docs/replacement-sources-2026-10-28.md`.

- Verify every level-to-video mapping before publishing it.
- Every newly added indexable level page needs useful, level-specific text checked against its video. All 170 pages (levels 1–170) now have reviewed notes; 40 currently have playable replacement videos (1–40), while 130 retain historical notes with the removed player suppressed.
- Compilation videos may map multiple levels to one YouTube ID only when each mapping has a distinct verified `startSeconds` value. Do not require globally unique video IDs; require unique video ID plus start-time checkpoints.
- Store board observations in `src/level-notes.mjs`, tied to video ID, review date, and timestamp. Distinguish observed facts from advice; do not label checkpoint notes as a tested full solution.
- Do not invent fish, boosters, currencies, event rules, or level solutions.
- Keep core content in static HTML so search engines can crawl it without JavaScript.
- Add indexable pages only when they contain original, useful information.
- Update `sitemap.xml`, internal links, and `memory.md` with meaningful releases.
- Preserve the verified GameMonetize source link and embed ID when changing homepage game presentation.

## SEO Rules

- One H1 per page, unique title and description, canonical URL, Open Graph metadata, and breadcrumb schema.
- Homepage links to Levels, Wiki, Guides, Events, Download, and Troubleshooting hubs.
- Level pages link to neighboring verified levels and relevant strategy guides.
- Use `noindex` for placeholders or unverified pages.
