import './globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

import { AuthProvider } from '@/lib/auth-context';

import { Header } from '@/components/header';
import Footer from '@/components/Footer';

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

    images: ['/vihaanlogo.png'],
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

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Vihaan Education Academy',
              url: 'https://vihaaneducation.com',
              logo: 'https://vihaaneducation.com/vihaanlogo.png',
              description: 'Quality education courses for your success since 2001',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '65/66, Vijay Vihar Phase I, Sector 5, Rohini',
                addressLocality: 'Delhi',
                postalCode: '110085',
                addressCountry: 'IN',
              },
              telephone: '+919212644428',
              sameAs: [],
            }),
          }}
        />

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://vihaaneducation.com',
              name: 'Vihaan Education Academy',
              image: 'https://vihaaneducation.com/vihaanlogo.png',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '65/66, Vijay Vihar Phase I, Sector 5, Rohini',
                addressLocality: 'Delhi',
                postalCode: '110085',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 28.7328,
                longitude: 77.1129,
              },
              telephone: '+919212644428',
              openingHoursSpecification: [
                { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '20:00' },
                { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '18:00' },
              ],
              priceRange: '$$',
            }),
          }}
        />

        {/* GLOBAL FOOTER */}
        <Footer />
      </body>
    </html>
  );
}