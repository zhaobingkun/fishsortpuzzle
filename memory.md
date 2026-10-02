# Fish Sort Wiki Memory

## 2026-10-02 — 版本提示与 10 关文字试点

- 用户授权先做版本提示和 10 个关卡的独有文字，随后明确授权完成后发布。
- 首页在游戏 iframe 前展示 YIGOT / GameMonetize 浏览器版与 Shycheese 手机版的关系，并链接 `/levels/`、`/download/` 与原发行来源；按钮改为 Mobile walkthroughs。
- 首批覆盖 Levels 161–170。逐一打开 Daisy Gaming 对应视频，核对视频标题与 0:10 实际画面；另核对 Level 170 的 1:22 画面（52/183）。这些是视频检查点观察，不是逐步复盘、实机测试或完整操作解法。
- 新增 `src/level-notes.mjs`：保存视频 ID、核对日期、时间点、进度计数目标和独有正文；每关 3 个独有小节，162–177 个英文单词，另有共用来源/适用范围说明。颜色和鱼形是外观描述，不宣称官方物种名。
- 区别包括：161 的相似蓝鱼与左侧彩色气泡；162 的左下锁链/右下钥匙；163 的深色圆鱼和橙色条纹目标；164 的四个目标及右下笼子；165 的两种紫鱼和已占用暂存栏；166 的海马、右侧气泡及鲨鱼形/海豚差别；167 的下方蓝鱼群；168 的笼子/问号鱼；169 的左右鱼群与目标；170 的锁链/钥匙与中段变化。
- 10 个页面使用新正文替代原两段通用攻略，保留准确版本、来源和相邻关卡链接；独有 meta/首屏摘要同步进入首页及 Levels 卡片。sitemap 只更新首页、Levels hub 与有新笔记的关卡日期。
- 构建会拒绝笔记与关卡视频 ID 不一致。工作规则已写入 agents.md：今后新增可索引关卡必须有经核对的关卡独有文字，现有其余 137 关待分批补充。
- 验证：`npm run build`、`npm run check` 通过，173 个 HTML / 147 个唯一映射；10 页生成后检查有独有正文和正确时间链接；meta description 为 146–157 字符。浏览器核对 390px / 1440px：首页说明在游戏前且手机首屏可见，无横向溢出；170 关手机正文和时间链接显示正常。
- 发布沿用现有 GitHub main → Vercel 自动部署，生产域名 `https://fishsortpuzzle.app/`。内容提交 `7493197` 已推送；正式首页、Levels hub、161–170 十个关卡与 sitemap 共 13 个 URL 均返回 HTTP 200，原始响应与本地构建逐字一致。浏览器再次确认线上版本提示与 170 关新正文，截图保存在 `screenshots/version-note-live.jpg`。

## 2026-10-02 — 用户提供 SEO 诊断报告复核

- 本轮实际工作目录为 `/Users/zhaobingkun/dev/fishsortpuzzle`；旧记录中的 `.app` 目录不可直接当作当前工作目录。
- 本地复核：147 个关卡页使用共同正文模板，但各有不同的视频 ID、缩略图和相邻关卡链接；应补经视频核实的关卡独有信息，不能编造鱼数、步数或卡点。
- 首页 YIGOT 在线游戏与 Shycheese 手机攻略确为不同版本；现有完整版本说明位于 iframe 后，建议提升到游戏前并提供手机版本入口。
- 本地关卡 15、170 的 robots meta 为 index,follow；robots.txt 允许抓取并声明 sitemap。运行现有检查通过：173 个 HTML 页面、147 个唯一关卡视频映射。此检查不证明线上索引状态或实际视频解法正确。
- 报告的 site: 单条结果不能证明只收录首页，更不能证明门页处罚；需要 GSC URL 检查和页面索引报告。9 月 30 日是页面标记日期，项目记录中的首次生产部署为 10 月 1 日。
- 报告中的美国搜索量、KD、DR、排名和所需引用域数量尚未独立复核，不据此确定流量天花板或转向 water sort。优先低成本改善版本提示、少量关卡内容试点并观察 GSC；本轮仅评审和记录，未更改公开页面或发布。

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

- The canonical local working copy moved to `/Users/zhaobingkun/dev/fishsortpuzzle.app`. Future development, Git operations, builds, and releases should run from this directory; the earlier `Documents/Codex/.../outputs/fishsortwiki.com` copy is only a retained session snapshot.
- User selected `fishsortpuzzle.app` as the production domain. Updated the canonical base, Open Graph URLs, structured data, sitemap, robots file, README, and preview metadata while retaining **Fish Sort Wiki** as the visible unofficial-guide brand.
- Reused the aquarium artwork from the original homepage as the full-width header image on every non-home page. Keep white copy over a uniform deep-water overlay so the fish remain visible without hurting readability.
- Created the public GitHub repository `https://github.com/zhaobingkun/fishsortpuzzle` and connected its `main` branch to the Vercel project `fishsortpuzzle` for automatic deployments.
- First production deployment: `https://fishsortpuzzle.vercel.app`. Vercel build settings are `npm run build` with `public` as the output directory.
- Added `fishsortpuzzle.app` and `www.fishsortpuzzle.app` to the Vercel project. Cloudflare DNS uses DNS-only A records for both hosts, pointing to Vercel's requested address `76.76.21.21`.
- Verified the production root, `/levels/`, `/level/170/`, and `/sitemap.xml` over HTTPS with HTTP 200 responses. The root canonical is `https://fishsortpuzzle.app/`; both root and `www` resolve to Vercel.
- Added the aquarium artwork to the homepage as a 270px full-width game intro band rather than another tall hero. This keeps the title readable over the dark water while the game frame still begins in the first viewport.
- User submitted `fishsortpuzzle.app` to Google Search Console after launch. Next SEO actions are representative URL inspection/indexing requests, Bing Webmaster Tools import, a `www` to apex redirect, and 7/14/28-day indexing and impression checks.
- Added Google Analytics 4 measurement ID `G-P0R43X0ZMS` through the shared static-page head template. The build checker requires exactly one loader and one config reference on every generated HTML page.
