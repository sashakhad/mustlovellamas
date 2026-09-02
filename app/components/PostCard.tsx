'use client';

import Link from 'next/link';
import { formatPostDate } from '@/lib/dates';
import type { PostMeta } from '@/lib/posts';
import { useFilter } from '@/app/context/FilterContext';

type PostCardProps = {
  post: PostMeta;
};

export function PostCard({ post }: PostCardProps) {
  const { setFilter } = useFilter();

  return (
    <article className='border-b border-wool py-6'>
      <Link href={`/posts/${post.slug}`} className='group block'>
        <h2 className='font-display text-2xl text-ink group-hover:text-accent'>{post.title}</h2>
      </Link>
      <p className='mt-2 text-sm text-muted'>
        {formatPostDate(post.date)} · {post.readingTime} min read
      </p>
      {post.description.length > 0 ? <p className='mt-3 text-ink/90'>{post.description}</p> : null}
      {post.tags.length > 0 ? (
        <ul className='mt-3 flex flex-wrap gap-2'>
          {post.tags.map(function renderTag(tag) {
            const normalized = tag.toLowerCase();
            return (
              <li key={normalized}>
                <button
                  type='button'
                  onClick={function selectTag() {
                    setFilter(normalized);
                  }}
                  className='text-sm text-accent underline-offset-2 hover:underline'
                >
                  #{normalized}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </article>
  );
}
