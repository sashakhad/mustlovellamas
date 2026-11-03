'use client';

import { useMemo, useState } from 'react';
import { useFilter } from '../context/FilterContext';
import { ArchiveNav } from './ArchiveNav';
import { Button } from './Button';
import { Kicker } from './Kicker';
import { Pagination } from './Pagination';
import { PostRow } from './PostRow';
import { SearchForm } from './SearchForm';
import { Tag } from './Tag';
import { formatPostMonth, formatPostYear } from '../../lib/dates';
import type { GroupedPosts, PostMeta } from '../../lib/posts';
import { buildPostSearchIndex, searchPosts, type IndexedPost } from '../../lib/searchIndex';

const postsPerPage = 10;

type PostListProps = {
  posts: PostMeta[];
  groupedPosts: GroupedPosts;
  tags: string[];
};

export function PostList({ posts, groupedPosts, tags }: PostListProps) {
  const { filter, setFilter } = useFilter();
  const [currentPage, setCurrentPage] = useState(1);

  const indexedPosts = useMemo(
    function indexPosts() {
      return buildPostSearchIndex(posts);
    },
    [posts]
  );

  const isDateFilter = filter.startsWith('date:');
  const isTextFilter = filter.length > 0 && !isDateFilter;

  const filteredPosts = useMemo(
    function applyFilter() {
      if (!filter) {
        return indexedPosts;
      }

      if (isDateFilter) {
        const [year, month] = filter.replace('date:', '').split('-');
        const matches: IndexedPost[] = [];
        for (const post of indexedPosts) {
          if (formatPostYear(post.date) === year && formatPostMonth(post.date) === month) {
            matches.push(post);
          }
        }
        return matches;
      }

      return searchPosts(indexedPosts, filter);
    },
    [filter, indexedPosts, isDateFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const visiblePosts =
    isDateFilter || isTextFilter
      ? filteredPosts
      : filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  function applyFilter(value: string) {
    setCurrentPage(1);
    setFilter(value);
  }

  return (
    <div className='mx-auto grid max-w-page gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_13rem]'>
      <section aria-labelledby='posts-heading'>
        <div className='max-w-measure'>
          <p className='font-mono text-[1.75rem] font-extrabold leading-tight tracking-tight text-bone sm:text-display'>
            spicy notes on llms and shipping software.
          </p>
          <p className='mt-4 text-ash'>
            served hot. not hallucinated. written by someone who still reads the diff.
          </p>
        </div>

        <div className='mt-10'>
          <SearchForm defaultQuery={isDateFilter ? '' : filter} onSearch={applyFilter} />
        </div>
        {tags.length > 0 ? (
          <ul className='mt-4 flex flex-wrap gap-2'>
            {tags.map(function renderTag(tag) {
              const isActive = filter === tag;
              return (
                <li key={tag}>
                  <Tag
                    label={tag}
                    active={isActive}
                    onSelect={function toggleTag(label) {
                      applyFilter(isActive ? '' : label);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        ) : null}

        <div className='mt-12 flex items-center justify-between gap-4 border-b border-line pb-3'>
          <Kicker as='h2' className='text-ash'>
            <span id='posts-heading'>
              {filter.length > 0 ? (
                <>
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} for{' '}
                  <span className='text-bone'>{filter.replace('date:', '')}</span>
                </>
              ) : (
                'posts'
              )}
            </span>
          </Kicker>
          {filter.length > 0 ? (
            <Button
              variant='text'
              onClick={function clearFilter() {
                applyFilter('');
              }}
            >
              clear
            </Button>
          ) : null}
        </div>

        <div>
          {visiblePosts.map(function renderPost(post) {
            return <PostRow key={post.slug} post={post} />;
          })}
          {visiblePosts.length === 0 ? (
            <p className='py-12 font-mono text-meta text-ash'>
              0 results. the model is confident there is nothing here.
            </p>
          ) : null}
        </div>

        {!isDateFilter && !isTextFilter ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : null}
      </section>

      <aside className='lg:pt-2'>
        <ArchiveNav groupedPosts={groupedPosts} activeFilter={filter} onSelect={applyFilter} />
      </aside>
    </div>
  );
}
