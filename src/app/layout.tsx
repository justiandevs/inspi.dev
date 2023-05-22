import './globals.css'
import {Poppins} from 'next/font/google'
import {Metadata} from "next";
import {ReactNode} from "react";
import {Providers} from "@/components/providers";
import {Navigation} from "@/layout/navigation";
import {NextFont} from "next/dist/compiled/@next/font";
import {Footer} from "@/layout/footer";

const poppins: NextFont = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"] })

export const metadata: Metadata = {
  title: 'Inspi.dev - Get inspiration from other developers',
  description: 'Ran out of ideas to work on as a developer? Get inspired by projects other developers made and shared at Inspi',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.className} bg-gray-50 dark:bg-zinc-900`}>
          <Providers>
            <Navigation />
            {children}
            <Footer />
          </Providers>
        </body>
    </html>
  )
}
