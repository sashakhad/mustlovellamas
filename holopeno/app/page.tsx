import Link from 'next/link';
import { formatPostDate } from '@/lib/dates';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <div className='mx-auto max-w-3xl px-5 py-14'>
      <h2 className='font-mono text-xs uppercase tracking-[0.2em] text-pepper'>posts</h2>
      <ul className='mt-6 divide-y divide-line border-y border-line'>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className='group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5'>
              <span className='font-mono text-lg font-bold text-bone group-hover:text-seed'>{post.title}</span>
              <span className='font-mono text-xs text-ash'>
                {formatPostDate(post.date).toLowerCase()} · {post.readingTime} min
              </span>
              {post.description ? <span className='w-full text-sm text-ash'>{post.description}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
