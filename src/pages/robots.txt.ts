import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const configuredSite = site ?? new URL('https://mytoolmint.com');
  const publicBase = configuredSite.hostname === 'cthedj.github.io' ? new URL('/mytoolmint/', configuredSite) : configuredSite;
  const sitemap = new URL('sitemap-index.xml', publicBase);

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
