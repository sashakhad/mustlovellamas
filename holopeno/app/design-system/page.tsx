import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { Callout } from '../components/Callout';
import { HeatMeter } from '../components/HeatMeter';
import { Mark } from '../components/Mark';
import { PostList } from '../components/PostList';
import { RuleList } from '../components/RuleList';
import { SectionLabel } from '../components/SectionLabel';
import { Tag } from '../components/Tag';
import { Wordmark } from '../components/Wordmark';
import { colorRules, layoutRules, voiceRules, wordmarkDonts, wordmarkRules } from '../../lib/brand';
import { heatLabels, type HeatLevel } from '../../lib/heat';
import { getAllPosts } from '../../lib/posts';
import { site } from '../../lib/site';
import {
  colors,
  fonts,
  fontSizes,
  motion,
  radii,
  spacing,
  type ColorName,
  type FontSizeName,
} from '../../lib/tokens';

export const metadata: Metadata = {
  title: 'design system',
  description: `the ${site.name} design system: tokens, wordmark, components and rules.`,
  alternates: { canonical: '/design-system' },
};

const typeClasses: Record<FontSizeName, string> = {
  micro: 'text-micro',
  small: 'text-small',
  body: 'text-body',
  lead: 'text-lead',
  h3: 'text-h3',
  h2: 'text-h2',
  h1: 'text-h1',
  display: 'text-display',
};

const heatLevels: HeatLevel[] = [1, 2, 3, 4, 5];

type SectionProps = { id: string; label: string; title: string; children: ReactNode };

function Section({ id, label, title, children }: SectionProps) {
  return (
    <section id={id} className='scroll-mt-8 border-t border-line pt-10'>
      <SectionLabel as='p'>{label}</SectionLabel>
      <h2 className='mt-3 font-mono text-h2 font-extrabold tracking-tight'>{title}</h2>
      <div className='mt-8 flex flex-col gap-8'>{children}</div>
    </section>
  );
}

type SpecProps = { name: string; children: ReactNode };

function Spec({ name, children }: SpecProps) {
  return (
    <div className='grid gap-3 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-8'>
      <span className='font-mono text-micro text-ash'>{name}</span>
      <div className='flex flex-wrap items-center gap-3'>{children}</div>
    </div>
  );
}

