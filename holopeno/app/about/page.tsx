import type { Metadata } from 'next';
import { site, xProfileUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'about',
  description: `what ${site.name} is.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <article className='prose-holo mx-auto max-w-3xl px-5 py-14'>
      <h1 className='font-mono text-3xl font-extrabold tracking-tight'>about</h1>
      <p>
        {site.name} is a tech blog by {site.author}. notes on llms, agents, and shipping software. a jalapeño rendered in
        light: looks like a pepper, mostly made of tokens.
      </p>
      <p>mostly mild. occasionally scoville-rated. no hallucinations on purpose.</p>
      <p>
        elsewhere: <a href={xProfileUrl()}>{site.xHandle}</a> on x, and <a href='/rss.xml'>rss</a> if you still have a
        reader. good for you.
      </p>
    </article>
  );
}
