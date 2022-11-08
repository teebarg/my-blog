import Link from 'next/link'
import { components } from '@/components/social-icons'

const SocialIcon = ({ type, href, text }) => {
  const SocialSvg = components[type]

  return (
    <Link href={href}>
      <a
        target="_blank"
        className="flex items-center text-base font-medium tracking-tight text-blue-600"
      >
        <SocialSvg className="h-6 w-6 fill-current" />
        <span className="ml-2">{text}</span>
      </a>
    </Link>
  )
}

export default function Author({ children, frontMatter }) {
  const { name, avatar, email, website, linkedin, github } = frontMatter
  return (
    <section
      id="author"
      className="relative scroll-mt-14 pb-3 pt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-10 lg:pt-16"
    >
      <div className="relative mx-auto max-w-5xl pt-16 sm:px-6">
        <div className="bg-slate-50 pt-px dark:bg-slate-800 sm:rounded-[5rem]">
          <div className="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-slate-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72">
            <img className="absolute inset-0 h-full w-full object-cover" src={avatar} />
          </div>
          <div className="px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32">
            <p className="text-slate-90 mt-8 font-display text-4xl font-extrabold tracking-tight dark:text-white sm:text-4xl">
              <span className="block text-blue-600">{name} –</span> Making the world a better place
              through quality software.
            </p>
            <div className="prose max-w-none pt-8 pb-8 text-lg dark:prose-dark xl:col-span-2">
              {children}
            </div>
            <div className="space-y-4">
              <SocialIcon type="mail" href={`mailto:${email}`} text="Let's connect" />
              <SocialIcon type="linkedin" href={linkedin} text="Linkedin" />
              <SocialIcon type="github" href={github} text="Github" />
              <SocialIcon type="web" href={website} text="My Portfolio" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
