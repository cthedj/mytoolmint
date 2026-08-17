import type { APIRoute } from 'astro';
import { tools } from '../lib/tools';

export const GET: APIRoute = ({ site }) => {
  const configuredSite = site ?? new URL('https://mytoolmint.com');
  const publicBase = configuredSite.hostname === 'cthedj.github.io' ? new URL('/mytoolmint/', configuredSite) : configuredSite;
  const routes = ['/', '/tools', ...tools.map((tool) => `/${tool.path}`), '/about', '/contact', '/word-list-and-scoring', '/privacy-policy', '/cookie-policy', '/terms-of-use', '/disclaimer'];
  const urls = routes.map((route) => `  <url><loc>${new URL(route.replace(/^\//, ''), publicBase)}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
