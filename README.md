# Fish Sort Wiki

Static SEO site for `fishsortpuzzle.app`, branded as Fish Sort Wiki.

The homepage embeds the YIGOT HTML5 game distributed by GameMonetize. The level walkthrough library covers the separate Shycheese mobile app, so copy and structured data must keep those versions distinct.

## Build

```bash
npm run build
npm run dev
```

The generated site is written to `public/` and can be deployed to any static host.

## Production

- Domain: `https://fishsortpuzzle.app`
- GitHub repository: `zhaobingkun/fishsortpuzzle`
- Vercel builds with `npm run build` and publishes the `public/` directory.

## Content updates

- Add verified `[level, videoId]` mappings to `src/level-videos.mjs`.
- Add or revise Wiki and guide articles in `src/data.mjs`.
- Run `npm run build` before deployment.
- Confirm the official store URLs and game facts before publishing.

## Video source

- Channel: [Daisy Gaming](https://www.youtube.com/@Infinty_craft)
- Playlist: [Fish Sort Puzzle walkthroughs](https://www.youtube.com/playlist?list=PLJscotaJN_4w)
- Current import: 147 unique videos covering Levels 15-170, checked 2026-09-30.
- Do not create pages for missing numbers until a matching public video is verified.

## Playable web game

- Developer: YIGOT
- Distributor and source: [GameMonetize](https://gamemonetize.com/fish-sort-puzzle-game)
- Embed ID: `diiob6luzs7e36nbbt1iz74wlvf4vo2d`
- Embed URL: `html5.gamemonetize.games/.../`, matching the publisher iframe code displayed on the distributor page and its `PLAY GAME` launch screen.
- Native game size: 720 by 1280 pixels, rendered responsively at 9:16.
- Keep a visible source link and do not describe this web build as the Shycheese mobile version.
