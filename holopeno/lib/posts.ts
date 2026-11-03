import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parsePostDate } from './dates';
import { parseHeat, type HeatLevel } from './heat';
import { calculateReadingTime, countWords } from './readingTime';
import { slugify } from './slug';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  readingTime: number;
  heat: HeatLevel | null;
  filePath: string;
  draft: boolean;
};

export type Post = PostMeta & { content: string };

const postsDirectory = path.join(process.cwd(), 'posts');

function collectMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const files: string[] = [];
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...collectMdxFiles(fullPath));
      continue;
    }
    if (item.endsWith('.mdx') || item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function readTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((tag): tag is string => typeof tag === 'string' && tag.length > 0);
}

function toPostMeta(filePath: string, data: Record<string, unknown>, content: string): PostMeta {
  const explicitSlug = typeof data.slug === 'string' ? data.slug : '';
  return {
    slug: slugify(
      explicitSlug.length > 0 ? explicitSlug : path.basename(filePath, path.extname(filePath))
    ),
    title: typeof data.title === 'string' ? data.title : 'untitled',
    date: typeof data.date === 'string' ? data.date : '1970-01-01',
    tags: readTags(data.tags),
    description: typeof data.description === 'string' ? data.description : '',
    readingTime: calculateReadingTime(countWords(content)),
    heat: parseHeat(data.heat),
    filePath,
    draft: data.draft === true,
  };
}

export function getAllPosts(options?: { includeDrafts?: boolean }): PostMeta[] {
  const posts: PostMeta[] = [];
  for (const filePath of collectMdxFiles(postsDirectory)) {
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    const meta = toPostMeta(filePath, data, content);
    if (meta.draft && options?.includeDrafts !== true) {
      continue;
    }
    posts.push(meta);
  }
  posts.sort((a, b) => parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const meta = getAllPosts({ includeDrafts: true }).find(post => post.slug === slug);
  if (!meta) {
    return null;
  }
  const { content } = matter(fs.readFileSync(meta.filePath, 'utf8'));
  return { ...meta, content };
}
