import { mkdir, writeFile, copyFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, levels, articles, hubs } from '../src/data.mjs';
import { levelNotes } from '../src/level-notes.mjs';
import { videoMetadata } from '../src/video-metadata.mjs';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = join(projectRoot, 'public');
const articleMap = new Map(articles.map((article) => [article.slug, article]));
const playableLevels = levels.filter((entry) => entry.available);
const featuredLevels = playableLevels.slice(-6).reverse();
const latestLevels = playableLevels.slice(-12).reverse();
const featuredEntry = levels.find((entry) => entry.level === site.featuredLevel && entry.available) ?? playableLevels.at(-1);
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

function youtubeWatchUrl(entry, seconds = entry.startSeconds) {
  return `https://www.youtube.com/watch?v=${entry.videoId}${seconds ? `&t=${seconds}s` : ''}`;
}

function youtubeEmbedUrl(entry) {
  return `https://www.youtube.com/embed/${entry.videoId}${entry.startSeconds ? `?start=${entry.startSeconds}` : ''}`;
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
  <script async src="https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${site.googleAnalyticsId}');
  </script>
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
  return `<section class="page-hero"><div class="container page-hero-grid"><div><span class="article-eyebrow">${escapeHtml(eyebrow)}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(intro)}</p></div></div></section>`;
}

function levelCard(entry) {
  const image = entry.available
    ? `https://img.youtube.com/vi/${entry.videoId}/hqdefault.jpg`
    : '/assets/images/hero-og.jpg';
  const badge = entry.available ? `Playable Level ${entry.level}` : `Reviewed Level ${entry.level}`;
  const action = entry.available ? 'Open walkthrough' : 'Open board notes';
  return `<article class="card level-card"><div class="thumb"><img src="${image}" width="480" height="360" loading="lazy" decoding="async" alt="${escapeHtml(entry.title)}${entry.available ? ' video thumbnail' : ' board notes'}"><span class="level-badge">${badge}</span></div><div class="card-body"><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.summary)}</p><a class="card-link" href="/level/${entry.level}/">${action} →</a></div></article>`;
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
    <div class="play-hero">
      <div class="container play-heading">
        <div><span class="eyebrow">Free browser game</span><h1>Fish Sort Puzzle Online</h1><p>Tap matching fish, fill each tank, and keep the holding tray from overflowing. Play instantly on desktop or mobile.</p></div>
        <div class="play-actions"><button class="button button-secondary" type="button" data-game-fullscreen>Fullscreen</button><a class="button" href="#walkthroughs">Mobile walkthroughs</a></div>
      </div>
    </div>
    <div class="container play-game">
      <div class="game-disclosure" role="note"><strong>Two different games:</strong> Play the ${site.webGameDeveloper} browser version below, distributed by GameMonetize. Our <a href="/levels/">level walkthroughs</a> cover the separate <strong>Shycheese mobile game</strong> and do not match this browser game. <a href="/download/">Get the mobile version →</a> · <a href="${site.webGameSourceUrl}" target="_blank" rel="noopener noreferrer">Browser game source</a></div>
      <div class="game-toolbar"><span><strong>Fish Sort Puzzle</strong> · Web version by ${site.webGameDeveloper}</span><span>Mouse + touch</span></div>
      <div class="game-stage" data-game-stage>
        <iframe src="${site.webGameEmbedUrl}" title="Play Fish Sort Puzzle online" width="720" height="1280" loading="eager" allow="autoplay; fullscreen; gamepad" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div>
  </section>
  <section class="section-compact"><div class="container stat-strip"><div class="stat"><strong>Play free</strong><span>no install required for the browser game</span></div><div class="stat"><strong>${levels.length} level guides</strong><span>${playableLevels.length} currently have playable replacement videos</span></div><div class="stat"><strong>Official links only</strong><span>no APK files, mods, or account sales</span></div></div></section>
  <section class="section section-mist"><div class="container wiki-row"><div><span class="article-eyebrow">Featured replacement</span><h2>Watch Level ${featuredEntry.level} from the checked opening.</h2><p>This playable replacement was published by ${escapeHtml(featuredEntry.sourceName)} and visually matched to the mobile Fish Sort interface. Board layout can vary by app build, so compare the opening before following later moves.</p><p><a class="card-link" href="${youtubeWatchUrl(featuredEntry)}" target="_blank" rel="noopener noreferrer">Open Level ${featuredEntry.level} on YouTube →</a></p></div><div class="video-shell" data-video-id="${featuredEntry.videoId}" data-video-start="${featuredEntry.startSeconds}" data-video-title="${escapeHtml(featuredEntry.title)}"><img src="https://img.youtube.com/vi/${featuredEntry.videoId}/hqdefault.jpg" width="480" height="360" alt="${escapeHtml(featuredEntry.title)} thumbnail"><button class="video-play" type="button"><span>Play Level ${featuredEntry.level}</span></button></div></div></section>
  <section class="section" id="walkthroughs"><div class="container"><div class="section-heading"><div><span class="article-eyebrow">Mobile level library</span><h2>Playable replacement walkthroughs</h2><p>These ${playableLevels.length} videos were checked against visible level numbers and the Shycheese-style mobile interface on October 28, 2026.</p></div><a href="/levels/">Browse all ${levels.length} level guides →</a></div><div class="card-grid">${featuredLevels.map(levelCard).join('')}</div></div></section>
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
  return `${head({ title: 'Fish Sort Puzzle Level Walkthroughs', description: `Browse ${levels.length} Fish Sort Puzzle level guides from Level ${levels[0].level} to ${levels.at(-1).level}, including ${playableLevels.length} checked replacement videos.`, pathname: path, schemas: [breadcrumbSchema(crumbs)] })}${header('levels')}${breadcrumbs(crumbs)}<main id="content">${pageHero('Level guide library', 'Fish Sort Puzzle level walkthroughs', `Search ${levels.length} reviewed level pages from Level ${levels[0].level} through Level ${levels.at(-1).level}. ${playableLevels.length} pages currently have playable replacement videos; the other pages retain useful historical board notes while replacement research continues.`)}<section class="section"><div class="container"><div class="library-toolbar"><form class="level-search" data-level-search><label class="sr-only" for="library-level">Level number</label><input id="library-level" type="number" min="1" inputmode="numeric" placeholder="Enter level number" data-level-input><button type="submit">Find level</button></form><a class="source-link" href="https://www.youtube.com/playlist?list=PLONMFLY_92YY" target="_blank" rel="noopener noreferrer">New Levels 1–14 source playlist</a></div><div class="search-message" data-search-message aria-live="polite"></div><div class="callout"><strong>Playback status checked October 28, 2026:</strong> The original Daisy Gaming uploads are unavailable. Replacement videos are live for Levels 1–22, 25, and 29; every page keeps its reviewed board notes and clearly labels whether a video can be played.</div><div class="level-grid">${levels.map((entry) => `<a class="level-pill${entry.available ? '' : ' is-unavailable'}" href="/level/${entry.level}/">Level ${entry.level}${entry.available ? '' : ' · notes'}</a>`).join('')}</div><section id="reviewed-levels" class="article-section"><h2>How to use the written board notes</h2><p>Each page records visible order portraits, counters, holding slots, or obstacles at a checked timestamp. The observations help identify a matching board; they are not presented as independently tested tap-by-tap solutions.</p><div class="range-row">${playableLevels.map((entry) => `<a class="level-pill" href="/level/${entry.level}/">Level ${entry.level}</a>`).join('')}</div></section><div class="callout"><strong>Coverage:</strong> Levels 1–170 now all have indexable guide pages. ${playableLevels.length} have current playable video sources and ${levels.length - playableLevels.length} have historical notes with the removed player suppressed.</div><div class="section-heading library-latest"><div><span class="article-eyebrow">Playable replacements</span><h2>Recently verified videos</h2><p>Open a replacement walkthrough card, or use the numbered grid above for any reviewed level page.</p></div></div><div class="card-grid">${latestLevels.map(levelCard).join('')}</div></div></section></main>${footer()}`;
}

