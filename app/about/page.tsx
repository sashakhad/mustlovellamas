import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: site.tagline,
};

export default function AboutPage() {
  return (
    <article className='prose-llama mx-auto max-w-2xl px-4 py-16'>
      <h1 className='mb-6 font-display text-4xl tracking-tight'>About</h1>
      <p>
        {site.name} is my tech blog. The name is a pun I did not want to overthink. Llamas, LLaMA,
        LLMs. I write here when I want a URL I can send to other engineers without walking them
        through a personal archive.
      </p>
      <p>
        Posts are MDX. Most of the time that just means Markdown. When a screenshot or a small
        React embed would help, I drop it in the same file.
      </p>
      <p>
        The source lives at{' '}
        <a href={site.github}>{site.github.replace('https://', '')}</a>. The older personal blog is
        still at <a href={site.personalBlog}>sashakhad/blog-public</a>.
      </p>
      <p>
        <Link href='/'>Back to posts</Link>
      </p>
    </article>
  );
}
