import { formatPostDate, parsePostDate } from '@/lib/dates';
import { getAllPosts } from '@/lib/posts';
import { getSiteUrl, site } from '@/lib/site';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function GET() {
  const base = getSiteUrl();
  const posts = getAllPosts();
  const items: string[] = [];

  for (const post of posts) {
    items.push(`<item>
      <title>${escapeXml(post.title)}</title>
      <link>${base}/posts/${post.slug}</link>
      <guid>${base}/posts/${post.slug}</guid>
      <pubDate>${parsePostDate(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description || `${formatPostDate(post.date)} · ${site.name}`)}</description>
    </item>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${base}</link>
    <description>${escapeXml(site.description)}</description>
    ${items.join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
