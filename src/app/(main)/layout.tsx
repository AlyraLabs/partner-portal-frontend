import React from 'react';

import './layout.scss';

import { Sidebar } from '@/components';
import { Header } from '@/components';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main-layout">
      <Header />
      <Sidebar />
      {children}
    </div>
  );
}
