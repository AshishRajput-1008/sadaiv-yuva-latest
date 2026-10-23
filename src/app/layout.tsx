import type { Metadata } from 'next';
import './globals.css';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Sadaiv Yuva Foundation | Empowering Youth, Transforming Bharat',
  description:
    'Sadaiv Yuva Foundation — registered NGO empowering youth & communities across India through education, health, livelihood & women empowerment. Partner organisations: Sadaiv Puja & Sadaiv Cyber.',
  keywords: [
    'Sadaiv Yuva Foundation',
    'Sadaiv Puja',
    'Sadaiv Cyber',
    'NGO India',
    'youth empowerment',
    'education',
    'puja havan',
    'digital literacy',
    'Uttar Pradesh',
  ],

  // Browser tab icon
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },

  openGraph: {
    title: 'Sadaiv Yuva Foundation | Empowering Youth, Transforming Bharat',
    description:
      'Join us in building a stronger, equitable India — one village at a time.',
    type: 'website',
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="tribar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}