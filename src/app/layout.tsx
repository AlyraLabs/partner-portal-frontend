import { Geist, Geist_Mono } from 'next/font/google';

import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Metadata } from 'next';

import Background from '@components/Backgroud/Background';

import '../styles/globals.scss';

import Providers from '@/app/providers';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const queryClient = new QueryClient();
  //
  // await queryClient.prefetchQuery({
  //   queryKey: ['user'],
  //   queryFn: async () => {
  //     return await axios.get('/api/auth/me')?.data;
  //   },
  // });

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
        <Background />
      </body>
    </html>
  );
}
