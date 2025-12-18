import { useSearchResultsActions } from '@sitecore-search/react';
import { Pagination } from '@sitecore-search/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from 'next-localization';

type SearchPaginationProps = {
  currentPage: number;
  totalPages: number;
};

const SearchPagination = ({ currentPage, totalPages }: SearchPaginationProps) => {
  const { onPageNumberChange } = useSearchResultsActions();
  const { t } = useI18n();

  if (totalPages <= 1) return null;

  return (
    <Pagination.Root
      currentPage={currentPage}
      defaultCurrentPage={1}
      totalPages={totalPages}
      onPageChange={(v) =>
        onPageNumberChange({
          page: v,
        })
      }
      className="mt-12 flex items-center justify-center space-x-2 text-sm md:space-x-4"
    >
      <Pagination.PrevPage
        onClick={(e) => e.preventDefault()}
        className="bg-background-accent rounded-md px-3 py-2 data-[current=true]:hidden md:px-4 md:py-3"
      >
        <span className="md:hidden">
          <ChevronLeft size={16} />
        </span>
        <span className="hidden md:block">{t('pagination_prev_btn_text') || 'Prev'}</span>
      </Pagination.PrevPage>
      <Pagination.Pages>
        {(pagination) =>
          Pagination.paginationLayout(pagination, {
            boundaryCount: 1,
            siblingCount: 1,
          }).map(({ page, type }) =>
            type === 'page' ? (
              <Pagination.Page
                key={page}
                aria-label={`Page ${page}`}
                page={page as number}
                onClick={(e) => e.preventDefault()}
                className={`mx-1 rounded-md px-3 py-2 md:px-4 md:py-3 ${
                  page === currentPage ? 'bg-accent text-background' : 'bg-background-accent'
                }`}
              >
                {page}
              </Pagination.Page>
            ) : (
              <span key={type} className="md:px-2">
                ...
              </span>
            )
          )
        }
      </Pagination.Pages>
      <Pagination.NextPage
        onClick={(e) => e.preventDefault()}
        className="bg-background-accent rounded-md px-3 py-2 data-[current=true]:hidden md:px-4 md:py-3"
      >
        <span className="md:hidden">
          <ChevronRight size={16} />
        </span>
        <span className="hidden md:block">{t('pagination_next_btn_text') || 'Next'}</span>
      </Pagination.NextPage>
    </Pagination.Root>
  );
};

export default SearchPagination;
