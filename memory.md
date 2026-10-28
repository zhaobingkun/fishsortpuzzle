# Fish Sort Wiki Memory

## 2026-10-11 — 最近新关卡视频检查

- 用户询问最近是否更新新关卡视频。读取项目文档并核对当前 levelVideos：156 页，最高 170 关，与旧的 147 页记录已不同。
- 实时 YouTube 播放列表抓取失败，浏览器绑定和新建标签均超时，未能完成频道实时清单检查。网页搜索 Daisy Gaming / Fish Sort Puzzle 及 171、180、200 未找到可确认的 170+ 新攻略；搜索返回旧 85 关视频，不能据此推断频道未更新。
- 对外结论限定为暂未找到可核实的新视频，无法确认完全没有更新。保留 10 月 3 日播放列表最高 170 的历史检查日期，不冒充本日实时结果。未新增或发布页面。

## 2026-10-03 — 新关卡来源检查

- 用户询问有没有新关卡。实时读取 Daisy Gaming 的 fish sort 播放列表全部 155 个标题及链接，最高仍为 170，未在此来源发现 171+；不能据此断言游戏本身只有 170 关。
- 找到网站此前缺的 9 个旧关卡视频：21、29、45、54、78、92、101、137、151。上传标记显示为数周前，属于待补页面，不称新更新关卡。已保存视频 ID 清单到 docs/source-check-2026-10-03.json；仅核对标题/链接，未逐条核对游戏画面或新增发布页面。
- 当前播放列表未列现有 158 关，保持原有已核对映射，不因列表缺项删除。建议下一批补 9 个缺页和现有 17 页详情，共 26 页。

## 2026-10-03 — 第五批 30 个现有关卡详情

- 用户要求“再做30个”，工作中再次要求继续；沿用此前发布授权。补充现有 34–65，跳过缺失 45、54，不新建占位页。累计 130 页有独有正文，余下 15–33 中现有 17 页待补。
- 逐一核对 Daisy Gaming 视频标题、实际播放画面和 0:10 检查点。34/35 在 10 月 2 日核对，其余在 10 月 3 日核对；记录逐页日期、视频 ID、时间点、计数器分母。每页 3 个独有小节，共 90 段，150–163 英文单词，独有摘要 145–154 字符。
- 记录目标状态、暴露候选位置、相似蓝鱼/紫鱼/黄鱼区别、暂存栏、锁链、钥匙、问号、霜状组和晶体遮挡。37 的钥匙覆盖锁链不认定已解锁；49 的两处晶体内容不猜测；46/55/61/63 完成动画遮挡的其他订单不猜；数值不当作步数或解锁规则。仍明确为早期检查点观察，不声称完整操作解法或实机测试。
- 目录自动扩为 130 个已核对详情入口；本批关卡 sitemap 修改日期按实际审阅日期更新，Levels hub 修改日期更新为 10 月 3 日。
- 发布前 build/check 通过（169 可索引 URL、173 HTML、147 唯一视频映射）；专项确认 30 个实际审阅视频 ID、0:10 链接、每页单 H1、90 段互不重复和累计 130 条说明。390px 的 50 关及 Levels hub 无横向溢出；目录恰好 130 个详情入口。
- 发布完成：内容提交 `9d8d14b` 推送 main 后 Vercel 自动部署；30 个关卡、Levels hub 与 sitemap 共 32 个正式地址全部 HTTP 200，响应与本地构建逐字一致。浏览器确认线上 50 关新增正文，截图 `screenshots/level-50-details-live.png`。本批未操作 GSC，不把发布成功等同于 Google 收录。

## 2026-10-02 — 第四批 30 个现有关卡详情

