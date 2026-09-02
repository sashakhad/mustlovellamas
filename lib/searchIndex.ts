import type { PostMeta } from '@/lib/posts';

export type IndexedPost = PostMeta & {
  searchableContent: string;
};

export function buildPostSearchIndex(posts: PostMeta[]): IndexedPost[] {
  const indexed: IndexedPost[] = [];

  for (const post of posts) {
    indexed.push({
      ...post,
      searchableContent: [post.title, post.description, post.tags.join(' '), post.date]
        .join(' ')
        .toLowerCase(),
    });
  }

  return indexed;
}

export function searchPosts(indexedPosts: IndexedPost[], query: string): IndexedPost[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return indexedPosts;
  }

  const matches: IndexedPost[] = [];
  for (const post of indexedPosts) {
    if (post.searchableContent.includes(normalizedQuery)) {
      matches.push(post);
    }
  }
  return matches;
}
