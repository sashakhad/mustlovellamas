type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages: number[] = [];
  for (let page = 1; page <= totalPages; page += 1) {
    pages.push(page);
  }

  return (
    <div className='mt-8 flex flex-wrap gap-2'>
      {currentPage > 1 ? (
        <button
          type='button'
          onClick={function goPrev() {
            onPageChange(currentPage - 1);
          }}
          className='rounded-md border border-wool px-3 py-1.5 text-sm hover:border-accent'
        >
          Previous
        </button>
      ) : null}
      {pages.map(function renderPage(page) {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            type='button'
            onClick={function goToPage() {
              onPageChange(page);
            }}
            className={
              isCurrent
                ? 'rounded-md bg-ink px-3 py-1.5 text-sm text-paper'
                : 'rounded-md border border-wool px-3 py-1.5 text-sm hover:border-accent'
            }
          >
            {page}
          </button>
        );
      })}
      {currentPage < totalPages ? (
        <button
          type='button'
          onClick={function goNext() {
            onPageChange(currentPage + 1);
          }}
          className='rounded-md border border-wool px-3 py-1.5 text-sm hover:border-accent'
        >
          Next
        </button>
      ) : null}
    </div>
  );
}
