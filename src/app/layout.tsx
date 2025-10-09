// import axios from 'axios';
import type { Metadata } from 'next';

// import { QueryClient } from '@tanstack/react-query';
import '../styles/globals.scss';

import Providers from '@/app/providers';
import Background from '@/components/Backgroud/Background';

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

  // await queryClient.prefetchQuery({
  //   queryKey: ['user'],
  //   queryFn: async () => {
  //     return await axios.get('/api/auth/me')?.data;
  //   },
  // });

  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Background />
      </body>
    </html>
  );
}