function Swatch({ name }: { name: ColorName }) {
  const token = colors[name];
  return (
    <div className='flex flex-col border border-line'>
      <div className='h-20' style={{ background: token.value }} />
      <div className='flex flex-col gap-1 border-t border-line p-3 font-mono text-micro'>
        <span className='font-bold text-bone'>{name}</span>
        <span className='text-ash'>{token.value.toLowerCase()}</span>
        <span className='text-ash'>
          {name === 'char'
            ? 'the canvas'
            : `${token.contrastOnChar.toFixed(2)}:1 · ${token.textSafe ? 'text-safe' : 'decor only'}`}
        </span>
        <span className='mt-1 font-sans text-ash'>{token.role}</span>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const samplePosts = getAllPosts().slice(0, 1);
  const colorNames = Object.keys(colors).filter((name): name is ColorName => name in colors);
  const typeNames = Object.keys(fontSizes).filter(
    (name): name is FontSizeName => name in fontSizes
  );

  return (
    <div className='mx-auto flex max-w-content flex-col gap-16 px-5 py-14'>
      <header className='flex flex-col gap-4'>
        <SectionLabel as='p'>design system</SectionLabel>
        <h1 className='font-mono text-h1 font-extrabold tracking-tight'>scoville terminal</h1>
        <p className='max-w-prose text-ash'>
          black, bone, and one hologram green. heavy mono, square corners, no friendliness.
          everything on this page is rendered from{' '}
          <code className='font-mono text-holo'>lib/tokens.ts</code>, so it cannot drift from the
          site.
        </p>
      </header>

      <Section id='wordmark' label='01' title='wordmark'>
        <div className='flex min-h-56 items-center justify-center border border-line bg-char px-6 py-16'>
          <Wordmark className='text-[3.5rem] sm:text-[7rem]' />
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='flex items-center justify-center border border-line bg-char p-8'>
            <Wordmark className='text-[2.5rem]' animated={false} />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- the raw svg is the point here */}
          <img
            src='/brand/wordmark-light.svg'
            alt='holopeño wordmark, char on bone'
            className='w-full border border-line'
          />
        </div>
        <Spec name='mark'>
          <Mark className='w-16 text-[3.5rem]' />
          <Mark className='w-8 text-[1.75rem]' />
          <Mark className='w-5 text-[1.125rem]' />
          {/* eslint-disable-next-line @next/next/no-img-element -- generated favicon preview */}
          <img src='/icon' alt='favicon' width={32} height={32} className='border border-line' />
        </Spec>
        <Spec name='downloads'>
          <ButtonLink href='/brand/wordmark.svg'>wordmark.svg</ButtonLink>
          <ButtonLink href='/brand/wordmark-light.svg'>wordmark-light.svg</ButtonLink>
          <ButtonLink href='/brand/mark.svg'>mark.svg</ButtonLink>
          <ButtonLink href='/brand/mark-light.svg'>mark-light.svg</ButtonLink>
        </Spec>
        <RuleList rules={wordmarkRules} />
        <div>
          <p className='font-mono text-micro text-ripe'>never</p>
          <ul className='mt-3 grid gap-1 font-mono text-small text-ash sm:grid-cols-2'>
            {wordmarkDonts.map(item => (
              <li key={item}>× {item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id='color' label='02' title='color'>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
          {colorNames.map(name => (
            <Swatch key={name} name={name} />
          ))}
        </div>
        <RuleList rules={colorRules} />
      </Section>

      <Section id='type' label='03' title='type'>
        <Spec name='families'>
          <span className='font-mono text-small text-bone'>
            {fonts.mono.family} {fonts.mono.weights.join('/')} · {fonts.mono.use}
          </span>
          <span className='font-sans text-small text-bone'>
            {fonts.sans.family} {fonts.sans.weights.join('/')} · {fonts.sans.use}
          </span>
        </Spec>
        <div className='flex flex-col divide-y divide-line border-y border-line'>
          {typeNames.map(name => (
            <div
              key={name}
              className='grid gap-2 py-4 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-8'
            >
              <span className='font-mono text-micro text-ash'>
                {name} · {fontSizes[name].size}
              </span>
              <span
                className={`${typeClasses[name]} ${name === 'body' ? 'font-sans' : 'font-mono font-extrabold tracking-tight'} truncate text-bone`}
              >
                {name === 'body'
                  ? 'body copy is the only thing set in sans.'
                  : 'hot, not hallucinated'}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section id='space' label='04' title='spacing, radius, motion'>
        <div className='flex flex-col gap-3'>
          {Object.entries(spacing).map(([name, step]) => (
            <Spec key={name} name={`${name} · ${step.px}px`}>
              <span className='h-3 bg-jalapeno' style={{ width: step.px * 3 }} />
              <span className='font-mono text-micro text-ash'>
                {`p-${step.tailwind}`} · {step.use}
              </span>
            </Spec>
          ))}
        </div>
        <div className='flex flex-col gap-3'>
          {Object.entries(radii).map(([name, radius]) => (
            <Spec key={name} name={`${name} · ${radius.value}`}>
              <span
                className='h-10 w-10 border-2 border-bone'
                style={{ borderRadius: radius.value }}
              />
              <span className='font-mono text-micro text-ash'>{radius.use}</span>
            </Spec>
          ))}
        </div>
        <div className='flex flex-col gap-3'>
          {Object.entries(motion.durations).map(([name, duration]) => (
            <Spec key={name} name={`${name} · ${duration.value}`}>
              <span className='font-mono text-micro text-ash'>{duration.use}</span>
            </Spec>
          ))}
          {Object.entries(motion.easings).map(([name, easing]) => (
            <Spec key={name} name={`ease-${name}`}>
              <span className='font-mono text-micro text-ash'>
                {easing.value} · {easing.use}
              </span>
            </Spec>
          ))}
        </div>
      </Section>

      <Section id='components' label='05' title='components'>
        <Spec name='ButtonLink'>
          <ButtonLink href='/design-system#components' variant='solid'>
            read the post
          </ButtonLink>
          <ButtonLink href='/design-system#components'>outline</ButtonLink>
          <ButtonLink href='/design-system#components' variant='bare'>
            ← bare
          </ButtonLink>
        </Spec>
        <Spec name='Tag'>
          <Tag label='llms' />
          <Tag label='agents' />
          <Tag label='meta' />
        </Spec>
        <Spec name='HeatMeter'>
          <div className='flex flex-col gap-2'>
            {heatLevels.map(level => (
              <span key={level} className='flex items-center gap-3'>
                <HeatMeter level={level} />
                <span className='font-mono text-micro text-ash'>
                  {level} · {heatLabels[level]}
                </span>
              </span>
            ))}
          </div>
        </Spec>
        <Spec name='SectionLabel'>
          <SectionLabel as='p'>posts</SectionLabel>
          <SectionLabel as='p' className='text-ripe'>
            error
          </SectionLabel>
        </Spec>
        <div className='grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-8'>
          <span className='font-mono text-micro text-ash'>Callout</span>
          <div>
            <Callout>a note. one per post, and only if it earns it.</Callout>
            <Callout tone='hot'>a hot take. ripe red, used even more rarely.</Callout>
          </div>
        </div>
        <div className='grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-8'>
          <span className='font-mono text-micro text-ash'>PostList</span>
          <PostList posts={samplePosts} />
        </div>
      </Section>

      <Section id='voice' label='06' title='voice and layout'>
        <div className='flex flex-col gap-3'>
          <p className='font-mono text-micro text-ash'>writing</p>
          <RuleList rules={voiceRules} />
        </div>
        <div className='flex flex-col gap-3'>
          <p className='font-mono text-micro text-ash'>layout</p>
          <RuleList rules={layoutRules} />
        </div>
      </Section>
    </div>
  );
}