- 用户要求继续加 30 个，沿用此前发布授权；选定现有 66–97，跳过缺失 78、92，累计 100 页有独有正文。未新建占位页。
- 逐一核对对应 Daisy Gaming 视频标题、播放实际内容并读取 0:10 盘面。新增每关 3 个独有小节，共 90 段；155–174 个英文单词，独有摘要 143–157 字符，保留视频 ID、日期和时间点链接。
- 具体记录目标完成/填充状态、不同蓝鱼/紫鱼/粉鱼外观、暴露和受锁链保护的候选位置、钥匙、问号和霜状组。74 关未看清钥匙不推断存在；79/95 的上方霜状组被裁切，84/96 的强光遮挡内容不猜测。仍为检查点观察，不标为完整操作解法，不推断数值是步数或解锁规则。
- build/check 已通过（169 个可索引 URL、173 个 HTML、147 个唯一视频映射）；已核对目录自动扩至 100 页，站点地图更新本批修改日期。发布前专项验证：90 段互不重复；30 页单 H1、独有摘要和视频时间点链接正确；390px 的 82 关及 Levels hub 无横向溢出，目录恰好 100 个详情入口。发布完成：内容提交 `1a53aa6` 已推送 main，Vercel 自动部署；30 个关卡页、Levels hub 和 sitemap 共 32 个地址 HTTP 200 且与本地构建逐字一致。浏览器确认线上 82 关新正文，截图 `screenshots/level-82-details-live.png`。本批未操作 GSC，发布成功不等同于收录。

## 2026-10-02 — 第三批 30 个现有关卡详情

- 用户要求再做 30 个关卡，沿用此前发布授权；选择现有 98–128，跳过缺失的 101。完成后累计 70 个现有关卡有独有详情，未新增占位页。
- 逐一读取 Daisy Gaming 视频标题、播放实际内容并核对 0:10 盘面；使用同一 DOM 标签完成播放、定位和截图，避免原生 UI 与 DOM 标签指向不同页面。每关 3 个独有段落（152–172 英文单词），附独有摘要、视频 ID、核对日期和时间点。
- 记录具体目标、完成动画、鱼群位置、相似外观区别、暂存栏及锁链/钥匙/问号/霜状轮廓。第 125 关右侧强光遮挡内容，只描述无法辨认；第 128 关霜状组显示 0，不推断解锁规则。说明仍是早期视频检查点观察，未标为完整操作解法或实机测试。
- Levels hub 的已核对目录自动扩为 70 页，保留版本和相邻页内链；sitemap 更新本批实际修改关卡的日期。

## 2026-10-02 — 第二批 30 个现有关卡详情

- 用户要求先给现有 30 个关卡页补详情，并沿用此前完成后发布的授权。选定 129–160 中已有的 30 页，跳过不存在的 137 / 151；不新建空号页。加上首批 161–170，共 40 页有独有文字。
- 逐一核对 Daisy Gaming 对应视频的标题与 0:10 实际盘面。每页 3 个独有小节、146–167 个英文单词，另有共用来源和范围说明；独有 meta 摘要 138–152 字符。不是完整操作解法，也未实机测试。
- 详情具体到各关目标/目标完成状态、鱼群位置、外观相似设计、锁链/钥匙/笼子/问号/霜状轮廓和暂存栏；只记录能看清的画面，不推断问号身份、解锁规则或步数。Level 160 的霜状组显示 0，仅作为状态观察，不宣称解锁机制。
- 保留视频 ID、日期、检查点链接、版本说明和相邻关卡内链。Levels hub 增加已核对文字的 40 页目录与入口；sitemap 沿用按实际修改页更新日期的规则。
- 发布前验证：npm run build/check 通过（173 HTML、147 唯一视频映射）；专项核对第二批 30 个实际审阅视频 ID 和 0:10 链接全部一致，90 段正文互不重复。390px 手机核对 150 关摘要、正文及时间点链接，Levels hub 的 40 个入口存在，两页 scrollWidth 均等于 viewport，无横向溢出。
- 发布完成：内容提交 40a762e 已推送 GitHub main，Vercel 自动部署；30 个关卡、Levels hub 与 sitemap 共 32 个正式 URL 全部 HTTP 200，响应与本地构建逐字一致。线上浏览器确认 150 关新正文，1280px 无横向溢出；截图 screenshots/level-150-details-live.png。此次未操作 GSC，不把发布或 sitemap 更新等同于收录。
- 浏览器操作经验：原生 UI 包装与 DOM 标签绑定可能指向不同标签，出现标题/画面不一致时必须改用同一 browser.tabs.get 绑定的 DOM 操作和 screenshot，确认实际关卡标题及播放帧，不能把缩略图当实际检查点。

