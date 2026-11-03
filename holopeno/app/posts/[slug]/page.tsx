import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ButtonLink } from '../../components/ButtonLink';
import { HeatMeter } from '../../components/HeatMeter';
import { MdxContent } from '../../components/MdxContent';
import { Tag } from '../../components/Tag';
import { formatPostDate } from '../../../lib/dates';
import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import { site } from '../../../lib/site';

type PostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPosts({ includeDrafts: true }).map(post => ({ slug: post.slug }));
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
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      authors: [site.author],
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  return (
    <article className='mx-auto max-w-content px-5 py-14'>
      <ButtonLink href='/' variant='bare'>
        ← posts
      </ButtonLink>
      <header className='mt-8 max-w-prose'>
        <h1 className='font-mono text-[2rem] font-extrabold leading-[2.5rem] tracking-tight sm:text-h1'>
          {post.title}
        </h1>
        <div className='mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-micro text-ash'>
          {post.draft ? <span className='text-ripe'>draft</span> : null}
          <time dateTime={post.date}>{formatPostDate(post.date).toLowerCase()}</time>
          <span>{post.readingTime} min read</span>
          {post.heat ? <HeatMeter level={post.heat} showLabel /> : null}
          {post.tags.map(tag => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </header>
      <div className='prose-holo mt-12 max-w-prose'>
        <MdxContent source={post.content} />
      </div>
      <footer className='mt-16 max-w-prose border-t border-line pt-8'>
        <ButtonLink href='/'>← more posts</ButtonLink>
      </footer>
    </article>
  );
}
