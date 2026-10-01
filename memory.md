# Fish Sort Wiki Memory

## 2026-09-30

- Chose the name **Fish Sort Wiki** and the candidate domain `fishsortwiki.com`.
- WHOIS returned no match for the domain at the time of checking; registration is not yet completed.
- Built the first static SEO version around the verified Shycheese package `triple.sorting.bubble.fish.match`.
- Reused the successful level-search concept from Pixel Flow while adding Wiki, event, guide, download, and troubleshooting content.
- Generated original hero and mascot artwork so the site does not copy the game's protected art.
- Only verified level-video mappings should be added to `src/level-videos.mjs`.
- Confirmed `https://www.youtube.com/@Infinty_craft` is the Daisy Gaming channel (channel ID `UCKcQUtvNIgojUZYqLtFmejw`).
- Imported 147 unique Fish Sort Puzzle walkthroughs from playlist `PLJscotaJN_4w`, covering Levels 15-170.
- Missing in that published range on 2026-09-30: 21, 29, 45, 54, 78, 92, 101, 137, and 151. Levels 1-14 were also not returned. Do not create placeholder pages for them.
- Corrected `EbY3Loa17Vs`: it is the verified Level 160 walkthrough, not a generic gameplay reference. `xej4MJiX3UQ` is Level 170 and is used as the featured homepage video.
- The level directory renders all numbered links but limits large thumbnail cards to the latest 12; the homepage shows the latest 6 to keep page weight manageable.
- Replaced the initial muted teal/gray palette with a brighter game-derived aquarium palette: water blue, bubble white, pale aqua, accessible coral red, reward yellow, and a small seaweed-green accent. Keep future UI additions within these tokens instead of introducing generic dark SaaS colors.
- Checked `fishsortpuzzle.app` on 2026-09-30: Google Registry RDAP returned not found and web search showed no indexed site, so it appeared unregistered at check time. It is a strong memorable defensive domain but can imply an official app site; keep `fishsortwiki.com` as the safer primary recommendation unless the unofficial guide identity is made unmistakable.
- Embedded the playable YIGOT HTML5 version on the homepage from GameMonetize, using game ID `diiob6luzs7e36nbbt1iz74wlvf4vo2d` and its native 720x1280 portrait ratio.
- Use the publisher iframe shown in GameMonetize's copy field: `https://html5.gamemonetize.games/diiob6luzs7e36nbbt1iz74wlvf4vo2d/`. The `referer=original` variant belongs to GameMonetize's own preview page and should not be copied to an external publisher site.
- The embedded YIGOT web game is not the Shycheese mobile app covered by the 147 walkthrough pages. Keep this distinction visible near the game and in site metadata.

## 2026-10-01

- User selected `fishsortpuzzle.app` as the production domain. Updated the canonical base, Open Graph URLs, structured data, sitemap, robots file, README, and preview metadata while retaining **Fish Sort Wiki** as the visible unofficial-guide brand.
- Reused the aquarium artwork from the original homepage as the full-width header image on every non-home page. Keep white copy over a uniform deep-water overlay so the fish remain visible without hurting readability.
- Created the public GitHub repository `https://github.com/zhaobingkun/fishsortpuzzle` and connected its `main` branch to the Vercel project `fishsortpuzzle` for automatic deployments.
- First production deployment: `https://fishsortpuzzle.vercel.app`. Vercel build settings are `npm run build` with `public` as the output directory.
- Added `fishsortpuzzle.app` and `www.fishsortpuzzle.app` to the Vercel project. Cloudflare DNS uses DNS-only A records for both hosts, pointing to Vercel's requested address `76.76.21.21`.
- Verified the production root, `/levels/`, `/level/170/`, and `/sitemap.xml` over HTTPS with HTTP 200 responses. The root canonical is `https://fishsortpuzzle.app/`; both root and `www` resolve to Vercel.
- Added the aquarium artwork to the homepage as a 270px full-width game intro band rather than another tall hero. This keeps the title readable over the dark water while the game frame still begins in the first viewport.
- User submitted `fishsortpuzzle.app` to Google Search Console after launch. Next SEO actions are representative URL inspection/indexing requests, Bing Webmaster Tools import, a `www` to apex redirect, and 7/14/28-day indexing and impression checks.
- Added Google Analytics 4 measurement ID `G-P0R43X0ZMS` through the shared static-page head template. The build checker requires exactly one loader and one config reference on every generated HTML page.
