import { FilterProvider } from '@/app/context/FilterContext';
import { PostList } from '@/app/components/PostList';
import { getAllPosts, getAllTags, groupPostsByMonth } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();
  const groupedPosts = groupPostsByMonth(posts);
  const tags = getAllTags(posts);

  return (
    <FilterProvider>
      <PostList posts={posts} groupedPosts={groupedPosts} tags={tags} />
    </FilterProvider>
  );
}
