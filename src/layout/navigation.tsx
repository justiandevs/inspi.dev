import {ReactElement} from "react";
import {ThemeToggle} from "@/layout/components/themeToggle";
import Link from "next/link";
import {FaMoon, FaPersonBooth, FaSun, FaUser} from "react-icons/fa";

export const Navigation = (): ReactElement => {
  return (
    <nav className="bg-white dark:bg-zinc-800">
      <div className="container-bsc flex justify-between items-center py-8">
        <div className="flex flex-row gap-8 items-center">
          <Link href="/" className="text-xl font-medium">
            Inspi.dev
          </Link>
          <Link href="/projects" className="hidden sm:flex transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-500">
            Projects
          </Link>
        </div>
        <div className="flex flex-row gap-6 sm:gap-8 items-center">
          {/*<Link href="/likes" className="transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-400">*/}
          {/*  My likes*/}
          {/*  <span className="text-[0.75rem] font-semibold text-red-600 dark:text-red-400 -translate-y-1/2">366</span>*/}
          {/*</Link>*/}
          <Link href="/login" className="hidden sm:flex transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-500">
            Login
          </Link>
          <Link href="/projects" className="transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-500 sm:hidden">
            Projects
          </Link>
          <button
            className="transition duration hover:text-indigo-700 hover:dark:text-indigo-500 sm:hidden"
          >
            <FaUser />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
