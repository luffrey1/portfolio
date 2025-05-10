import type { Metadata } from 'next'
import { Inter, Urbanist } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticlesBackground from '@/components/ParticlesBackground'
import EasterEggInitializer from '@/components/EasterEggInitializer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist',
})

export const metadata: Metadata = {
  title: 'Daniel Gheorghe | Desarrollador Web & Técnico SEO',
  description: 'Portfolio profesional de Daniel Gheorghe, Desarrollador Web y Técnico SEO especializado en crear experiencias digitales modernas y optimizadas.',
  keywords: 'desarrollador web, técnico seo, portfolio, react, next.js, wordpress',
  authors: [{ name: 'Daniel Gheorghe' }],
  openGraph: {
    title: 'Daniel Gheorghe | Desarrollador Web & Técnico SEO',
    description: 'Portfolio profesional de Daniel Gheorghe, Desarrollador Web y Técnico SEO',
    url: 'https://danielgeorghe.com',
    siteName: 'Daniel Gheorghe Portfolio',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Gheorghe | Desarrollador Web & Técnico SEO',
    description: 'Portfolio profesional de Daniel Gheorghe, Desarrollador Web y Técnico SEO',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${urbanist.variable} font-sans bg-primary-dark text-primary-light relative min-h-screen`}>
        <ThemeProvider>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <ParticlesBackground />
          </div>
          
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
          
          <Toaster position="bottom-right" />
          <EasterEggInitializer />
        </ThemeProvider>
      </body>
    </html>
  )
} 