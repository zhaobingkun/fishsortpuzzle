import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { levels, site } from '../src/data.mjs';

const root = new URL('../public/', import.meta.url);
const rootPath = root.pathname;
const errors = [];
const titles = new Map();

if (levels.length < 147) errors.push(`expected at least 147 verified levels, found ${levels.length}`);

const levelNumbers = new Set();
const videoIds = new Set();
let previousLevel = 0;
for (const entry of levels) {
  if (!Number.isInteger(entry.level) || entry.level <= previousLevel) errors.push(`levels are not strictly ascending at ${entry.level}`);
  if (!/^[A-Za-z0-9_-]{11}$/.test(entry.videoId)) errors.push(`Level ${entry.level}: invalid YouTube ID ${entry.videoId}`);
  if (levelNumbers.has(entry.level)) errors.push(`duplicate level ${entry.level}`);
  if (videoIds.has(entry.videoId)) errors.push(`duplicate YouTube ID ${entry.videoId}`);
  levelNumbers.add(entry.level);
  videoIds.add(entry.videoId);
  previousLevel = entry.level;
}

const homepage = await readFile(join(rootPath, 'index.html'), 'utf8');
if (!homepage.includes('html5.gamemonetize.games/diiob6luzs7e36nbbt1iz74wlvf4vo2d/')) {
  errors.push('homepage: missing verified Fish Sort Puzzle web game embed');
}
if (!/<iframe[^>]+title="Play Fish Sort Puzzle online"/.test(homepage)) {
  errors.push('homepage: game iframe needs an accessible title');
}
if (!homepage.includes('Web version by YIGOT') || !homepage.includes('Shycheese mobile game')) {
  errors.push('homepage: web and mobile game versions are not clearly distinguished');
}

if (homepage.indexOf('Two different games:') < 0 || homepage.indexOf('Two different games:') > homepage.indexOf('<iframe')) {
  errors.push('homepage: version note must appear before the playable iframe');
}

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) files.push(...await walk(path));
    else if (entry.endsWith('.html')) files.push(path);
  }
  return files;
}

function targetFor(href) {
  const path = href.split('#')[0].split('?')[0];
  if (!path || !path.startsWith('/') || path.startsWith('//')) return null;
  if (path === '/') return join(rootPath, 'index.html');
  if (path.endsWith('/')) return join(rootPath, path, 'index.html');
  return join(rootPath, path);
}

for (const file of await walk(rootPath)) {
  const html = await readFile(file, 'utf8');
  const rel = file.slice(rootPath.length);
  const h1s = html.match(/<h1\b/g) || [];
  if (h1s.length !== 1) errors.push(`${rel}: expected 1 H1, found ${h1s.length}`);
  if (!/<meta name="description" content="[^"]+">/.test(html)) errors.push(`${rel}: missing description`);
  if (!html.includes(`<link rel="canonical" href="${site.domain}/`)) errors.push(`${rel}: missing canonical`);
  if (html.includes(`${site.domain}http`)) errors.push(`${rel}: malformed absolute social image URL`);
  const analyticsMatches = html.match(new RegExp(site.googleAnalyticsId, 'g')) || [];
  if (analyticsMatches.length !== 2) errors.push(`${rel}: expected one Google tag loader and one config, found ${analyticsMatches.length} measurement ID references`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) errors.push(`${rel}: missing title`);
  else if (titles.has(title)) errors.push(`${rel}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, rel);
  if (/TODO|lorem ipsum/i.test(html)) errors.push(`${rel}: placeholder copy found`);

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const target = targetFor(match[1]);
    if (!target) continue;
    try { await stat(target); } catch { errors.push(`${rel}: broken link ${match[1]}`); }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${titles.size} HTML pages and ${levels.length} unique level-video mappings: metadata and internal links are valid.`);
}
