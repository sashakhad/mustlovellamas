import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { holopenoCodeTheme } from '../../lib/codeTheme';
import { Callout } from './Callout';
import { HeatMeter } from './HeatMeter';

type MdxContentProps = { source: string };

const components = { Callout, HeatMeter };

export function MdxContent({ source }: MdxContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, { theme: holopenoCodeTheme, keepBackground: false }]],
        },
      }}
    />
  );
}
