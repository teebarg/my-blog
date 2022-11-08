import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 9

export async function getStaticProps() {
  const allPosts = await getAllFilesFrontMatter('blog')
  const posts = await Promise.all(
    allPosts.map(async (post) => {
      const authorList = post.authors || ['default']
      const authorDetails = await getFileBySlug('authors', [authorList[0]])
      post['author'] = authorDetails.frontMatter
      return post
    })
  )
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
