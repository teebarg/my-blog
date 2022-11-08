import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import PostCard from '@/components/PostCard'
import { Fade, Slide, Zoom } from 'react-awesome-reveal'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div>
        <div className="pt-4 text-center leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:leading-14">
          <h1 className="text-5xl font-extrabold">Insights</h1>
          <h1 className="mt-2 text-2xl font-semibold">{title}</h1>
        </div>
        <div className="sticky top-12 flex space-y-2 bg-white/95 px-4 py-5 pt-6 pb-8 backdrop-blur transition duration-500 dark:bg-slate-900/95 sm:px-6 md:space-y-5 lg:px-8 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75">
          <div className="mx-auto flex h-auto w-full flex-none items-center rounded-lg px-4 text-sm ring-1 ring-slate-200 hover:ring-slate-300 dark:bg-slate-800/75 dark:ring-inset dark:ring-white/5 dark:hover:bg-slate-700/40 dark:hover:ring-slate-500 md:w-80 lg:w-96">
            <svg
              aria-hidden="true"
              className="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400"
            >
              <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
            </svg>
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full border-none bg-transparent px-4 py-2 text-gray-900 focus:ring-0 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="min-h-[calc(100vh-30rem)]">
          <Zoom>
            <div className="mx-auto grid max-w-7xl flex-1 gap-x-5 gap-y-16 px-0 sm:grid-cols-2 sm:px-4 lg:grid-cols-3">
              {!filteredBlogPosts.length && 'No posts found.'}
              {displayPosts.map((post) => (
                <PostCard post={post} key={post.slug} />
              ))}
            </div>
          </Zoom>
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
