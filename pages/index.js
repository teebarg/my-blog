import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import PostCard from '@/components/PostCard'
import HeroCard from '@/components/HeroCard'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import Link from 'next/link'
import { Fade, Slide, Zoom } from 'react-awesome-reveal'

import NewsletterForm from '@/components/NewsletterForm'

export async function getStaticProps() {
  const allPosts = await getAllFilesFrontMatter('blog')
  const trends = [...allPosts].filter((post) => post.trend)

  const latestPosts = allPosts.slice(0, 10)
  const posts = await Promise.all(
    latestPosts.map(async (post) => {
      const authorList = post.authors || ['default']
      const authorDetails = await getFileBySlug('authors', [authorList[0]])
      post['author'] = authorDetails.frontMatter
      return post
    })
  )

  const tags = await getAllTags('blog')

  return { props: { posts, tags, trends } }
}

export default function Home({ posts, tags, trends }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Fade>
        <HeroCard />
      </Fade>
      <div className="mx-auto max-w-7xl gap-10 px-0 pt-8 sm:px-4 md:flex">
        <div className="mx-auto grid flex-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:max-w-none">
          <Zoom duration="1000" triggerOnce>
            {posts.map((post, key) => (
              <PostCard post={post} key={key} />
            ))}
          </Zoom>
        </div>
        <div className="relative mt-16 px-4 sm:max-w-xs sm:px-0 md:mt-0">
          <div className="sticky top-[4.5rem] min-w-[15rem] overflow-y-auto md:h-[calc(100vh-4.5rem)]">
            <div className="">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Trending Posts
              </h3>
              <div className="divide-y">
                <Slide direction="right" triggerOnce>
                  {trends.map((item, key) => (
                    <Link href={`/blog/${item.slug}`} key={key}>
                      <a className="flex items-center space-x-4 py-4">
                        <span className="relative inline-block">
                          <img
                            className="h-16 w-24 rounded-lg"
                            src={item.postImg || '/static/images/no-image.jpg'}
                            alt={item.title}
                          />
                        </span>
                        <div className="relative flex-1">
                          <p className="text-xs font-normal uppercase">{item.tags.join(', ')}</p>
                          <p className="text-lg font-semibold">{item.title}</p>
                        </div>
                      </a>
                    </Link>
                  ))}
                </Slide>
              </div>
            </div>
            <nav className="mt-6 w-full">
              {sortedTags && (
                <>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Tags</h3>
                  <div className="mt-2 flex flex-wrap gap-y-4">
                    {sortedTags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
      {siteMetadata.newsletter.provider !== '' && (
        <div className="mt-8 flex items-center justify-center pt-4 sm:mt-16">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
