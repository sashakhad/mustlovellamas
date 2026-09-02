import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { MdxImage } from '@/app/components/MdxImage';

function MarkdownImage({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  if (!src) {
    return null;
  }

  return <MdxImage src={src} alt={alt ?? ''} />;
}

const mdxComponents = {
  img: MarkdownImage,
  MdxImage,
};

type MdxContentProps = {
  source: string;
};

export async function MdxContent({ source }: MdxContentProps) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: 'everforest-dark',
                keepBackground: true,
              },
            ],
          ],
        },
      }}
    />
  );
}
