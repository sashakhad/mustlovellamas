import { ImageResponse } from 'next/og';
import { formatPostDate } from '../../../lib/dates';
import { loadOgFonts } from '../../../lib/og';
import { OgFrame, OgHeat, OgSignature, ogSize } from '../../../lib/ogCard';
import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import { site } from '../../../lib/site';
import { palette } from '../../../lib/tokens';

export const alt = `a post on ${site.name}`;
export const size = ogSize;
export const contentType = 'image/png';

type ImageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPosts({ includeDrafts: true }).map(post => ({ slug: post.slug }));
}

function titleSize(title: string): number {
  if (title.length > 60) {
    return 56;
  }
  if (title.length > 32) {
    return 72;
  }
  return 92;
}

export default async function PostOpengraphImage({ params }: ImageProps): Promise<ImageResponse> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? site.name;
  const meta = post
    ? `${formatPostDate(post.date).toLowerCase()} · ${post.readingTime} min read`
    : site.tagline;

  return new ImageResponse(
    (
      <OgFrame
        eyebrow={post?.tags[0] ?? 'posts'}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  fontSize: 26,
                  color: palette.ash,
                  fontWeight: 400,
                }}
              >
                <div style={{ display: 'flex' }}>{meta}</div>
                {post?.heat ? <OgHeat level={post.heat} /> : null}
              </div>
            </div>
            <OgSignature fontSize={56} />
          </div>
        }
      >
        <div
          style={{
            display: 'flex',
            fontSize: titleSize(title),
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -0.03 * titleSize(title),
            color: palette.bone,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </OgFrame>
    ),
    { ...size, fonts: loadOgFonts() }
  );
}
