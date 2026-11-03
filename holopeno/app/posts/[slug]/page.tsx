import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Heat } from '../../components/Heat';
import { Kicker } from '../../components/Kicker';
import { MdxContent } from '../../components/MdxContent';
import { Tag } from '../../components/Tag';
import { formatPostStamp } from '../../../lib/dates';
import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import { site } from '../../../lib/site';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  const params: { slug: string }[] = [];
  for (const post of getAllPosts({ includeDrafts: true })) {
    params.push({ slug: post.slug });
  }
  return params;
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
    alternates: { canonical: post.canonical || `/posts/${post.slug}` },
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      authors: [site.author],
      publishedTime: post.date,
      tags: post.tags,
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
  const older =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : undefined;

  return (
    <article className='mx-auto max-w-measure px-5 py-14'>
      <Link
        href='/'
        className='font-mono text-meta text-ash transition-colors duration-quick hover:text-seed'
      >
        ← posts
      </Link>
      <header className='mt-10 border-b border-line pb-8'>
        {post.draft ? <Kicker className='mb-3 text-heat'>draft · not in the feed</Kicker> : null}
        <h1 className='font-mono text-[2rem] font-extrabold leading-tight tracking-tight text-bone sm:text-display'>
          {post.title}
        </h1>
        {post.description.length > 0 ? <p className='mt-4 text-ash'>{post.description}</p> : null}
        <div className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-meta text-ash'>
          <time dateTime={post.date}>{formatPostStamp(post.date)}</time>
          <Heat minutes={post.readingTime} />
          {post.tags.map(function renderTag(tag) {
            return <Tag key={tag} label={tag} />;
          })}
        </div>
      </header>
      <div className='prose-holo mt-10'>
        <MdxContent source={post.content} />
      </div>
      <nav
        aria-label='more posts'
        className='mt-20 grid gap-6 border-t border-line pt-8 sm:grid-cols-2'
      >
        {newer ? (
          <Link href={`/posts/${newer.slug}`} className='group block'>
            <Kicker>newer</Kicker>
            <span className='mt-2 block font-mono font-bold text-bone transition-colors duration-quick group-hover:text-seed'>
              ← {newer.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {older ? (
          <Link href={`/posts/${older.slug}`} className='group block sm:text-right'>
            <Kicker>older</Kicker>
            <span className='mt-2 block font-mono font-bold text-bone transition-colors duration-quick group-hover:text-seed'>
              {older.title} →
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
