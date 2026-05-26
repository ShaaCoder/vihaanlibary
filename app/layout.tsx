import './globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

import { AuthProvider } from '@/lib/auth-context';

import { Header } from '@/components/header';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vihaan Education Academy',
  description:
    'Quality education courses for your success',

  icons: {
    icon: '/vihaanlogo.png',
    apple: '/vihaanlogo.png',
  },

  openGraph: {
    images: [
      {
        url: '/vihaanlogo.png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    images: [
      {
        url: '/vihaanlogo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-gray-900 antialiased`}
      >
        <AuthProvider>
          {/* GLOBAL HEADER */}
          <Header />

          {/* PAGE CONTENT */}
          <main>
            {children}
          </main>

          {/* TOASTER */}
          <Toaster />
          <SonnerToaster />
        </AuthProvider>
      </body>
    </html>
  );
}