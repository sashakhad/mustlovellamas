import { Button } from './Button';

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
    <nav aria-label='pagination' className='mt-10 flex flex-wrap items-center gap-2'>
      <Button
        disabled={currentPage <= 1}
        onClick={function goPrev() {
          onPageChange(currentPage - 1);
        }}
      >
        ← prev
      </Button>
      {pages.map(function renderPage(page) {
        return (
          <Button
            key={page}
            active={page === currentPage}
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={function goToPage() {
              onPageChange(page);
            }}
          >
            {String(page).padStart(2, '0')}
          </Button>
        );
      })}
      <Button
        disabled={currentPage >= totalPages}
        onClick={function goNext() {
          onPageChange(currentPage + 1);
        }}
      >
        next →
      </Button>
    </nav>
  );
}
