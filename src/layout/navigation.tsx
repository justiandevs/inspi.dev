"use client";

import {ReactElement} from "react";
import {ThemeToggle} from "@/layout/components/themeToggle";
import Link from "next/link";
import {FaSignOutAlt, FaUser} from "react-icons/fa";
import {useSupabase} from "@/components/supabaseProvider";

export const Navigation = (): ReactElement => {
  const { session, supabase } = useSupabase();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

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
          {session === null &&
            <Link href="/signin"
                 className="hidden sm:flex transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-500">
              Sign In
            </Link>
          }
          <Link href="/projects" className="transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-500 sm:hidden">
            Projects
          </Link>
          {session !== null &&
            <button onClick={() => signOut()}
                   className="transition duration-300 hover:text-indigo-700 hover:dark:text-indigo-500">
              <FaSignOutAlt />
            </button>
          }
          {session === null &&
            <Link href="/signin"
                 className="transition duration hover:text-indigo-700 hover:dark:text-indigo-500 sm:hidden"
            >
              <FaUser />
            </Link>
          }
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
