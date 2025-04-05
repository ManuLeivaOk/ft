import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '../context/SessionContext'

const font = DM_Sans({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Rotary event',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${font.className} antialiased`}>{children}</body>
      </SessionProvider>
    </html>
  )
}