## 2026-10-02 — GSC 实时收录核对

- 登录状态下读取域资源 `sc-domain:fishsortpuzzle.app`，概述的索引统计显示“正在处理数据，请过 1 天左右再来查看”，不能报告全站已收录总数。
- URL 检查：首页 `https://fishsortpuzzle.app/` 显示“网址已收录到 Google / 网页已编入索引”。
- `/levels/` 与 `/level/170/` 显示尚未收录，原因“Google 无法识别此网址”，上次抓取时间不适用，未检测到引荐站点地图；这是两个抽查 URL 的结果，不能外推其余所有关卡。
- sitemap 报告：`https://fishsortpuzzle.app/sitemap.xml` 状态成功，提交和上次读取日期均为 2026-10-01，已发现 169 个网页；发现不等于收录。
- 本轮只读检查，未点击请求编入索引或重新提交 sitemap。后续可对 Levels hub 和已加文字的代表关卡请求编入索引，并继续观察索引报告。

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

- 第三批发布前验证：build/check 通过，169 个可索引 URL、173 个 HTML 和 147 个视频映射检查通过；390px 手机视口无横向溢出，目录已列出 70 个带正文关卡。
- 第三批发布完成：内容提交 `d286af1` 已推送 main 并触发 Vercel；30 个关卡页 + `/levels/` + `/sitemap.xml` 共 32 个线上地址全部 HTTP 200，且响应与本地构建逐字一致。线上 117 关正文已浏览确认，截图 `screenshots/level-117-details-live.png`。另检查本批 90 个说明小节互不重复。GSC 未在本批操作，发布成功不代表已索引。

## 2026-10-03 — GameMonetize 平台说明

- 用户询问 GameMonetize 是什么。核对官方 publishers / FAQ：HTML5 游戏发行与广告变现平台，站长可嵌入游戏；官方标示站长广告分成 45%，需要注册并在后台添加网站，不能把现有 iframe 当作已开通收益。
- 本项目首页使用 YIGOT 的 Fish Sort Puzzle，source 为 https://gamemonetize.com/fish-sort-puzzle-game，游戏由 html5.gamemonetize.games 托管；攻略库仍是另一款 Shycheese 手游。未注册账号、未改变嵌入或开启分成。

## 2026-10-07 — 最近更新询问

- 用户询问项目最近是否更新。本地最新提交仍为 10 月 3 日第五批关卡笔记发布记录；未在本轮修改或发布网站。
- 实时核对官方 Google Play（https://play.google.com/store/apps/details?id=triple.sorting.bubble.fish.match）：更新日期为 2026-09-30，更新说明仅为 New Features Added / Enjoy this triple sorting fish puzzle，未明确新增关卡编号或数量。
- 今日网页搜索未找到可确认的 Daisy Gaming 171+ 攻略；YouTube 播放列表直接抓取失败，不能称已完整复核列表。沿用 10 月 3 日最高 170 的记录作为历史状态，不当作今日游戏关卡上限。
- 待办仍包括 9 个已找到视频的缺页和现有 17 页独有详情；必须核对实际视频画面后再发布。

## 2026-10-07 — 补齐九个视频关卡页

