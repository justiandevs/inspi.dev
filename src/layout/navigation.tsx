import {ReactElement} from "react";
import {ThemeToggle} from "@/layout/components/themeToggle";
import Link from "next/link";

export const Navigation = (): ReactElement => {
  return (
    <nav className="bg-white dark:bg-zinc-800">
      <div className="container-bsc flex justify-between items-center py-8">
        <div className="flex flex-row gap-8 items-center">
          <Link href="/" className="text-xl font-medium">
            Inspi.dev
          </Link>
          <Link href="/projects" className="transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-500">
            Projects
          </Link>
        </div>
        <div className="flex flex-row gap-8 items-center">
          {/*<Link href="/likes" className="transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-400">*/}
          {/*  My likes*/}
          {/*  <span className="text-[0.75rem] font-semibold text-red-600 dark:text-red-400 -translate-y-1/2">366</span>*/}
          {/*</Link>*/}
          <Link href="/login" className="transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-500">
            Login
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
