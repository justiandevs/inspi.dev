"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/layout/components/themeToggle";
import Link from "next/link";
import { useSupabase } from "@/components/supabaseProvider";
import { Variant, Variants, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Cross, LogIn, LogOut, Menu, Plus, User, X } from "lucide-react";

const variants: Variants = {
  open: {
    x: "0%",
  },
  closed: {
    x: "-100%"
  }
}

export const Navigation = (): ReactElement => {
  const { session, supabase } = useSupabase();
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const navigation = useRef<HTMLDivElement>(null);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if(navigation.current && !navigation.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    
    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, [isOpen])

  return (
    <>
      <nav className="dark:bg-zinc-900 border-b">
        <div className="container-bsc flex justify-between items-center py-6 sm:py-4">
          <div className="flex flex-row gap-4 sm:gap-6 items-center">
            <div className="flex sm:hidden transition duration-200 hover:text-indigo-600 hover:dark:text-indigo-400">
              {isOpen ?
                <X rotate={""} size={20} onClick={() => setIsOpen(false)} />
                :
                <Menu size={20} onClick={() => setIsOpen(true)} />
              }
            </div>
            <Link href="/" className="text-md font-medium">
              Inspi.dev
            </Link>
            <Link href="/projects" className="hidden text-sm opacity-60 dark:opacity-80 sm:flex transition duration-200 hover:opacity-100 hover:dark:opacity-100">
              Projects
            </Link>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div className="hidden sm:flex mr-2">
              <Input
                type="search"
                placeholder="Search..."
              >
              </Input>
            </div>
            {session === null ?
              <Link href="/signin"
                className="flex transition duration-200 hover:text-indigo-600 hover:dark:text-indigo-400">
                <LogIn size={20} />
              </Link>
              :
              <button onClick={() => signOut()}
                className="transition duration-200 hover:text-indigo-600 hover:dark:text-indigo-400">
                <LogOut size={20} />
              </button>
            }
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <motion.div
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        variants={variants}
        transition={{
          ease: "easeIn"
        }}
        ref={navigation}
        className="w-full h-full bg-primary-foreground fixed p-8 flex flex-col gap-4"
      >
        <Link href="/projects" className="text-md" onClick={() => setIsOpen(!isOpen)}>
          Projects
        </Link>
        <div>
          <Input
            type="search"
            placeholder="Search..."
          />
        </div>
      </motion.div>
    </>
  )
}
