import { mkdir, writeFile, copyFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, levels, articles, hubs } from '../src/data.mjs';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = join(projectRoot, 'public');
const articleMap = new Map(articles.map((article) => [article.slug, article]));
const featuredLevels = levels.slice(-6).reverse();
const latestLevels = levels.slice(-12).reverse();
const publishedLevelNumbers = new Set(levels.map((entry) => entry.level));
const missingPublishedLevels = Array.from(
  { length: levels.at(-1).level - levels[0].level + 1 },
  (_, index) => levels[0].level + index
).filter((level) => !publishedLevelNumbers.has(level));

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const cleanDescription = (value) => String(value).replace(/\s+/g, ' ').trim();
const levelJson = JSON.stringify(levels.map(({ level, title }) => ({ level, title })));

function canonical(pathname = '/') {
  if (/^https?:\/\//.test(pathname)) return pathname;
  return `${site.domain}${pathname}`;
}

function schemaScript(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`;
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: canonical(item.href)
    }))
  };
}

function head({ title, description, pathname = '/', image = '/assets/images/hero-og.jpg', schemas = [], robots = 'index,follow' }) {
  const fullTitle = title === site.name ? `${site.gameName} Level Guides & Wiki | ${site.name}` : `${title} | ${site.name}`;
  const desc = cleanDescription(description);
  const url = canonical(pathname);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <meta name="robots" content="${robots}">
  <meta name="theme-color" content="#0b84c6">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/png" href="/assets/images/favicon-64.png">
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${canonical(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
  <meta name="twitter:description" content="${escapeHtml(desc)}">
  <meta name="twitter:image" content="${canonical(image)}">
  <link rel="stylesheet" href="/assets/css/site.css">
  ${schemas.map(schemaScript).join('\n  ')}
</head>`;
}

const navItems = [
  ['Home', '/', 'home'],
  ['Play', '/#play', 'play'],
  ['Levels', '/levels/', 'levels'],
  ['Wiki', '/wiki/', 'wiki'],
  ['Guides', '/guides/', 'guides'],
  ['Events', '/events/', 'events'],
  ['Download', '/download/', 'download']
];

function header(active = '') {
  const links = navItems.map(([label, href, key]) => `<a href="${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<body>
<a class="skip-link" href="#content">Skip to content</a>
<header class="site-header">
  <div class="container nav-row">
    <a class="brand" href="/" aria-label="Fish Sort Wiki home">
      <img src="/assets/images/finn-mascot.png" width="48" height="48" alt="">
      <span class="brand-copy"><strong>Fish Sort Wiki</strong><small>Unofficial player guide</small></span>
    </a>
    <nav class="nav-links" aria-label="Main navigation">${links}</nav>
    <form class="nav-search" data-level-search>
      <label class="sr-only" for="nav-level">Level number</label>
      <input id="nav-level" type="number" min="1" inputmode="numeric" placeholder="Level number" data-level-input>
      <button type="submit">Go</button>
    </form>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-button>Menu</button>
  </div>
  <div id="mobile-menu" class="mobile-menu" data-mobile-menu data-open="false">
    <nav class="container" aria-label="Mobile navigation">${links}</nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand"><img src="/assets/images/finn-mascot.png" width="56" height="56" alt=""><strong>Fish Sort Wiki</strong></div>
        <p>Play the YIGOT browser game and browse independent level help for the Shycheese mobile version.</p>
      </div>
      <div><h3>Find help</h3><ul><li><a href="/levels/">Level walkthroughs</a></li><li><a href="/guides/">Strategy guides</a></li><li><a href="/troubleshooting/">Troubleshooting</a></li></ul></div>
      <div><h3>Explore</h3><ul><li><a href="/wiki/">Wiki</a></li><li><a href="/events/">Events</a></li><li><a href="/download/">Official download</a></li></ul></div>
      <div><h3>Site</h3><ul><li><a href="/about/">About</a></li><li><a href="/contact/">Corrections</a></li><li><a href="/privacy/">Privacy</a></li><li><a href="/terms/">Terms</a></li></ul></div>
    </div>
    <div class="legal">© <span data-year>2026</span> Fish Sort Wiki. Unofficial fan guide. Fish Sort Puzzle and related marks belong to their respective owners. Not affiliated with Shycheese.</div>
  </div>
</footer>
<script>window.FISH_LEVELS=${levelJson};</script>
<script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><div class="container"><ol>${items.map((item, index) => `<li>${index === items.length - 1 ? escapeHtml(item.label) : `<a href="${item.href}">${escapeHtml(item.label)}</a>`}</li>`).join('')}</ol></div></nav>`;
}

function pageHero(eyebrow, title, intro) {
  return `<section class="page-hero"><div class="container page-hero-grid"><div><span class="article-eyebrow">${escapeHtml(eyebrow)}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(intro)}</p></div><img src="/assets/images/finn-mascot.png" width="170" height="170" alt=""></div></section>`;
}

function levelCard(entry) {
  return `<article class="card level-card"><div class="thumb"><img src="https://img.youtube.com/vi/${entry.videoId}/hqdefault.jpg" width="480" height="360" loading="lazy" decoding="async" alt="${escapeHtml(entry.title)} video thumbnail"><span class="level-badge">Verified Level ${entry.level}</span></div><div class="card-body"><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.summary)}</p><a class="card-link" href="/level/${entry.level}/">Open walkthrough →</a></div></article>`;
}

function articleCard(article) {
  return `<article class="card"><div class="card-body"><span class="card-kicker">${escapeHtml(article.eyebrow)}</span><h3>${escapeHtml(article.title)}</h3><p>${escapeHtml(article.description)}</p><a class="card-link" href="/${article.slug}/">Read guide →</a></div></article>`;
}

function home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.domain,
    description: site.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.domain}/levels/?level={level_number}`,
      'query-input': 'required name=level_number'
    }
  };
  const gameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Fish Sort Puzzle Online',
    description: 'A free browser-based fish sorting puzzle game with mouse and touch controls.',
    url: site.domain,
    gamePlatform: 'Web browser',
    playMode: 'SinglePlayer',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    author: { '@type': 'Organization', name: site.webGameDeveloper },
    datePublished: site.webGamePublished
  };
  const featuredWiki = ['wiki/how-to-play', 'wiki/boosters', 'wiki/fish-collection', 'wiki/events'].map((slug) => articleMap.get(slug));
  return `${head({ title: 'Fish Sort Puzzle Online - Play Free', description: site.description, schemas: [websiteSchema, gameSchema] })}${header('home')}
<main id="content">
  <section class="play-surface" id="play">
    <div class="container">
      <div class="play-heading">
        <div><span class="eyebrow">Free browser game</span><h1>Fish Sort Puzzle Online</h1><p>Tap matching fish, fill each tank, and keep the holding tray from overflowing. Play instantly on desktop or mobile.</p></div>
        <div class="play-actions"><button class="button button-secondary" type="button" data-game-fullscreen>Fullscreen</button><a class="button" href="#walkthroughs">Level help</a></div>
      </div>
      <div class="game-toolbar"><span><strong>Fish Sort Puzzle</strong> · Web version by ${site.webGameDeveloper}</span><span>Mouse + touch</span></div>
      <div class="game-stage" data-game-stage>
        <iframe src="${site.webGameEmbedUrl}" title="Play Fish Sort Puzzle online" width="720" height="1280" loading="eager" allow="autoplay; fullscreen; gamepad" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div class="game-disclosure"><strong>Version note:</strong> This playable HTML5 game is published by ${site.webGameDeveloper} and distributed by GameMonetize. The walkthrough library below covers the separate Shycheese mobile app. <a href="${site.webGameSourceUrl}" target="_blank" rel="noopener noreferrer">View the game source</a>.</div>
    </div>
  </section>
  <section class="section-compact"><div class="container stat-strip"><div class="stat"><strong>Play free</strong><span>no install required for the browser game</span></div><div class="stat"><strong>${levels.length} walkthroughs</strong><span>verified mobile level-video mappings</span></div><div class="stat"><strong>Official links only</strong><span>no APK files, mods, or account sales</span></div></div></section>
  <section class="section section-mist"><div class="container wiki-row"><div><span class="article-eyebrow">Featured walkthrough</span><h2>Watch Level 170 from start to finish.</h2><p>This video is part of the Fish Sort Puzzle playlist published by ${site.videoChannelName}. The full library was matched by visible level title and YouTube video ID.</p><p><a class="card-link" href="${site.videoPlaylistUrl}" target="_blank" rel="noopener noreferrer">Open the full playlist on YouTube →</a></p></div><div class="video-shell" data-video-id="${site.featuredVideo}" data-video-title="Fish Sort Puzzle Level 170 walkthrough"><img src="https://img.youtube.com/vi/${site.featuredVideo}/hqdefault.jpg" width="480" height="360" alt="Fish Sort Puzzle Level 170 walkthrough thumbnail"><button class="video-play" type="button"><span>Play Level 170</span></button></div></div></section>
  <section class="section" id="walkthroughs"><div class="container"><div class="section-heading"><div><span class="article-eyebrow">Mobile level library</span><h2>Latest verified walkthroughs</h2><p>These videos cover the Shycheese mobile app. Every indexed level is matched to a specific video.</p></div><a href="/levels/">Browse all ${levels.length} levels →</a></div><div class="card-grid">${featuredLevels.map(levelCard).join('')}</div></div></section>
  <section class="section level-finder"><div class="container"><div class="section-heading"><div><span class="article-eyebrow" style="color:#f2c84b">Fast route</span><h2>Jump back into the aquarium</h2><p>Open one of the newest verified levels, or use the directory search for any available number.</p></div><a style="color:#f2c84b" href="/guides/hard-levels/">Hard-level method →</a></div><div class="range-row">${latestLevels.map((entry) => `<a class="level-pill" href="/level/${entry.level}/">Level ${entry.level}</a>`).join('')}<a class="range-link" href="/levels/">All levels</a><a class="range-link" href="/guides/slot-management/">Slot strategy</a></div></div></section>
  <section class="section section-mist"><div class="container wiki-row"><div class="wiki-intro"><span class="article-eyebrow">Player reference</span><h2>A Wiki built from things players can verify</h2><p>Facts are tied to the Shycheese Android package, not mixed with similarly named fish-sorting games. Event details and economy values are treated as version-specific.</p><img src="/assets/images/finn-mascot.png" width="180" height="180" alt="Fish Sort Wiki helper mascot"></div><div class="topic-list">${featuredWiki.map((article, index) => `<a class="topic-link" href="/${article.slug}/"><span class="topic-index">0${index + 1}</span><span><strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(article.description)}</span></span><span class="topic-arrow">→</span></a>`).join('')}</div></div></section>
  <section class="section"><div class="container"><div class="event-band"><span class="event-label">Current event guide</span><div><h2>Pearl Hunt</h2><p>Check what counts, confirm the timer, and claim milestones before the event closes.</p></div><a class="button" href="/events/pearl-hunt/">Open event guide</a></div></div></section>
  <section class="section section-deep"><div class="container"><div class="section-heading"><div><span class="article-eyebrow" style="color:#f2c84b">How this guide helps</span><h2>Play, diagnose, then use the smallest fix.</h2><p>The best walkthrough pages do more than replay a video. They explain why the holding bar filled, which reveal changed the board, and when a booster is worth using.</p></div></div><div class="card-grid"><article><h3>Read the objective</h3><p>Start from the active tank orders instead of clearing the first available triple.</p></article><article><h3>Protect one slot</h3><p>Keep recovery space available so a useful reveal does not end the run.</p></article><article><h3>Verify the version</h3><p>Match videos and screenshots to the Shycheese game before following a route.</p></article></div></div></section>
  <section class="section"><div class="container"><div class="section-heading"><div><span class="article-eyebrow">Install safely</span><h2>Download from the official store.</h2><p>The download page identifies the developer and Android package so players do not confuse this game with similarly named apps. Fish Sort Wiki never hosts APK files.</p></div><a class="button" href="/download/">Open download page</a></div></div></section>
</main>${footer()}`;
}

function hubPage(key, hub) {
  const items = hub.slugs.map((slug) => articleMap.get(slug)).filter(Boolean);
  const path = `/${key}/`;
  const crumbs = [{ label: 'Home', href: '/' }, { label: hub.title, href: path }];
  return `${head({ title: hub.title, description: hub.description, pathname: path, schemas: [breadcrumbSchema(crumbs)] })}${header(key)}${breadcrumbs(crumbs)}<main id="content">${pageHero('Browse by topic', hub.title, hub.intro)}<section class="section"><div class="container"><div class="card-grid">${items.map(articleCard).join('')}</div></div></section></main>${footer()}`;
}

function articlePage(article) {
  const root = article.slug.split('/')[0];
  const hub = hubs[root];
  const path = `/${article.slug}/`;
  const crumbs = [{ label: 'Home', href: '/' }, { label: hub.title, href: `/${root}/` }, { label: article.title, href: path }];
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: '2026-09-30',
    dateModified: '2026-09-30',
    mainEntityOfPage: canonical(path),
    author: { '@type': 'Organization', name: site.name }
  };
  const schemas = [breadcrumbSchema(crumbs), articleSchema];
  if (article.faqs.length) {
    schemas.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: article.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) });
  }
  const related = hub.slugs.filter((slug) => slug !== article.slug).slice(0, 4).map((slug) => articleMap.get(slug));
  return `${head({ title: article.title, description: article.description, pathname: path, schemas })}${header(root)}${breadcrumbs(crumbs)}<main id="content">${pageHero(article.eyebrow, article.title, article.intro)}<section class="section"><div class="container article-layout"><article class="article-copy">${article.sections.map(([heading, text]) => `<section class="article-section"><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p></section>`).join('')}${article.faqs.length ? `<section class="article-section"><h2>Quick answers</h2><div class="faq-list">${article.faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')}</div></section>` : ''}</article><aside class="article-aside"><h3>Related help</h3><ul>${related.map((item) => `<li><a href="/${item.slug}/">${escapeHtml(item.title)}</a></li>`).join('')}<li><a href="/levels/">Verified level videos</a></li><li><a href="/download/">Official download links</a></li></ul></aside></div></section></main>${footer()}`;
}

function levelsPage() {
  const path = '/levels/';
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Level walkthroughs', href: path }];
  return `${head({ title: 'Fish Sort Puzzle Level Walkthroughs', description: `Browse ${levels.length} Fish Sort Puzzle level walkthroughs from Level ${levels[0].level} to ${levels.at(-1).level}, each mapped to a verified video.`, pathname: path, schemas: [breadcrumbSchema(crumbs)] })}${header('levels')}${breadcrumbs(crumbs)}<main id="content">${pageHero('Verified video library', 'Fish Sort Puzzle level walkthroughs', `Search ${levels.length} mapped walkthroughs from Level ${levels[0].level} through Level ${levels.at(-1).level}. Each page links to one specific video from the Daisy Gaming playlist.`)}<section class="section"><div class="container"><div class="library-toolbar"><form class="level-search" data-level-search><label class="sr-only" for="library-level">Level number</label><input id="library-level" type="number" min="1" inputmode="numeric" placeholder="Enter level number" data-level-input><button type="submit">Find level</button></form><a class="source-link" href="${site.videoPlaylistUrl}" target="_blank" rel="noopener noreferrer">Source playlist: ${site.videoChannelName}</a></div><div class="search-message" data-search-message aria-live="polite"></div><div class="level-grid">${levels.map((entry) => `<a class="level-pill" href="/level/${entry.level}/">Level ${entry.level}</a>`).join('')}</div><div class="callout"><strong>Known gaps:</strong> ${missingPublishedLevels.map((level) => `Level ${level}`).join(', ')} are not present in the channel results and do not have generated pages. Levels 1-14 are also not currently available.</div><div class="section-heading library-latest"><div><span class="article-eyebrow">Newest end of the playlist</span><h2>Levels ${latestLevels.at(-1).level}-${latestLevels[0].level}</h2><p>Open a recent walkthrough card, or use the numbered grid above for the complete verified library.</p></div></div><div class="card-grid">${latestLevels.map(levelCard).join('')}</div></div></section></main>${footer()}`;
}

function levelPage(entry) {
  const path = `/level/${entry.level}/`;
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Levels', href: '/levels/' }, { label: `Level ${entry.level}`, href: path }];
  const entryIndex = levels.findIndex((item) => item.level === entry.level);
  const previous = levels[entryIndex - 1];
  const next = levels[entryIndex + 1];
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: entry.title,
    description: entry.summary,
    thumbnailUrl: `https://img.youtube.com/vi/${entry.videoId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${entry.videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${entry.videoId}`
  };
  const nearbyLinks = [previous, next].filter(Boolean).map((item) => `<a class="nearby-level" href="/level/${item.level}/"><span>${item.level < entry.level ? 'Previous verified' : 'Next verified'}</span><strong>Level ${item.level}</strong></a>`).join('');
  return `${head({ title: entry.title, description: entry.summary, pathname: path, image: `https://img.youtube.com/vi/${entry.videoId}/maxresdefault.jpg`, schemas: [breadcrumbSchema(crumbs), videoSchema] })}${header('levels')}${breadcrumbs(crumbs)}<main id="content">${pageHero('Verified video walkthrough', entry.title, entry.summary)}<section class="section"><div class="container article-layout"><article class="article-copy"><div class="video-shell" data-video-id="${entry.videoId}" data-video-title="${escapeHtml(entry.title)}"><img src="https://img.youtube.com/vi/${entry.videoId}/hqdefault.jpg" width="480" height="360" alt="${escapeHtml(entry.title)} thumbnail"><button class="video-play" type="button"><span>Play walkthrough</span></button></div><section class="article-section"><h2>How to use this Level ${entry.level} walkthrough</h2><p>Watch the opening until the first triple clears, then pause and compare the fish in your holding bar. If your board differs, restart from the first unnecessary species instead of copying later taps onto a different state.</p></section><section class="article-section"><h2>Protect the holding slots</h2><p>Count open spaces before revealing a new fish type. A pair is useful only when the third matching fish is visible or will be exposed by the next clear. Keep one recovery slot available whenever possible.</p></section><section class="article-section"><h2>Video source and version check</h2><p>This Level ${entry.level} mapping was verified from the ${site.videoChannelName} Fish Sort Puzzle playlist on ${entry.verifiedOn}. The guide targets the Shycheese game with Android package <code>${site.packageId}</code>. Updates can change a board, so report a mismatch with the app version and opening layout.</p></section><nav class="nearby-levels" aria-label="Nearby verified levels">${nearbyLinks}</nav></article><aside class="article-aside"><h3>Level details</h3><ul><li>Level: ${entry.level}</li><li>Mapping checked: ${entry.verifiedOn}</li><li><a href="https://www.youtube.com/watch?v=${entry.videoId}" target="_blank" rel="noopener noreferrer">Open on YouTube</a></li><li><a href="${site.videoPlaylistUrl}" target="_blank" rel="noopener noreferrer">Full Daisy Gaming playlist</a></li><li><a href="/guides/slot-management/">Holding-slot strategy</a></li><li><a href="/wiki/boosters/">Booster guide</a></li></ul></aside></div></section></main>${footer()}`;
}

