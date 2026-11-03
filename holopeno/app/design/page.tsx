import type { Metadata } from 'next';
import { ComponentGallery } from './ComponentGallery';
import { Kicker } from '../components/Kicker';
import { Tilde } from '../components/Tilde';
import { Wordmark } from '../components/Wordmark';
import { color, fontSize, type ColorToken } from '../../design/tokens';
import { getAllPosts } from '../../lib/posts';

export const metadata: Metadata = {
  title: 'design system',
  description: 'tokens, wordmark, and components for holopeño.',
  robots: { index: false, follow: false },
};

type Swatch = {
  token: ColorToken;
  role: string;
};

const swatches: Swatch[] = [
  { token: 'char', role: 'page background' },
  { token: 'soot', role: 'raised surface, inputs, code' },
  { token: 'line', role: 'hairlines and borders' },
  { token: 'smoke', role: 'placeholders, counts. never body text' },
  { token: 'ash', role: 'secondary text, meta' },
  { token: 'bone', role: 'primary text' },
  { token: 'pepper', role: 'jalapeño skin: rules, markers, display only' },
  { token: 'seed', role: 'the heat: links, focus, selection, hover' },
  { token: 'heat', role: 'capsaicin: drafts and errors only' },
];

type TypeSample = {
  token: keyof typeof fontSize;
  className: string;
  sample: string;
};

const typeSamples: TypeSample[] = [
  { token: 'hero', className: 'font-mono text-hero font-extrabold', sample: 'scoville' },
  {
    token: 'display',
    className: 'font-mono text-display font-extrabold',
    sample: 'hot, not hallucinated.',
  },
  {
    token: 'title',
    className: 'font-mono text-title font-extrabold',
    sample: 'attention doesn’t parallelize',
  },
  {
    token: 'body',
    className: 'font-sans text-body',
    sample: 'body copy is inter tight at 17/30. it does the reading; mono does the talking.',
  },
  {
    token: 'meta',
    className: 'font-mono text-meta text-ash',
    sample: '2026.11.02 · 4 min · #llms',
  },
  { token: 'micro', className: 'font-mono text-micro text-ash', sample: '// section label' },
];

export default function DesignPage() {
  const samplePost = getAllPosts()[0];

  return (
    <div className='mx-auto max-w-page px-5 py-14'>
      <Kicker>design system</Kicker>
      <h1 className='mt-4 font-mono text-display font-extrabold tracking-tight text-bone'>
        black, bone, and one hot green.
      </h1>
      <p className='mt-4 max-w-measure text-ash'>
        the full rules live in <code className='font-mono text-seed'>docs/design-system.md</code>.
        this page renders the real tokens and components, so it cannot drift.
      </p>

      <section className='mt-16'>
        <Kicker as='h2'>wordmark</Kicker>
        <div className='mt-6 grid gap-px border border-line bg-line sm:grid-cols-[2fr_1fr]'>
          <div className='flex items-center bg-char p-10'>
            <Wordmark className='text-hero' />
          </div>
          <div className='grid gap-px bg-line'>
            <div className='flex items-center justify-center bg-bone p-8 text-char'>
              <Wordmark className='text-[2.5rem]' animated={false} scanlines={false} />
            </div>
            <div className='flex items-center justify-center gap-6 bg-soot p-8 text-bone'>
              <Tilde className='h-10 w-20' />
              <Tilde className='h-5 w-10' />
              <Tilde className='h-2.5 w-5' />
            </div>
          </div>
        </div>
      </section>

      <section className='mt-16'>
        <Kicker as='h2'>color</Kicker>
        <ul className='mt-6 grid gap-px border border-line bg-line sm:grid-cols-3'>
          {swatches.map(function renderSwatch(swatch) {
            return (
              <li key={swatch.token} className='bg-char p-4'>
                <div
                  className='h-16 border border-line'
                  style={{ background: color[swatch.token] }}
                />
                <p className='mt-3 font-mono text-meta font-bold text-bone'>{swatch.token}</p>
                <p className='font-mono text-micro text-ash'>{color[swatch.token].toLowerCase()}</p>
                <p className='mt-1 text-meta text-ash'>{swatch.role}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className='mt-16'>
        <Kicker as='h2'>type</Kicker>
        <ul className='mt-6 divide-y divide-line border-y border-line'>
          {typeSamples.map(function renderType(item) {
            return (
              <li key={item.token} className='grid gap-2 py-5 sm:grid-cols-[8rem_minmax(0,1fr)]'>
                <p className='font-mono text-meta text-ash'>{item.token}</p>
                <p className={`${item.className} overflow-hidden text-ellipsis`}>{item.sample}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className='mt-16'>
        <Kicker as='h2'>surface</Kicker>
        <div className='mt-6 flex flex-wrap gap-6'>
          <div className='border border-line bg-soot p-6 font-mono text-meta text-ash'>
            radius: none
          </div>
          <div className='rounded-hair bg-soot px-2 py-1 font-mono text-meta text-seed'>
            rounded-hair (inline code only)
          </div>
          <div className='border border-bone bg-bone p-6 font-mono text-meta text-char shadow-slab'>
            shadow-slab (hover lift)
          </div>
        </div>
      </section>

      <section className='mt-16'>
        <Kicker as='h2'>components</Kicker>
        <div className='mt-6'>
          <ComponentGallery samplePost={samplePost} />
        </div>
      </section>
    </div>
  );
}