function reviewedLevelCopy(entry, notes) {
  if (notes.videoId !== entry.videoId) throw new Error(`Level ${entry.level}: board notes reference a different video`);
  const minutes = Math.floor(notes.seconds / 60);
  const seconds = String(notes.seconds % 60).padStart(2, '0');
  const checkpoints = [{ seconds: notes.seconds, label: `Compare the reviewed board at ${minutes}:${seconds}` }, ...(notes.extraCheckpoints ?? [])];
  const sourceText = entry.available
    ? `the ${entry.sourceName} recording`
    : `the original ${entry.sourceName} recording, which is now unavailable`;
  const checkpointLinks = entry.available
    ? `<p>${checkpoints.map(({ seconds: checkpointSeconds, label }) => `<a href="${youtubeWatchUrl(entry, checkpointSeconds)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} →</a>`).join(' · ')}</p>`
    : '';
  const counterText = Number.isFinite(notes.counterGoal)
    ? `<p>The recorded progress counter has a goal of <strong>${notes.counterGoal}</strong>. This is the on-screen counter, not a move count or a count of fish visible in one frame.</p>`
    : '<p>The total goal was not reliably readable at this checkpoint, so this page leaves it unspecified.</p>';
  return `<section class="article-section level-review" aria-label="Reviewed board notes"><h2>Level ${entry.level}: reviewed board notes</h2><p>These notes describe a visible checkpoint in ${sourceText}, reviewed on <time datetime="${notes.checkedOn}">${notes.checkedOn}</time>. Use them to compare your board. They are not a complete tap-by-tap solution; fish names below describe colors and shapes, not official species names.</p>${checkpointLinks}${counterText}</section>${notes.sections.map(([heading, text]) => `<section class="article-section"><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p></section>`).join('')}`;
}

