import Link from 'next/link'

export default function HeroCard() {
  return (
    <div className="relative">
      <div className="relative shadow-xl sm:overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="/static/images/hero-img.jpg"
            alt="People working on laptops"
          />
          <div className="mix absolute inset-0 bg-slate-700 mix-blend-multiply" />
        </div>
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white">Learn development</span>
            <span className="block text-indigo-200">with great articles.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">
            Helping people make the world a better place through quality software.
          </p>
          <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <Link href="/blog">
                <a className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-indigo-50 sm:px-8">
                  Get started
                </a>
              </Link>
              <a
                href="mailto:neyostica2000@yahoo.com"
                className="flex items-center justify-center rounded-md border border-transparent bg-slate-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
              >
                Let's work
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
