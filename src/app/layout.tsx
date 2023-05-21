import './globals.css'
import {Inter, Poppins} from 'next/font/google'

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"] })

export const metadata = {
  title: 'Inspi.dev - Get inspiration from other developers',
  description: 'Ran out of ideas to work on as a developer? Get inspired by projects other developers made and shared at Inspi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
