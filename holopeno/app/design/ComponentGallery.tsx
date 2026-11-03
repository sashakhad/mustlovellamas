'use client';

import { useState } from 'react';
import { Button } from '../components/Button';
import { FilterProvider } from '../context/FilterContext';
import { Heat } from '../components/Heat';
import { Kicker } from '../components/Kicker';
import { PostRow } from '../components/PostRow';
import { SearchForm } from '../components/SearchForm';
import { Tag } from '../components/Tag';
import type { PostMeta } from '../../lib/posts';

type ComponentGalleryProps = {
  samplePost: PostMeta | undefined;
};

const sampleTags: string[] = ['llms', 'agents', 'shipping'];

export function ComponentGallery({ samplePost }: ComponentGalleryProps) {
  const [activeTag, setActiveTag] = useState('agents');
  const [query, setQuery] = useState('');

  return (
    <div className='grid gap-10'>
      <div>
        <Kicker>button</Kicker>
        <div className='mt-4 flex flex-wrap items-center gap-3'>
          <Button variant='solid'>solid</Button>
          <Button>outline</Button>
          <Button active>active</Button>
          <Button disabled>disabled</Button>
          <Button variant='text'>text</Button>
        </div>
      </div>

      <div>
        <Kicker>tag</Kicker>
        <div className='mt-4 flex flex-wrap items-center gap-2'>
          {sampleTags.map(function renderTag(tag) {
            return (
              <Tag
                key={tag}
                label={tag}
                active={activeTag === tag}
                onSelect={function selectTag(label) {
                  setActiveTag(activeTag === label ? '' : label);
                }}
              />
            );
          })}
          <Tag label='static' className='ml-3' />
        </div>
      </div>

      <div>
        <Kicker>heat (reading time)</Kicker>
        <div className='mt-4 flex flex-wrap gap-6'>
          <Heat minutes={2} />
          <Heat minutes={7} />
          <Heat minutes={16} />
        </div>
      </div>

      <div>
        <Kicker>search</Kicker>
        <div className='mt-4 max-w-measure'>
          <SearchForm defaultQuery='' onSearch={setQuery} />
          <p className='mt-2 font-mono text-micro text-ash'>
            last query: <span className='text-bone'>{query.length > 0 ? query : '∅'}</span>
          </p>
        </div>
      </div>

      {samplePost ? (
        <div>
          <Kicker>post row</Kicker>
          <div className='mt-2 border-t border-line'>
            <FilterProvider>
              <PostRow post={samplePost} />
            </FilterProvider>
          </div>
        </div>
      ) : null}
    </div>
  );
}
