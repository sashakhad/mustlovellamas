'use client';

import Link from 'next/link';
import { useFilter } from '../context/FilterContext';
import { Heat } from './Heat';
import { Tag } from './Tag';
import { formatPostStamp } from '../../lib/dates';
import type { PostMeta } from '../../lib/posts';

type PostRowProps = {
  post: PostMeta;
};

export function PostRow({ post }: PostRowProps) {
  const { filter, setFilter } = useFilter();

  return (
    <article className='grid gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-[7rem_minmax(0,1fr)]'>
      <p className='pt-1 font-mono text-meta text-ash'>
        <time dateTime={post.date}>{formatPostStamp(post.date)}</time>
      </p>
      <div>
        <h2>
          <Link
            href={`/posts/${post.slug}`}
            className='font-mono text-title font-extrabold text-bone transition-colors duration-quick hover:text-seed'
          >
            {post.title}
          </Link>
        </h2>
        {post.description.length > 0 ? (
          <p className='mt-2 max-w-measure text-ash'>{post.description}</p>
        ) : null}
        <div className='mt-4 flex flex-wrap items-center gap-x-4 gap-y-2'>
          <Heat minutes={post.readingTime} />
          {post.tags.length > 0 ? (
            <ul className='flex flex-wrap gap-2'>
              {post.tags.map(function renderTag(tag) {
                const normalized = tag.toLowerCase();
                return (
                  <li key={normalized}>
                    <Tag
                      label={normalized}
                      active={filter === normalized}
                      onSelect={function toggleTag(label) {
                        setFilter(filter === label ? '' : label);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}
