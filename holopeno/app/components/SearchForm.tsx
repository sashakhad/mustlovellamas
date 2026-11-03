'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type SearchValues = {
  query: string;
};

type SearchFormProps = {
  defaultQuery: string;
  onSearch: (query: string) => void;
};

export function SearchForm({ defaultQuery, onSearch }: SearchFormProps) {
  const { register, handleSubmit, reset } = useForm<SearchValues>({
    defaultValues: { query: defaultQuery },
  });

  useEffect(
    function syncQuery() {
      reset({ query: defaultQuery });
    },
    [defaultQuery, reset]
  );

  function onSubmit(values: SearchValues) {
    onSearch(values.query.trim());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full' role='search'>
      <label htmlFor='post-search' className='sr-only'>
        search posts
      </label>
      <div className='flex items-center border border-line bg-soot transition-colors duration-quick focus-within:border-seed'>
        <span aria-hidden='true' className='pl-3 font-mono text-meta text-pepper'>
          &gt;
        </span>
        <input
          id='post-search'
          type='search'
          placeholder='grep titles, tags, notes'
          autoComplete='off'
          className='w-full bg-transparent px-3 py-2.5 font-mono text-meta text-bone placeholder:text-smoke focus:outline-none'
          {...register('query')}
        />
      </div>
    </form>
  );
}