function downloadPage() {
  const path = '/download/';
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Download', href: path }];
  return `${head({ title: 'Download Fish Sort Puzzle Safely', description: 'Download the Shycheese version of Fish Sort Puzzle from the official Google Play listing and verify the developer and package ID.', pathname: path, schemas: [breadcrumbSchema(crumbs)] })}${header('download')}${breadcrumbs(crumbs)}<main id="content">${pageHero('Official links only', 'Download Fish Sort Puzzle safely', 'Use the verified store listing for the Shycheese version. Fish Sort Wiki does not host APK files, mods, accounts, or coin packages.')}<section class="section"><div class="container"><div class="download-panel"><div><h2>Android download</h2><p>Confirm the developer name and package ID before installing. Other games use similar titles and may have different levels, fish, and boosters.</p><a class="button" href="${site.playStore}" target="_blank" rel="noopener noreferrer">Get it on Google Play</a><table class="detail-table"><tr><th>Game</th><td>${site.gameName}</td></tr><tr><th>Developer</th><td>${site.developer}</td></tr><tr><th>Android package</th><td><code>${site.packageId}</code></td></tr><tr><th>Category</th><td>Puzzle</td></tr><tr><th>Guide coverage</th><td>Levels, mechanics, boosters, events, and troubleshooting</td></tr></table></div><img src="/assets/images/finn-mascot.png" width="210" height="210" alt="Fish Sort Wiki helper mascot"></div><div class="callout"><strong>iPhone and PC:</strong> Add platform buttons only after the same developer and game identity are verified in the official store. Do not install an APK from an advertisement or third-party download page.</div></div></section></main>${footer()}`;
}

