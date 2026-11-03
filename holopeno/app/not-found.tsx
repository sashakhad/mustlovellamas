import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='mx-auto max-w-3xl px-5 py-24 font-mono'>
      <p className='text-5xl font-extrabold'>404</p>
      <p className='mt-4 text-ash'>this page was hallucinated.</p>
      <Link href='/' className='mt-8 inline-block text-seed hover:underline'>
        ← back to real posts
      </Link>
    </div>
  );
}
