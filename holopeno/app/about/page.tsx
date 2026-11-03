import type { Metadata } from 'next';
import { SectionLabel } from '../components/SectionLabel';
import { site, xProfileUrl } from '../../lib/site';

export const metadata: Metadata = {
  title: 'about',
  description: `what ${site.name} is, and who is responsible.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className='mx-auto max-w-content px-5 py-14'>
      <SectionLabel as='p'>whois</SectionLabel>
      <h1 className='mt-6 font-mono text-h1 font-extrabold tracking-tight'>about</h1>
      <div className='prose-holo mt-10 max-w-prose'>
        <p>
          {site.name} is a tech blog by {site.author}. notes on llms, agents, and shipping software
          with models in the loop.
        </p>
        <p>
          the name is a jalapeño rendered in light. it looks like a pepper and is mostly made of
          tokens. that is the whole joke.
        </p>
        <p>
          posts get a heat rating from mild to <em>do not touch your eyes</em>. it measures the
          take, not the quality.
        </p>
        <p>
          the older, politer writing lives at{' '}
          <a href='https://mustlovellamas.com'>must love llamas</a>. elsewhere:{' '}
          <a href={xProfileUrl()}>{site.xHandle}</a> on x, and <a href='/rss.xml'>rss</a> if you
          still have a reader. good for you.
        </p>
      </div>
    </div>
  );
}
