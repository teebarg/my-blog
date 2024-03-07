import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import headerNavLinks from '@/data/headerNavLinks'

// import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import Logo from '@/data/logo.svg'

export function MobileNavigation() {
  let router = useRouter()
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    function onRouteChange() {
      setIsOpen(false)
    }

    router.events.on('routeChangeComplete', onRouteChange)
    router.events.on('routeChangeError', onRouteChange)

    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
      router.events.off('routeChangeError', onRouteChange)
    }
  }, [router, isOpen])

  return (
    <>
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
      >
        <Dialog.Panel className="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 dark:bg-slate-900 sm:px-6">
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <div className="flex items-center">
            <button type="button" onClick={() => setIsOpen(false)}>
              <span className="sr-only">Close navigation</span>
              <svg
                aria-hidden="true"
                className="h-6 w-6 stroke-slate-500"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 5l14 14M19 5l-14 14" />
              </svg>
            </button>
            <Link href="/">
              <a className="ml-6 block w-10 overflow-hidden lg:w-auto">
                <span className="sr-only">Home page</span>
                <Logo />
              </a>
            </Link>
          </div>
          <nav className="mt-5 px-1">
            {headerNavLinks.map((link) => (
              <div key={link.title} className="px-12 py-4">
                <Link
                  href={link.href}
                  className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                >
                  <a>{link.title}</a>
                </Link>
              </div>
            ))}
          </nav>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default MobileNavigation
