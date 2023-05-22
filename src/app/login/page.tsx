import {ReactElement} from "react";
import {Button} from "@/components/button";
import Link from "next/link";

export default function Login(): ReactElement {
  return (
    <section className="container-bsc py-16">
      <div className="max-w-sm mx-auto">
        <h1 className="as-h3">Sign in to your account</h1>
        <form className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-2">
            <label className="text-[0.8rem]">Email address</label>
            <input className="rounded-lg border border-gray-200 py-2 dark:bg-zinc-900 dark:border-zinc-800" type="text" placeholder="Your email address" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <label className="text-[0.8rem]">Password</label>
              <Link href="/forgot-password" className="transition duration-300 text-[0.8rem] text-indigo-600 hover:text-indigo-700 dark:text-indigo-500 hover:dark:text-indigo-600 font-medium">
                Forgot password?
              </Link>
            </div>
            <input className="rounded-lg border border-gray-200 py-2 dark:bg-zinc-900 dark:border-zinc-800" type="password" placeholder="Your password" />
          </div>
          <div className="flex">
            <Button
              url="/send"
              name="Sign In"
              type="primary"
              size="small"
              form={true}
              stretch={true}
            />
          </div>
        </form>
      </div>
    </section>
  )
}
