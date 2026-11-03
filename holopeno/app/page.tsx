import { PostList } from './components/PostList';
import { SectionLabel } from './components/SectionLabel';
import { getAllPosts } from '../lib/posts';

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <div className='mx-auto max-w-content px-5 py-14'>
      <div className='flex items-baseline justify-between'>
        <SectionLabel>posts</SectionLabel>
        <p className='font-mono text-micro text-ash'>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} · newest first
        </p>
      </div>
      <div className='mt-6'>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
