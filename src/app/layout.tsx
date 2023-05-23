import './globals.css'
import {Poppins} from 'next/font/google'
import {Metadata} from "next";
import {ReactNode} from "react";
import {Providers} from "@/components/providers";
import {Navigation} from "../layout/navigation";
import {NextFont} from "next/dist/compiled/@next/font";
import {Footer} from "../layout/footer";
import {createServerComponentSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {cookies, headers} from "next/headers";
import SupabaseProvider from "@/components/supabaseProvider";

const poppins: NextFont = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"] })

export const metadata: Metadata = {
  title: 'Inspi.dev - Get inspiration from other developers',
  description: 'Ran out of ideas to work on as a developer? Get inspired by projects other developers made and shared at Inspi',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies
  })

  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.className} bg-gray-50 dark:bg-zinc-900`}>
          <SupabaseProvider session={session}>
            <Providers>
              <Navigation />
              {children}
              <Footer />
            </Providers>
          </SupabaseProvider>
        </body>
    </html>
  )
}
