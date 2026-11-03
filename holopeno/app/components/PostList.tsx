import Link from 'next/link';
import { formatPostDate } from '../../lib/dates';
import type { PostMeta } from '../../lib/posts';
import { HeatMeter } from './HeatMeter';

type PostListProps = {
  posts: PostMeta[];
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className='py-24 font-mono text-small text-ash'>nothing here yet. the pan is heating.</p>
    );
  }
  return (
    <ul className='divide-y divide-line border-y border-line'>
      {posts.map(post => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className='group grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[8rem_1fr]'
          >
            <span className='font-mono text-micro leading-7 text-ash'>
              <time dateTime={post.date}>{formatPostDate(post.date).toLowerCase()}</time>
            </span>
            <span className='flex flex-col gap-2'>
              <span className='font-mono text-lead font-bold tracking-tight text-bone transition-colors duration-snap ease-snap group-hover:text-holo'>
                {post.title}
              </span>
              {post.description ? (
                <span className='text-small text-ash'>{post.description}</span>
              ) : null}
              <span className='flex items-center gap-4 font-mono text-micro text-ash'>
                <span>{post.readingTime} min</span>
                {post.heat ? <HeatMeter level={post.heat} /> : null}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
