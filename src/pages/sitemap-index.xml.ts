import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const routes = ['/', '/word-unscrambler', '/tools', '/about', '/contact'];
  const urls = routes.map((route) => `  <url><loc>${new URL(route, site)}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
