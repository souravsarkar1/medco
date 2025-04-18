import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "Medico - Your Health Partner",
    template: "%s | Medico"
  },
  description: "Medico - A modern telehealth platform connecting patients with healthcare providers",
  keywords: ["telehealth", "healthcare", "medical", "doctors", "online consultation"],
  authors: [{ name: "Medico Team" }],
  creator: "Medico",
  publisher: "Medico",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medico.com",
    siteName: "Medico",
    title: "Medico - Your Health Partner",
    description: "Modern telehealth platform connecting patients with healthcare providers",
    images: [{
      url: "https://medico.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Medico Platform"
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medico - Your Health Partner',
    description: 'Modern telehealth platform connecting patients with healthcare providers',
    images: ['https://medico.com/twitter-image.jpg'],
    creator: '@medicohealth',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};