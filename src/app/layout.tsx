import { Suspense } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';

// import axios from 'axios';
// import { QueryClient } from '@tanstack/react-query';
import '../styles/globals.scss';

import Providers from '@/app/providers';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Partner Portal | Alyra',
  description: 'Alyra Partner Portal',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['user'],
  //   queryFn: async () => {
  //     return await axios.get('/api/auth/me')?.data;
  //   },
  // });

  return (
    <html lang="en" className={`${geistMono.variable} ${geistSans.variable}`}>
      <body>
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
