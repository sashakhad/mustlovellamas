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
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <label htmlFor='post-search' className='sr-only'>
        Search posts
      </label>
      <input
        id='post-search'
        type='search'
        placeholder='Search titles, tags, notes'
        className='w-full rounded-md border border-wool bg-paper px-3 py-2 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none'
        {...register('query')}
      />
    </form>
  );
}
