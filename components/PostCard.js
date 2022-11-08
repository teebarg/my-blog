import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import Tag from '@/components/Tag'
import Link from 'next/link'

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostCard({ post }) {
  return (
    <div className="flex h-full flex-col overflow-hidden dark:rounded-none dark:shadow-none">
      <div className="flex-shrink-0">
        <Image
          alt={post.slug}
          src={post.postImg || '/static/images/no-image.jpg'}
          layout="responsive"
          width={600}
          height={250}
        />
      </div>
      <div className="flex h-full flex-1 flex-col justify-between bg-white px-4 dark:bg-slate-900 sm:p-2">
        <div className="flex-1">
          <div className="my-2 flex flex-wrap">
            {post.tags.map((tag, key) => (
              <Tag key={key} text={tag} />
            ))}
          </div>
          <Link href={`/blog/${post.slug}`}>
            <a className="block">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">{post.title}</p>
              <p className="mt-3 text-base text-slate-500 line-clamp-3 dark:text-slate-400">
                {post.summary}
              </p>
            </a>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href={post.author?.website} target="_blank" rel="noreferrer">
              <img
                className="h-10 w-10 rounded-full"
                src={post.author?.avatar}
                alt={post.author?.name}
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              <a
                href={post.author?.website}
                target="_blank"
                className="hover:underline"
                rel="noreferrer"
              >
                {post.author?.name}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-slate-500 dark:text-slate-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </time>
              {post.readTime && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readTime} read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