- 用户要求检查新视频并加到网站。浏览器完整加载 Daisy Gaming 播放列表 155 个标题与链接，最高仍为 170；对比 10 月 3 日没有新增视频。与本站相比有 9 个缺页：21、29、45、54、78、92、101、137、151，属于已有旧视频补齐。
- 逐个核对标题和实际正片 0:10 画面，补关卡映射与每页三个独有说明小节；存入 src/level-notes.mjs，核对日期 10 月 7 日。仍明确为早期检查点观察，非完整操作解法或实机测试。动画遮住的订单、晶体内鱼及锁链解锁规则不猜测。
- 累计 156 个关卡页，15–170 连续覆盖；139 页有独有检查点说明。保留原有 158 视频映射（当前列表未列出），不删除已有核对内容。目录缺页提示已更新，新增页与 Levels hub sitemap 日期更新。
- npm run build/check 通过：178 个可索引 URL、182 HTML、156 个唯一视频映射。待线上发布验证。
- 发布完成：内容提交 0870486 已推送 main 并触发 Vercel。9 个新关卡、Levels hub、sitemap 共 11 个正式地址全部 HTTP 200，响应与本地构建逐字一致。浏览器确认线上目录为 156 页 / 139 条笔记，151 关核对日期和 0:10 链接显示正常，499px 视口 scrollWidth 同为 499，无横向溢出。本轮未操作 GSC。
- 本地预览端口已被占用且浏览器访问 localhost 被阻止，因此改为发布后核对线上布局。Python HTTPS 因本机证书链报错，改用系统 curl（保留证书验证）完成正式地址核对。

## 2026-10-08 — 已发现尚未索引诊断

- 分析用户提供的三个 GSC CSV：10 月 4 日 168 个受影响 URL（147 关卡 + 21 内容页），所有日期为 1970-01-01，应视为无有效抓取日期的导出值；不能认作真实抓取日期。报告早于 10 月 7 日新增九页，不代表今日全站索引数。
- 今日逐一线上核对 168 URL：全部 HTTP 200、自指 canonical、无 noindex；robots 允许抓取且声明 sitemap。本地 check 通过。www /levels/ 同样 200，待统一永久跳转，不能认定为本次原因。
- 判断更符合新站早期等待首次抓取；未读取实时 GSC/Googlebot 日志，不能断言主机对 Googlebot 无问题。内容风险包括剩余 17 关通用正文、已有详情只是早期检查点、鱼种 Wiki 缺少实际目录。
- 记录 docs/indexing-diagnosis-2026-10-08.md 与全部地址核对 JSON。建议优先实时测试代表 URL、检查抓取统计，补内容并在 10 月 15/22 日复核。本轮未改线上页面或提交索引请求。

## 2026-10-08 — 实时索引核验与最后一批关卡补强

- 用户同意执行实时 GSC 检查、补齐 17 页独有正文、统一 www。三条代表 URL（/levels/、/level/170/、/guides/slot-management/）均通过实时可索引检查且已成功请求索引；170 视频 schema 缺 uploadDate，属增强项问题，不等同索引阻断。
- GSC 概述 1 已索引 / 174 未索引；抓取统计 102 请求，140ms，两个主机均无问题。404 展示样例只有 ads.txt/favicon.ico。临时“出了点问题”稍后恢复，勿把 GSC 服务异常当网站故障。
- 补齐 15–20、22–28、30–33 的视频 0:10 观察，现全部 156 页（15–170）有独有正文。保持早期检查点而非完整 tested solution 的界限。
- 从全部 156 个公开视频页面核对真实 uploadDate；源文件 src/video-metadata.mjs，证据 docs/video-metadata-evidence-2026-10-08.json。上传日期不能用网页修改日或笔记审核日替代。移除错误 contentUrl，保留 embedUrl；新增构建/检查保护。
- vercel.json 增加 www 永久跳转和 favicon 跳转；ads.txt 需真实广告账户授权信息，不能凭空制造。
- build/check 通过：178 可索引 URL、182 HTML、156 映射。诊断与 GSC 证据见 docs/indexing-diagnosis-2026-10-08.md、screenshots/gsc-guide-request-2026-10-08.jpg。
- 发布后更新：提交 7254216 已推送；156 关 + Hub + sitemap 共 158 个线上地址全部 200且与构建一致。第170关已有真实Googlebot抓取（18:05:46），现为“已抓取 - 尚未编入索引”，不能继续说该页尚未抓取，也不能外推全站。
- www 的代码条件跳转实际未生效，已用 Vercel 官方项目域名 API 设置308指向主域；维护配置时检查域名设置而非仅看vercel.json。新版178页sitemap重新提交成功，列表上次读取仍旧169，等待下一次处理。
- 最终复测：www 首页/目录/关卡及参数均308跳主域并保留路径；18:34 GSC第170关实时测试“可编入索引”、视频1项有效，缺日期错误消失。凭据 screenshots/gsc-170-valid-2026-10-08.jpg；抓取队列提交和实际收录须区分。

