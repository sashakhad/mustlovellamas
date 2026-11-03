import Link from 'next/link';
import { Kicker } from './components/Kicker';

export default function NotFound() {
  return (
    <div className='mx-auto max-w-measure px-5 py-24'>
      <Kicker className='text-heat'>error</Kicker>
      <p className='mt-4 font-mono text-hero font-extrabold text-bone'>404</p>
      <p className='mt-6 text-ash'>this page was hallucinated. confidently, but still.</p>
      <Link
        href='/'
        className='mt-10 inline-block font-mono text-meta text-seed underline-offset-[0.2em] hover:underline'
      >
        ← back to real posts
      </Link>
    </div>
  );
}
