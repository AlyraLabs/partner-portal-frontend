import { Lexend } from 'next/font/google';

import type { Metadata } from 'next';

// import axios from 'axios';
// import { QueryClient } from '@tanstack/react-query';
import '../styles/globals.scss';

import Providers from '@/app/providers';
import Background from '@/components/Backgroud/Background';

const lexendSans = Lexend({
  variable: '--font-lexend-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Partner Portal - Alyra',
  description: "The only DeFi liquidity stack you'll ever need",
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
    <html lang="en" className={`${lexendSans.className}`}>
      <body>
        <Providers>{children}</Providers>
        <Background />
      </body>
    </html>
  );
}
