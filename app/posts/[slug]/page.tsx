import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdxContent } from '@/app/components/MdxContent';
import { formatPostDate } from '@/lib/dates';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { site } from '@/lib/site';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(function toParams(post) {
    return { slug: post.slug };
  });
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  return {
    title: post.title,
    description: post.description || post.title,
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      type: 'article',
      authors: [site.author],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(function matchSlug(item) {
    return item.slug === slug;
  });
  const newer = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;
  const older = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : undefined;

  return (
    <article className='mx-auto max-w-2xl px-4 py-16'>
      <p className='text-sm text-muted'>
        <Link href='/' className='hover:text-ink'>
          Posts
        </Link>
      </p>
      <h1 className='mt-4 font-display text-4xl tracking-tight text-ink'>{post.title}</h1>
      <p className='mt-3 text-sm text-muted'>
        {formatPostDate(post.date)} · {post.readingTime} min read
      </p>
      {post.tags.length > 0 ? (
        <p className='mt-2 text-sm text-accent'>
          {post.tags.map(function renderTag(tag) {
            return `#${tag.toLowerCase()}`;
          }).join(' ')}
        </p>
      ) : null}
      <div className='prose-llama mt-10'>
        <MdxContent source={post.content} />
      </div>
      <nav className='mt-16 flex justify-between gap-8 border-t border-wool pt-8 text-sm'>
        {newer ? (
          <Link href={`/posts/${newer.slug}`} className='text-ink hover:text-accent'>
            ← {newer.title}
          </Link>
        ) : (
          <span />
        )}
        {older ? (
          <Link href={`/posts/${older.slug}`} className='text-right text-ink hover:text-accent'>
            {older.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
