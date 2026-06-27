import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';
import { SessionProvider } from '@/lib/session-context';

export const metadata: Metadata = {
  metadataBase: new URL('https://sevensides.pk'),
  title: {
    default:  'Seven Sides | Home of Red Tenders',
    template: '%s | Seven Sides',
  },
  description:
    'Home of Red Tenders in Lahore. Bold Flavors. Memories Worth Sharing. ' +
    'DHA Phase 5, Cantt, Lake City and Model Town.',
  keywords: [
    'Seven Sides', 'Red Tenders Lahore', 'hot chicken Lahore',
    'The Sando', 'chicken sliders', 'sevensides.pk',
    'DHA Phase 5 restaurant', 'hot chicken DHA',
  ],
  openGraph: {
    type:     'website',
    locale:   'en_PK',
    siteName: 'Seven Sides',
  },
  twitter: { card: 'summary_large_image' },
  robots:  { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}