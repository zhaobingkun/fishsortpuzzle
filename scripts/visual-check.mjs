import { chromium } from '/Users/zhaobingkun/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const publicRoot = join(projectRoot, 'public');
const shotRoot = join(projectRoot, 'screenshots');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

async function localFile(url) {
  let pathname = new URL(url).pathname;
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = join(publicRoot, pathname);
  try {
    const info = await stat(file);
    return info.isFile() ? file : join(publicRoot, '404.html');
  } catch {
    return join(publicRoot, '404.html');
  }
}

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
});
const cases = [
  { name: 'home-desktop', url: 'http://fishsort.local/', viewport: { width: 1440, height: 1000 }, fullPage: true },
  { name: 'home-mobile', url: 'http://fishsort.local/', viewport: { width: 390, height: 844 }, fullPage: true },
  { name: 'wiki-desktop', url: 'http://fishsort.local/wiki/how-to-play/', viewport: { width: 1440, height: 1000 }, fullPage: true },
  { name: 'level-mobile', url: 'http://fishsort.local/level/72/', viewport: { width: 390, height: 844 }, fullPage: true }
];

for (const test of cases) {
  const page = await browser.newPage({ viewport: test.viewport, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('http://fishsort.local/**', async (route) => {
    const file = await localFile(route.request().url());
    const body = await readFile(file);
    await route.fulfill({ status: file.endsWith('404.html') ? 404 : 200, contentType: mime[extname(file)] || 'application/octet-stream', body });
  });
  await page.goto(test.url, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: join(shotRoot, `${test.name}.png`), fullPage: test.fullPage });
  const metrics = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.trim(),
    viewportWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyHeight: document.body.scrollHeight,
    images: Array.from(document.images).map((img) => ({ src: img.getAttribute('src'), complete: img.complete, width: img.naturalWidth }))
  }));
  const localBroken = metrics.images.filter((img) => img.src?.startsWith('/') && (!img.complete || !img.width));
  if (metrics.scrollWidth > metrics.viewportWidth) errors.push(`horizontal overflow ${metrics.scrollWidth} > ${metrics.viewportWidth}`);
  if (localBroken.length) errors.push(`broken local images: ${localBroken.map((img) => img.src).join(', ')}`);
  console.log(JSON.stringify({ name: test.name, ...metrics, errors }));
  await page.close();
}

await browser.close();
