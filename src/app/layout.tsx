import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';

import Background from '@components/Backgroud/Background';

import { AuthProvider } from '../contexts/AuthContext';

import '../styles/globals.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Partner Portal - Blackhole',
  description: "The only DeFi liquidity stack you'll ever need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>{children}</AuthProvider>
        <Background />
      </body>
    </html>
  );
}
