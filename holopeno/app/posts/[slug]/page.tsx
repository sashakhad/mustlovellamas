import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdxContent } from '@/app/components/MdxContent';
import { formatPostDate } from '@/lib/dates';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { site } from '@/lib/site';

type PostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts({ includeDrafts: true }).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: 'not found' };
  }
  const description = post.description || post.title;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/posts/${post.slug}` },
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
    openGraph: { title: post.title, description, type: 'article', authors: [site.author], publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  return (
    <article className='mx-auto max-w-3xl px-5 py-14'>
      <Link href='/' className='font-mono text-xs text-ash hover:text-seed'>
        ← posts
      </Link>
      <h1 className='mt-6 font-mono text-3xl font-extrabold tracking-tight sm:text-4xl'>{post.title}</h1>
      <p className='mt-3 font-mono text-xs text-ash'>
        {post.draft ? 'draft · ' : ''}
        {formatPostDate(post.date).toLowerCase()} · {post.readingTime} min read
        {post.tags.length > 0 ? ` · ${post.tags.map((tag) => `#${tag.toLowerCase()}`).join(' ')}` : ''}
      </p>
      <div className='prose-holo mt-10'>
        <MdxContent source={post.content} />
      </div>
    </article>
  );
}