## 2026-10-28 — Daisy Gaming 视频来源失效

- 用户反馈站内视频均不可播放，并确认频道视频已消失。浏览器实查第131关站内 iframe 与 YouTube 原始页面均显示“此视频已被上传者移除”；另抽查25、85、170同样提示。第15关具体显示根据 SUPLIFE PTE. LTD. 的版权内容移除要求被移除。尚未逐一检查全部156个ID；不能把抽样结果写成全量检测结果，也不能推断作者删除其他视频的动机。
- 本站156个映射来自 Daisy Gaming（https://www.youtube.com/@Infinty_craft）。源视频删除不是站内播放器代码故障；更换嵌入域名不能恢复已删除的源。
- 用户询问补救办法。建议先移除失效播放入口及对应 VideoObject、准确修改视频可用性文案，保留原始观察笔记及审核来源；笔记仅为0:10检查点，不包装成完整解法。保留有用原URL，逐页评估内容，不因视频失效批量删除页面或全部noindex。
- 后续可核查其他公开可嵌入来源，须重新验证游戏版本、关卡映射和画面，旧笔记不能直接绑定新视频；长期优先自录实测图文攻略。未经授权不联络作者；本轮仅记录与讨论方案，未修改或发布网站。

## 2026-10-28 — 寻找替代来源，优先OA GAME

- 用户明确要求先找其他作者并逐关核对，又提供 https://www.youtube.com/@oa_game 。已读取频道、播放列表及频道内Fish Sort搜索；列表显示23条、21可见、2无法播放隐藏，最高可见22。另有1–3合集在频道搜索出现，尚未审核实际播放。
- 实际播放核对OA GAME的15–22共8关，画面内关卡号正确，界面与原Shycheese手游视觉一致；各订单/位置与旧检查点有差异，不能只换视频ID沿用旧笔记。21关原画面模糊，总目标未可靠读出，不沿用旧数据代填。
- 另核对日语作者あーるのスマホゲーch第25关 WOuxE1cqhGA（10:14出现VICTORY及183/183），Ashwini.R第29关0AVU4tQCr5I（24秒Level29、26/183）。共10个关卡有可播放候选，另146关暂无本轮核验替代；不声称全网没有。
- 作者未提供可验证包名/精确应用版本，当前只确认视觉相符的手游候选；观看页可播放但外站iframe未测试。未逐步核验所有完整解法，未改映射、构建或发布。
- 逐关报告 docs/replacement-sources-2026-10-28.md，源数据及156关覆盖状态 docs/replacement-source-audit-2026-10-28.json，截图 screenshots/replacements-2026-10-28/。若替换须重写对应笔记、测试嵌入、改逐条作者归属，不能继续全局归Daisy Gaming。

## 2026-10-28 — 补齐 1–14 并接入首批替代视频

