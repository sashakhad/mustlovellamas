import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadingTime, countWords } from '@/lib/readingTime';
import { formatPostMonth, formatPostYear, parsePostDate } from '@/lib/dates';
import { slugify } from '@/lib/slug';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  readingTime: number;
  filePath: string;
  draft: boolean;
};

export type Post = PostMeta & {
  content: string;
};

export type GroupedPosts = {
  [year: string]: {
    [month: string]: PostMeta[];
  };
};

const postsDirectory = path.join(process.cwd(), 'posts');

export function collectMdxFiles(dir: string): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const nested = collectMdxFiles(fullPath);
      for (const nestedFile of nested) {
        files.push(nestedFile);
      }
      continue;
    }

    const isMdx = item.endsWith('.mdx') || item.endsWith('.md');
    if (isMdx && !item.includes('.backup.')) {
      files.push(fullPath);
    }
  }

  return files;
}

function readFrontmatterTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const tags: string[] = [];
  for (const tag of value) {
    if (typeof tag === 'string' && tag.length > 0) {
      tags.push(tag);
    }
  }
  return tags;
}

function toPostMeta(filePath: string, data: Record<string, unknown>, content: string): PostMeta {
  const title = typeof data.title === 'string' ? data.title : 'Untitled';
  const date = typeof data.date === 'string' ? data.date : '1970-01-01';
  const description = typeof data.description === 'string' ? data.description : '';
  const explicitSlug = typeof data.slug === 'string' ? data.slug : '';
  const slug = explicitSlug.length > 0 ? slugify(explicitSlug) : slugify(path.basename(filePath, path.extname(filePath)));

  return {
    slug,
    title,
    date,
    tags: readFrontmatterTags(data.tags),
    description,
    readingTime: calculateReadingTime(countWords(content)),
    filePath,
    draft: data.draft === true,
  };
}

export function getAllPosts(options?: { includeDrafts?: boolean }): PostMeta[] {
  const allFiles = collectMdxFiles(postsDirectory);
  const posts: PostMeta[] = [];

  for (const filePath of allFiles) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);
    const meta = toPostMeta(filePath, matterResult.data, matterResult.content);
    if (meta.draft && options?.includeDrafts !== true) {
      continue;
    }
    posts.push(meta);
  }

  posts.sort(function compareByDate(a, b) {
    return parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime();
  });

  return posts;
}

export function groupPostsByMonth(posts: PostMeta[]): GroupedPosts {
  const grouped: GroupedPosts = {};

  for (const post of posts) {
    const year = formatPostYear(post.date);
    const month = formatPostMonth(post.date);
    const yearGroup = grouped[year];
    if (!yearGroup) {
      grouped[year] = { [month]: [post] };
      continue;
    }
    const monthGroup = yearGroup[month];
    if (!monthGroup) {
      yearGroup[month] = [post];
      continue;
    }
    monthGroup.push(post);
  }

  return grouped;
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts({ includeDrafts: true });
  const meta = posts.find(function matchSlug(post) {
    return post.slug === slug;
  });

  if (!meta) {
    return null;
  }

  const fileContents = fs.readFileSync(meta.filePath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    ...meta,
    content: matterResult.content,
  };
}

export function getAllTags(posts: PostMeta[]): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];

  for (const post of posts) {
    for (const tag of post.tags) {
      const normalized = tag.toLowerCase();
      if (seen.has(normalized)) {
        continue;
      }
      seen.add(normalized);
      tags.push(normalized);
    }
  }

  tags.sort();
  return tags;
}
