import Link from 'next/link'
import Section from '@/components/Section'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import PostTitle from '@/components/PostTitle'
import Prose from '@/components/Prose'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import { Navigation } from '@/components/Navigation'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { Fade, Zoom } from 'react-awesome-reveal'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`

const group = (posts) => {
  const result = {}
  posts.forEach((post) => {
    if (!post.category) return
    // Object.prototype.hasOwnProperty.call(obj, prop)
    // if (result.hasOwnProperty(post.category)) {
    if (Object.prototype.hasOwnProperty.call(result, post.category)) {
      result[post.category].push(post)
    } else {
      result[post.category] = [post]
    }
  })

  const grouped = []
  for (const [title, links] of Object.entries(result)) {
    grouped.push({ title, links })
  }
  return grouped
}

export default function PostNew({ frontMatter, authorDetails, next, prev, allPosts, children }) {
  const { slug, fileName, date, title, tags, postImg, readTime } = frontMatter
  const { name, avatar, about } = authorDetails[0]

  const nav = group(allPosts)

  return (
    <Section>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />

      <PostTitle title={title} readTime={readTime} date={date} authorDetails={authorDetails} />

      <div className="max-w-8xl relative mx-auto flex justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-16 pl-0.5">
            <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
            <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
            <Navigation navigation={nav} className="w-64 pr-8 xl:w-72 xl:pr-16" />
          </div>
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
          <article>
            <Fade duration="2500" triggerOnce>
              <div className="relative mb-2 h-80">
                <Image
                  alt="Post Image"
                  src={postImg || '/static/images/no-image.jpg'}
                  layout="fill"
                  className="rounded-2xl"
                />
              </div>
            </Fade>
            <Zoom triggerOnce cascade>
              <Prose>{children}</Prose>
            </Zoom>
          </article>
          <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
            {prev && (
              <div>
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link href={`/blog/${prev.slug}`}>
                    <a className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                      &larr; {prev.title}
                    </a>
                  </Link>
                </dd>
              </div>
            )}
            {next && (
              <div className="ml-auto text-right">
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link href={`/blog/${next.slug}`}>
                    <a className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                      {next.title} &rarr;
                    </a>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
          <div className="py-6 text-sm text-gray-700 dark:text-gray-300">
            <Link href={editUrl(fileName)}>
              <a>{'View on GitHub'}</a>
            </Link>
          </div>
          <Comments frontMatter={frontMatter} />
        </div>
        <div className="hidden max-w-xs xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <div className="space-y-4">
            <img
              className="h-20 w-20 rounded-full lg:h-24 lg:w-24"
              src={avatar || '/static/images/default-profile.jpeg'}
              alt="avatar"
            />
            <div className="space-y-2">
              <div className="text-xs font-medium lg:text-sm">
                <h3 className="text-lg font-semibold text-sky-500">{name}</h3>
                <p className="text-slate-500 dark:text-slate-400">{about}</p>
              </div>
            </div>
          </div>
          <nav className="mt-6 w-56">
            {tags && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  Tags
                </h2>
                <div className="mt-2 flex flex-wrap gap-y-2">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </Section>
  )
}