function infoPage(type) {
  const configs = {
    about: ['About Fish Sort Wiki', 'Why this independent guide verifies game versions, videos, and store links before publishing.', 'Fish Sort Wiki helps players solve the Shycheese version of Fish Sort Puzzle without mixing it with similarly named games. The site combines a small verified level library with mechanics, event, reward, and troubleshooting references.', [
      ['Editorial approach', 'We prefer a smaller number of checked pages over thousands of generated placeholders. Level mappings should show the same game interface and board.'],
      ['Independent status', 'This is an unofficial fan guide. It is not operated, sponsored, or endorsed by Shycheese, Google Play, or YouTube.'],
      ['Corrections', 'Game updates can change levels and economy values. Corrections should include the app version, device platform, and a source image or video when possible.']
    ]],
    contact: ['Corrections and Source Notes', 'How to submit a Fish Sort Wiki correction after launch and what evidence helps verify a changed level or event.', 'A public corrections channel will be added after the domain is registered and hosting is connected. Until then, keep the app version, level number, and source link together so a report can be checked efficiently.', [
      ['For a changed level', 'Include the level number, app version, platform, and a screenshot of the opening board.'],
      ['For an event', 'Include the event name, visible start or end time, region if relevant, and the in-game rules panel.'],
      ['For a video mapping', 'Include the YouTube URL and confirm that the interface matches the Shycheese package listed on the download page.']
    ]],
    privacy: ['Privacy Policy', 'Privacy information for Fish Sort Wiki, including local site behavior and third-party video or store links.', 'Fish Sort Wiki is designed as a static guide. The launch build does not create user accounts, accept uploads, sell products, or store form submissions.', [
      ['Server logs', 'A future hosting provider may process standard request information such as IP address, browser type, requested page, and timestamp for security and reliability.'],
      ['Embedded video', 'YouTube content is loaded only after a visitor presses play and uses the privacy-enhanced youtube-nocookie.com player. YouTube may process data under its own policies.'],
      ['External stores', 'Google Play and other official storefronts have their own privacy practices. Fish Sort Wiki does not receive payment or account credentials from those services.']
    ]],
    terms: ['Terms of Use', 'Terms for using Fish Sort Wiki walkthroughs, references, links, and independently created site artwork.', 'Fish Sort Wiki provides general game information and player guidance without warranties. Game content, availability, events, and prices can change without notice.', [
      ['Unofficial guide', 'The site is not affiliated with the game developer. Names and marks remain the property of their respective owners.'],
      ['No game files', 'The site does not distribute APK files, modifications, cheats, currencies, or accounts.'],
      ['External content', 'Video and store links lead to third-party services. Availability and accuracy of external content are controlled by those services.']
    ]]
  };
  const [title, description, intro, sections] = configs[type];
  const path = `/${type}/`;
  const crumbs = [{ label: 'Home', href: '/' }, { label: title, href: path }];
  return `${head({ title, description, pathname: path, schemas: [breadcrumbSchema(crumbs)], robots: type === 'about' ? 'index,follow' : 'noindex,follow' })}${header('')}${breadcrumbs(crumbs)}<main id="content">${pageHero('Site information', title, intro)}<section class="section"><div class="container article-layout"><article class="article-copy">${sections.map(([heading, text]) => `<section class="article-section"><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p></section>`).join('')}</article><aside class="article-aside"><h3>Quick links</h3><ul><li><a href="/about/">About the site</a></li><li><a href="/privacy/">Privacy</a></li><li><a href="/terms/">Terms</a></li><li><a href="/download/">Verified download</a></li></ul></aside></div></section></main>${footer()}`;
}

