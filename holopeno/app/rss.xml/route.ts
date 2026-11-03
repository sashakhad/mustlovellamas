import { parsePostDate } from '@/lib/dates';
import { getAllPosts } from '@/lib/posts';
import { getSiteUrl, site } from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const base = getSiteUrl();
  const items = getAllPosts().map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${base}/posts/${post.slug}</link>
      <guid isPermaLink="false">${site.shortName}:${post.slug}</guid>
      <pubDate>${parsePostDate(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description || post.title)}</description>
    </item>`,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${base}</link>
    <description>${escapeXml(site.tagline)}</description>
    <language>en</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
