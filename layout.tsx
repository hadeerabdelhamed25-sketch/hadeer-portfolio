import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';
import { SITE, NAME, TITLE, EMAIL, LINKEDIN } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: `${NAME} | ${TITLE}`, template: `%s | ${NAME}` },
  description: 'متخصصة في استراتيجيات تحسين محركات البحث والنمو الرقمي واستراتيجية المحتوى.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'ar_EG', siteName: NAME, title: `${NAME} | ${TITLE}`, images: ['/images/photo.jpg'] },
  icons: { icon: '/images/logo.png' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#1D3047' };

// Only facts supported by the approved document.
const ld = { '@context': 'https://schema.org', '@type': 'Person', name: NAME, jobTitle: TITLE, email: EMAIL, sameAs: [LINKEDIN], address: { '@type': 'PostalAddress', addressLocality: 'Alexandria' } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Manrope:wght@500;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body><Effects /><Header /><main>{children}</main><Footer /></body>
    </html>
  );
}