function notFoundPage() {
  return `${head({ title: 'Page Not Found', description: 'The requested Fish Sort Wiki page could not be found.', pathname: '/404.html', robots: 'noindex,follow' })}${header('')}<main id="content" class="not-found"><div class="container"><img src="/assets/images/finn-mascot.png" width="190" height="190" alt=""><h1>That fish slipped away.</h1><p>The page is missing or the level has not been verified yet.</p><a class="button" href="/levels/">Browse verified levels</a></div></main>${footer()}`;
}

async function writePage(relativePath, contents) {
  const output = join(publicRoot, relativePath);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, contents, 'utf8');
}

await mkdir(join(publicRoot, 'assets/css'), { recursive: true });
await mkdir(join(publicRoot, 'assets/js'), { recursive: true });
await copyFile(join(projectRoot, 'src/styles.css'), join(publicRoot, 'assets/css/site.css'));
await copyFile(join(projectRoot, 'src/site.js'), join(publicRoot, 'assets/js/site.js'));

await writePage('index.html', home());
await writePage('levels/index.html', levelsPage());
for (const entry of levels) await writePage(`level/${entry.level}/index.html`, levelPage(entry));
for (const [key, hub] of Object.entries(hubs)) await writePage(`${key}/index.html`, hubPage(key, hub));
for (const article of articles) await writePage(`${article.slug}/index.html`, articlePage(article));
await writePage('download/index.html', downloadPage());
for (const type of ['about', 'contact', 'privacy', 'terms']) await writePage(`${type}/index.html`, infoPage(type));
await writePage('404.html', notFoundPage());

const urls = [
  '/', '/levels/', '/wiki/', '/guides/', '/events/', '/troubleshooting/', '/download/', '/about/',
  ...levels.map((entry) => `/level/${entry.level}/`),
  ...articles.map((article) => `/${article.slug}/`)
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${canonical(url)}</loc><lastmod>2026-10-01</lastmod></url>`).join('\n')}\n</urlset>\n`;
await writeFile(join(publicRoot, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(publicRoot, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`, 'utf8');

const previewCss = (await readFile(join(projectRoot, 'src/styles.css'), 'utf8'))
  .replaceAll("url('/assets/images/", "url('../images/");
await writeFile(join(publicRoot, 'assets/css/preview.css'), previewCss, 'utf8');
const previewHtml = home()
  .replace('href="/assets/css/site.css"', 'href="public/assets/css/preview.css"')
  .replaceAll('src="/assets/', 'src="public/assets/')
  .replaceAll('href="/assets/', 'href="public/assets/');
await writeFile(join(projectRoot, 'preview.html'), previewHtml, 'utf8');

console.log(`Built ${urls.length} indexable URLs plus legal pages and 404.`);
