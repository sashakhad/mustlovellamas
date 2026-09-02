'use client';

import { useMemo, useState } from 'react';
import { Pagination } from '@/app/components/Pagination';
import { PostCard } from '@/app/components/PostCard';
import { SearchForm } from '@/app/components/SearchForm';
import { useFilter } from '@/app/context/FilterContext';
import { formatPostMonth, formatPostYear } from '@/lib/dates';
import type { GroupedPosts, PostMeta } from '@/lib/posts';
import { buildPostSearchIndex, searchPosts } from '@/lib/searchIndex';

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
        const dateFilter = filter.replace('date:', '');
        const [year, month] = dateFilter.split('-');
        const matches: typeof indexedPosts = [];
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

  const years = Object.keys(groupedPosts).sort(function newestFirst(a, b) {
    return Number(b) - Number(a);
  });

  function handleSearch(query: string) {
    setCurrentPage(1);
    setFilter(query);
  }

  return (
    <div className='mx-auto grid max-w-5xl gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_16rem]'>
      <section>
        <p className='max-w-xl text-muted'>
          Tech notes I want to be able to send someone without also sending them my whole personal
          blog.
        </p>
        <div className='mt-6'>
          <SearchForm defaultQuery={isDateFilter ? '' : filter} onSearch={handleSearch} />
        </div>
        {tags.length > 0 ? (
          <ul className='mt-4 flex flex-wrap gap-2'>
            {tags.map(function renderTag(tag) {
              const isActive = filter === tag;
              return (
                <li key={tag}>
                  <button
                    type='button'
                    onClick={function selectTag() {
                      setCurrentPage(1);
                      setFilter(isActive ? '' : tag);
                    }}
                    className={
                      isActive
                        ? 'rounded-full bg-ink px-3 py-1 text-xs text-paper'
                        : 'rounded-full border border-wool px-3 py-1 text-xs text-muted hover:border-accent hover:text-ink'
                    }
                  >
                    #{tag}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}

        {filter.length > 0 ? (
          <div className='mt-8 flex items-center justify-between gap-4'>
            <p className='text-sm text-muted'>
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} for{' '}
              <span className='text-ink'>{filter.replace('date:', '')}</span>
            </p>
            <button
              type='button'
              onClick={function clearFilter() {
                setFilter('');
                setCurrentPage(1);
              }}
              className='text-sm text-accent hover:underline'
            >
              Clear
            </button>
          </div>
        ) : null}

        <div className='mt-4'>
          {visiblePosts.map(function renderPost(post) {
            return <PostCard key={post.slug} post={post} />;
          })}
          {visiblePosts.length === 0 ? (
            <p className='py-12 text-muted'>Nothing matched that search.</p>
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

      <aside className='lg:pt-1'>
        <h2 className='text-sm font-medium uppercase tracking-wide text-muted'>Archive</h2>
        <div className='mt-4 space-y-4'>
          {years.map(function renderYear(year) {
            const months = groupedPosts[year];
            if (!months) {
              return null;
            }
            const monthNames = Object.keys(months);
            return (
              <div key={year}>
                <p className='font-display text-lg text-ink'>{year}</p>
                <ul className='mt-1 space-y-1'>
                  {monthNames.map(function renderMonth(month) {
                    const count = months[month]?.length ?? 0;
                    const value = `date:${year}-${month}`;
                    const isActive = filter === value;
                    return (
                      <li key={month}>
                        <button
                          type='button'
                          onClick={function selectMonth() {
                            setCurrentPage(1);
                            setFilter(isActive ? '' : value);
                          }}
                          className={
                            isActive
                              ? 'text-sm text-accent'
                              : 'text-sm text-muted hover:text-ink'
                          }
                        >
                          {month} ({count})
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
