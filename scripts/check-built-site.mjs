import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const requiredRoutes = ['index', 'word-unscrambler', 'tools', 'about', 'contact', 'word-list-and-scoring', 'privacy-policy', 'cookie-policy', 'terms-of-use', 'disclaimer'];
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

if (failures.length) {
  console.error(`Built-site QA failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Built-site QA passed for ${requiredRoutes.length} routes.`);
