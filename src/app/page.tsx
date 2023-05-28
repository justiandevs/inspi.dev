import { WorkInProgress } from "@/components/work-in-progress";
import { ReactElement } from "react";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export default async function Home(): Promise<ReactElement> {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies
  });

  const { data: posts } = await supabase.from('posts').select();

  return (
    <main className="">
      {process.env.NEXT_PUBLIC_WORK_IN_PROGRESS === "true" ?
        <WorkInProgress />
        :
        <>
          <section className="dark:bg-zinc-900 py-16">
            <div className="container-bsc flex flex-col gap-4">
              <h1>Ran out of ideas as a developer</h1>
              <p className="text-xl">Get inspired by projects or ideas that were made by other developers and shared at Inspi.</p>
            </div>
          </section>
          <section>
            {/*<pre>{JSON.stringify(posts, null, 2)}</pre>*/}
          </section>
        </>
      }
    </main>
  )
}
