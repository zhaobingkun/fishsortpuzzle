# Replacement video implementation — 2026-10-28

## Published mapping plan

- Dũng Trịnh compilation `ackz7VhWeEM`: Levels 1–7, 9–10.
- OA GAME `BmYGeGNdnpA`: Level 8. The compilation above jumps from Level 7 to the Level 9 home screen, so it must not be used for Level 8.
- Dũng Trịnh compilation `zplIroqBoYI`: Levels 11–14 in this release.
- OA GAME individual videos: Levels 15–22.
- あーるのスマホゲーch `WOuxE1cqhGA`: Level 25.
- Ashwini.R `0AVU4tQCr5I`: Level 29.

The visible game UI matches the mobile Fish Sort version covered by this guide: level header, order bowls, five holding slots, fish artwork, bubbles, and boosters. None of the replacement uploaders supplied a verifiable Android package ID or exact app build, so pages tell users to compare the opening board before following later moves.

## Compilation start times

| Level | Video | Start |
| ---: | --- | ---: |
| 1 | `ackz7VhWeEM` | 0:00 |
| 2 | `ackz7VhWeEM` | 0:25 |
| 3 | `ackz7VhWeEM` | 3:00 |
| 4 | `ackz7VhWeEM` | 10:50 |
| 5 | `ackz7VhWeEM` | 15:50 |
| 6 | `ackz7VhWeEM` | 20:30 |
| 7 | `ackz7VhWeEM` | 25:00 |
| 9 | `ackz7VhWeEM` | 32:30 |
| 10 | `ackz7VhWeEM` | 39:00 |
| 11 | `zplIroqBoYI` | 0:00 |
| 12 | `zplIroqBoYI` | 5:05 |
| 13 | `zplIroqBoYI` | 11:20 |
| 14 | `zplIroqBoYI` | 15:15 |

These start values point to the level opening or its immediate opening transition. Board-note timestamps may be later when a clearer counter, order portrait, or obstacle state was needed.

## Availability behavior

- Pages render a YouTube player and VideoObject schema only when `entry.available` is true.
- The original Daisy Gaming mappings remain attached to historical notes for Levels without replacements, but the deleted videos are not embedded or linked as playable sources.
- Current playable set: Levels 1–22, 25, and 29 (24 pages).
- Historical-note-only set: 146 pages.

## Verification

- `npm run build`: 192 indexable URLs.
- `npm run check`: 196 HTML pages and 170 level guides passed.
- Site-page iframe checks passed for Dũng Trịnh, OA GAME, あーるのスマホゲーch, and Ashwini.R using `youtube-nocookie.com` with the local guide page as referrer.
- Directly opening an embed URL produced YouTube error 153 because no HTTP Referer was present; the same videos loaded through the actual site page.
- Level 30 was checked as a historical-note page: no iframe, no VideoObject, and a visible source-unavailable notice.
