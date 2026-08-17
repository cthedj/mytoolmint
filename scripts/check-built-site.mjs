import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const requiredRoutes = [
  'index', 'tools', 'word-unscrambler', 'anagram-solver', 'word-finder', 'word-counter',
  'percentage-calculator', 'age-calculator', 'vat-calculator', 'budget-calculator',
  'savings-calculator', 'length-converter', 'weight-converter', 'temperature-converter',
  'data-storage-converter', 'time-converter', 'about', 'contact', 'word-list-and-scoring',
  'privacy-policy', 'cookie-policy', 'terms-of-use', 'disclaimer',
];
const routeSet = new Set(requiredRoutes.map((route) => route === 'index' ? '' : route));
const failures = [];

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  });
}

for (const route of requiredRoutes) {
  const file = route === 'index' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  if (!existsSync(file)) failures.push(`Missing route output: ${route}`);
  else {
    const html = readFileSync(file, 'utf8');
    const expectedCanonical = route === 'index' ? 'https://mytoolmint.com/' : `https://mytoolmint.com/${route}`;
    if (!html.includes(`<link rel="canonical" href="${expectedCanonical}"`)) failures.push(`${route}: incorrect canonical URL`);
  }
}

for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  const name = relative(dist, file);
  const checks = [
    ['title', /<title>[^<]+<\/title>/],
    ['meta description', /<meta name="description" content="[^"]+"/],
    ['robots directive', /<meta name="robots" content="[^"]+"/],
    ['canonical URL', /<link rel="canonical" href="https:\/\/mytoolmint\.com\/?[^"]*"/],
  ];
  for (const [label, pattern] of checks) if (!pattern.test(html)) failures.push(`${name}: missing ${label}`);
  const headings = html.match(/<h1(?:\s|>)/g)?.length ?? 0;
  if (headings !== 1) failures.push(`${name}: expected one h1, found ${headings}`);
}

const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8');
const basePath = indexHtml.includes('href="/mytoolmint/favicon.svg"') ? '/mytoolmint/' : '/';
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  const name = relative(dist, file);
  const pageRoute = name === 'index.html' ? '' : name.replace(/\/index\.html$/, '');
  const pageUrl = new URL(`${basePath}${pageRoute ? `${pageRoute}/` : ''}`, 'https://build.local');
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (href.startsWith('#')) continue;
    const target = new URL(href, pageUrl);
    if (target.origin !== pageUrl.origin || !target.pathname.startsWith(basePath)) continue;
    const route = target.pathname.slice(basePath.length).replace(/^\/|\/$/g, '');
    if (/\.[a-z0-9]+$/i.test(route)) continue;
    if (!routeSet.has(route)) failures.push(`${name}: broken internal route ${href}`);
  }
}

if (failures.length) {
  console.error(`Built-site QA failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Built-site QA passed for ${requiredRoutes.length} routes.`);
