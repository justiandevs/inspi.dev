import Link from "next/link"
import { ReactElement, ReactNode } from "react"

export default function ProfileLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <>
      <section className="py-12 border-b">
        <div className="container-bsc">
          <h1 className="as-h3">My profile</h1>
        </div>
      </section>
      <section className="md:max-w-7xl md:mx-auto flex flex-col md:grid grid-cols-4 gap-8 md:py-16">
        <div className="col-span-1 flex flex-row md:flex-col gap-6 md:gap-0 border-b md:border-none py-2 md:py-0 container-bsc w-full">
          <Link href="/profile" className="text-md transition duration-200 opacity-60 hover:opacity-100 dark:opacity-80 hover:dark:opacity-100 md:px-3 md:-ml-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 py-2 rounded-lg">
            Profile
          </Link>
          <Link href="/profile/settings" className="text-md transition duration-200 opacity-60 hover:opacity-100 dark:opacity-80 hover:dark:opacity-100 md:px-3 md:-ml-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 py-2 rounded-lg">
            Settings
          </Link>
        </div>
        <div className="col-span-3 container-bsc w-full">
          {children}
        </div>
      </section>
    </>
  )
}