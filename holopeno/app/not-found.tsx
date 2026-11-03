import type { Metadata } from 'next';
import { ButtonLink } from './components/ButtonLink';
import { SectionLabel } from './components/SectionLabel';

export const metadata: Metadata = {
  title: 'not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className='mx-auto max-w-content px-5 py-24'>
      <SectionLabel as='p' className='text-ripe'>
        error
      </SectionLabel>
      <p className='mt-6 font-mono text-display font-extrabold tracking-tighter text-ripe'>404</p>
      <h1 className='mt-6 font-mono text-h2 font-extrabold tracking-tight'>
        this page was hallucinated.
      </h1>
      <p className='mt-4 max-w-prose text-ash'>
        confident, well formatted, and not real. it happens to the best of us, and to most models.
      </p>
      <div className='mt-10 flex flex-wrap gap-3'>
        <ButtonLink href='/' variant='solid'>
          ← back to real posts
        </ButtonLink>
        <ButtonLink href='/about'>what is this</ButtonLink>
      </div>
    </div>
  );
}
