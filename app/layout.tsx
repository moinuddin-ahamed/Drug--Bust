import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Drug Bust',
  description: 'Created with React, Next.js, and Gemini AI',
  generator: 'Moin,Wujjwal',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
