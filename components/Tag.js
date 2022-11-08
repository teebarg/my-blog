import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-900 dark:bg-slate-800/60 dark:text-amber-500">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
