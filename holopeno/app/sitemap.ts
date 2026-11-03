import type { MetadataRoute } from 'next';
import { parsePostDate } from '@/lib/dates';
import { getAllPosts } from '@/lib/posts';
import { getSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.5 },
    ...getAllPosts().map((post) => ({
      url: `${base}/posts/${post.slug}`,
      lastModified: parsePostDate(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