- 用户要求把原先没有的 1–15 关加进网站，并继续处理失效视频。逐关检查 Dũng Trịnh 播放列表：`ackz7VhWeEM` 实际包含 1–7、9–10，第 8 关被跳过；`zplIroqBoYI` 包含 11–21。长视频按可见关卡号确定独立起始秒数，不能只用一个视频 ID 让所有页面从头播放。
- 第 8 关改用 OA GAME 独立视频 `BmYGeGNdnpA`，0:12 画面显示 Level 8、6/123；第 15 关沿用已核验的 OA GAME 替代 `OLF9WUkeYVk`。新增 1–14 页面并重写 1–22、25、29 的笔记，使笔记绑定新视频 ID、2026-10-28 审核日期和具体时间点。
- 数据模型支持 `[level, videoId, startSeconds, sourceKey]`，同一合辑可映射多个关卡，但视频 ID 与起始秒数组合必须唯一。站内延迟加载播放器与 VideoObject embedUrl 都带 `start` 参数；每页显示自己的作者、频道和播放列表。
- 当前 170 个连续关卡页全部保留可索引的独有文字。可播放替代视频共 24 关：1–22、25、29；其余 146 关明确显示原 Daisy 来源不可用，不渲染播放器或 VideoObject，避免把已删除视频继续包装成可播放内容。
- 四类来源通过站内 youtube-nocookie 播放器检查：Dũng Trịnh、OA GAME、あーるのスマホゲーch、Ashwini.R 均能在实际页面 iframe 中加载；直接打开 embed URL 会因缺少 Referer 返回 YouTube 错误 153，不能据此判定嵌入受限。
- 构建基线更新为 192 个可索引 URL、196 个 HTML 和 170 个关卡页。发布前必须继续运行 `npm run build`、`npm run check`，并抽查有起始时间的合辑页、独立视频页和无播放器的历史笔记页。

## 2026-10-28 — 无替代视频关卡的处理原则

- 用户询问尚未找到替代视频的关卡如何处理。当前 146 关并非空白占位页，均保留与旧视频检查点绑定的逐关独有棋盘观察；页面明确提示原来源不可用，不渲染播放器或 VideoObject。
- 处理原则：不因视频失效批量删除、404 或 noindex 有用页面。继续保留可索引的原创文字、相邻关卡内链和来源状态；只有缺少独有信息、无法回答用户问题的真正占位页才应 noindex。
- 补源优先顺序建议为 23–30、31–50，再结合 GSC impression 优先处理已有曝光的关卡。每个替代视频仍需核对关卡号、画面版本、可嵌入状态、起始秒数，并重写与新视频相符的笔记。
- 长期最稳妥的来源是自行录制实机攻略或制作经实测的图文步骤，从而减少对单一 YouTube 作者的依赖。可以增加“报告可用替代视频/版本不匹配”的反馈入口，但公开前仍需站方复核。

## 2026-10-28 — Dũng 合辑补齐 23–40

- 用户确认按“保留有用文字页、逐关核验替代源”的方案继续。实际打开 Dũng Trịnh `Fish Sort Level 22-40`（`LbVHMyOSAio`），逐关在独立时间点看到23–40的关卡号和棋盘；25、29仍使用先前核验的独立视频。
- 本次把23–24、26–28、30–40接到该合辑，并为每关设置唯一 `startSeconds`；结合既有25、29后，可播放范围成为连续1–40，共40页。41–170共130页继续保留独有历史观察，不显示已删除的Daisy播放器或VideoObject。
- 为16个新增替代映射重写当前来源笔记，记录关卡目标、可见订单、暂存栏和障碍物检查点。只描述画面内可见事实，不把时间点抽查称为逐步实测攻略。
- 页面元数据确认合辑上传时间为 `2026-09-16T00:28:23-07:00`。作者没有提供精确包名或构建号，页面继续提醒玩家先比较棋盘。
- 后续候选线索：日语作者あーるのスマホゲーch搜索结果中出现36、40、44、48、54、58、62、66、74及更高关卡视频；除既有25外，本轮尚未逐条打开核验，不得直接接入。
- 发布完成：提交 `0bd1434` 已推送 main 并触发 Vercel。`npm run build` 和 `npm run check` 通过（192个可索引URL、196个HTML、170个关卡页）；线上目录、23、31、40、41和sitemap与本地构建逐字一致。
- 线上40关点击播放后生成 `youtube-nocookie.com/embed/LbVHMyOSAio?...&start=5580`；23、31、40均有播放器和VideoObject，41无播放器/VideoObject并显示原来源不可用。目录显示40个可播放页，41关起标为notes。