function levelPage(entry) {
  const path = `/level/${entry.level}/`;
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Levels', href: '/levels/' }, { label: `Level ${entry.level}`, href: path }];
  const entryIndex = levels.findIndex((item) => item.level === entry.level);
  const previous = levels[entryIndex - 1];
  const next = levels[entryIndex + 1];
  const metadata = videoMetadata[entry.level];
  if (!metadata || metadata.videoId !== entry.videoId || !Number.isFinite(Date.parse(metadata.uploadDate))) throw new Error(`Level ${entry.level}: missing or mismatched verified upload date`);
  const videoSchema = entry.available ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: entry.title,
    description: entry.summary,
    thumbnailUrl: `https://img.youtube.com/vi/${entry.videoId}/maxresdefault.jpg`,
    embedUrl: youtubeEmbedUrl(entry),
    uploadDate: metadata.uploadDate
  } : null;
  const nearbyLinks = [previous, next].filter(Boolean).map((item) => `<a class="nearby-level" href="/level/${item.level}/"><span>${item.level < entry.level ? 'Previous verified' : 'Next verified'}</span><strong>Level ${item.level}</strong></a>`).join('');
  const schemas = [breadcrumbSchema(crumbs), ...(videoSchema ? [videoSchema] : [])];
  const socialImage = entry.available ? `https://img.youtube.com/vi/${entry.videoId}/maxresdefault.jpg` : '/assets/images/hero-og.jpg';
  const mediaBlock = entry.available
    ? `<div class="video-shell" data-video-id="${entry.videoId}" data-video-start="${entry.startSeconds}" data-video-title="${escapeHtml(entry.title)}"><img src="https://img.youtube.com/vi/${entry.videoId}/hqdefault.jpg" width="480" height="360" alt="${escapeHtml(entry.title)} thumbnail"><button class="video-play" type="button"><span>Play walkthrough</span></button></div>`
    : `<div class="callout video-unavailable" role="note"><strong>Original video unavailable:</strong> The Daisy Gaming upload tied to these historical observations can no longer be played. The player and VideoObject markup have been removed while a replacement is researched.</div>`;
  const sourceCopy = entry.available
    ? `This Level ${entry.level} replacement was visually verified from <a href="${entry.sourceUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(entry.sourceName)}</a> on ${entry.verifiedOn}. The uploader did not provide a verifiable package ID or exact app build, so compare the visible opening with your screen before following later moves.`
    : `These Level ${entry.level} observations were originally reviewed from ${escapeHtml(entry.sourceName)}. That video is unavailable as of October 28, 2026. The written checkpoint remains as historical board evidence and is not presented as a playable or tested full solution.`;
  const sourceLinks = entry.available
    ? `<li><a href="${youtubeWatchUrl(entry)}" target="_blank" rel="noopener noreferrer">Open on YouTube</a></li><li><a href="${entry.sourceUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(entry.sourceName)} channel</a></li>${entry.playlistUrl ? `<li><a href="${entry.playlistUrl}" target="_blank" rel="noopener noreferrer">Source playlist</a></li>` : ''}`
    : '<li>Video status: source unavailable</li>';
  return `${head({ title: entry.title, description: entry.summary, pathname: path, image: socialImage, schemas })}${header('levels')}${breadcrumbs(crumbs)}<main id="content">${pageHero(entry.available ? 'Playable replacement walkthrough' : 'Reviewed historical board notes', entry.title, entry.summary)}<section class="section"><div class="container article-layout"><article class="article-copy">${mediaBlock}${reviewedLevelCopy(entry, levelNotes[entry.level])}<section class="article-section"><h2>Video source and version check</h2><p>${sourceCopy}</p><p>The guide covers the Shycheese mobile game identified by Android package <code>${site.packageId}</code>; it is separate from the YIGOT browser game on the homepage.</p></section><nav class="nearby-levels" aria-label="Nearby verified levels">${nearbyLinks}</nav></article><aside class="article-aside"><h3>Level details</h3><ul><li>Level: ${entry.level}</li><li>Mapping checked: ${entry.verifiedOn}</li><li>Board notes reviewed: ${levelNotes[entry.level].checkedOn}</li>${sourceLinks}<li><a href="/guides/slot-management/">Holding-slot strategy</a></li><li><a href="/wiki/boosters/">Booster guide</a></li></ul></aside></div></section></main>${footer()}`;
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
const modifiedPages = new Map([['/', '2026-10-28'], ['/levels/', '2026-10-28'], ...Object.entries(levelNotes).map(([level, notes]) => [`/level/${level}/`, notes.checkedOn]), ...Object.entries(videoMetadata).map(([level, metadata]) => [`/level/${level}/`, metadata.checkedOn])]);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${canonical(url)}</loc><lastmod>${modifiedPages.get(url) ?? '2026-10-01'}</lastmod></url>`).join('\n')}\n</urlset>\n`;
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
