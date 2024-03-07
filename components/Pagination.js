// import Link from '@/components/Link'
import Link from 'next/link'

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="space-y-2 py-8 md:space-y-5">
      <nav
        className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-slate-400 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-slate-700 dark:text-white">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            {/* <span className="font-medium">{currentPage * 9}</span> of{' '} */}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          {!prevPage && (
            <span
              rel="previous"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </span>
          )}
          {prevPage && (
            <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
              <a
                rel="previous"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
            </Link>
          )}
          {nextPage && (
            <Link href={`/blog/page/${currentPage + 1}`}>
              <a
                rel="next"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </Link>
          )}
        </div>
      </nav>
      {/* <nav className="flex justify-between">
        {!prevPage && (
          <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <button rel="previous">Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button rel="next">Next</button>
          </Link>
        )}
      </nav> */}
    </div>
  )
}
