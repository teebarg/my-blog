import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import clsx from 'clsx'

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostTitle({ title, date, readTime, authorDetails }) {
  const { name, avatar, website } = authorDetails[0]
  return (
    <div className="overflow-hidden dark:-mb-32 dark:-mt-[4.5rem] dark:bg-slate-900 dark:pb-32 dark:pt-[4.5rem] dark:lg:-mt-[4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-12 sm:px-2 lg:relative lg:px-0">
        <div className="items-center gap-x-8 gap-y-16 px-4 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 mx-auto max-w-3xl md:text-center lg:text-left">
            <div className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50">
              <Image
                src={'/static/images/blur-cyan.png'}
                alt=""
                layout="fixed"
                width={530}
                height={530}
                unoptimized
                priority
              />
            </div>
            <div className="relative text-center">
              <p className="darkp:text-transparent inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-slate-950 dark:text-white">
                {title}
              </p>
              <p className="my-8 tracking-tight text-slate-800 dark:text-slate-400">By</p>
              <div className="mt-6 flex items-center justify-center">
                <div className="flex-shrink-0">
                  <a href={website}>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={avatar || '/static/images/default-profile.jpeg'}
                      alt="Profile image"
                    />
                  </a>
                </div>
                <div className="ml-3">
                  <p className="text-md text-left font-medium text-slate-950 dark:text-white">
                    <a href={website} className="hover:underline">
                      {name}
                    </a>
                  </p>
                  <div className="flex space-x-1 text-sm text-slate-800 dark:text-slate-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{readTime} read</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-80 -top-64">
              <Image
                src={'/static/images/blur-cyan.png'}
                alt=""
                layout="fixed"
                width={530}
                height={530}
                unoptimized
                priority
              />
            </div>
            <div className="absolute -bottom-40 -right-80">
              <Image
                src={'/static/images/blur-indigo.png'}
                alt=""
                layout="fixed"
                width={567}
                height={567}
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
