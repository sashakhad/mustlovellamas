import type { MetadataRoute } from 'next';
import { parsePostDate } from '../lib/dates';
import { getAllPosts } from '../lib/posts';
import { getSiteUrl } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const posts = getAllPosts();
  const entries: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  for (const post of posts) {
    entries.push({
      url: `${base}/posts/${post.slug}`,
      lastModified: parsePostDate(post.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return entries;
}
