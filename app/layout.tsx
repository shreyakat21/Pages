import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { ToastProvider } from '@/components/Toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'Pages',
  description: 'Discover, track, and manage your reading with Pages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable}`}>
        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
