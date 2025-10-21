import React from 'react';

import { Sidebar } from '@components/ui/Sidebar/Sidebar';

import { Dashboard } from '@/components';
import { Header } from '@/components';

export default function DashboardPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <Dashboard />
    </>
  );
}
