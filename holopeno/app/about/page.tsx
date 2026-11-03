import type { Metadata } from 'next';
import Link from 'next/link';
import { Kicker } from '../components/Kicker';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'about',
  description: `what ${site.name} is, and why it is named like that.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <article className='mx-auto max-w-measure px-5 py-14'>
      <Kicker>about</Kicker>
      <h1 className='mt-4 font-mono text-[2rem] font-extrabold leading-tight tracking-tight text-bone sm:text-display'>
        a jalapeño, rendered in light.
      </h1>
      <div className='prose-holo mt-10'>
        <p>
          {site.name} is {site.author}&apos;s tech blog. notes on llms, agents, and shipping
          software with models in the loop. it looks like a pepper and is mostly made of tokens.
          that&apos;s the whole joke. it will not be explained again.
        </p>
        <p>
          expect field notes, things that broke and why, and the occasional take that runs hotter
          than strictly necessary. mostly medium. occasionally scoville-rated.
        </p>
        <p>
          posts are mdx, so most of the time that means markdown. when a screenshot or a small react
          embed earns its place, it goes in the same file.
        </p>
        <p>
          the older engineering writing lives at{' '}
          <a href={site.olderBlog}>{site.olderBlog.replace('https://', '')}</a>. new stuff lands
          here. there is an <a href='/rss.xml'>rss feed</a>, if you still have a reader. respect.
        </p>
        <p>
          <Link href='/'>← back to posts</Link>
        </p>
      </div>
    </article>
  );
}
