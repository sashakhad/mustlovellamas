import { ImageResponse } from 'next/og';
import { OgCard } from '../../components/OgCard';
import { formatPostDate } from '../../../lib/dates';
import { loadOgFonts } from '../../../lib/og';
import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import { site } from '../../../lib/site';

type OgImageProps = {
  params: Promise<{ slug: string }>;
};

export const alt = `a post on ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams(): { slug: string }[] {
  const params: { slug: string }[] = [];
  for (const post of getAllPosts({ includeDrafts: true })) {
    params.push({ slug: post.slug });
  }
  return params;
}

export default async function PostOpengraphImage({ params }: OgImageProps): Promise<ImageResponse> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post ? post.title : 'not found';
  const footer = post
    ? `${formatPostDate(post.date).toLowerCase()} · ${post.readingTime} min · ${site.author}`
    : site.tagline;

  return new ImageResponse(<OgCard kicker='// post' title={title} footer={footer} />, {
    ...size,
    fonts: loadOgFonts(),
  });
}
