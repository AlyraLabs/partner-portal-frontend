import Analytics from '@/../public/icons/analytics.svg';
import Bug from '@/../public/icons/bug.svg';
import Dashboard from '@/../public/icons/dashboard.svg';
import Docs from '@/../public/icons/docs.svg';
import Fees from '@/../public/icons/fees.svg';
import Logout from '@/../public/icons/logout.svg';
import Members from '@/../public/icons/members.svg';
import Projects from '@/../public/icons/projects.svg';
import Settings from '@/../public/icons/settings.svg';
import Support from '@/../public/icons/support.svg';

export const sidebarLinks = [
  // {
  //   icon: Dashboard,
  //   text: 'Dashboard',
  //   link: '/dashboard',
  // },
  {
    icon: Projects,
    text: 'My Projects',
    link: '/projects',
  },
  {
    icon: Analytics,
    text: 'Analytics',
    link: '/analytics',
  },
  {
    icon: Fees,
    text: 'Fees',
    link: '/fees',
  },
  // {
  //   icon: Members,
  //   text: 'Members',
  //   link: '/members',
  // },
  {
    icon: Docs,
    text: 'Docs',
    link: 'https://docs.alyra.finance/',
  },
  {
    icon: Settings,
    text: 'Settings',
    link: '/settings',
  },
  {
    icon: Support,
    text: 'Support',
    link: 'https://t.me/whoisfedelya',
  },
  {
    icon: Logout,
    text: 'Logout',
    link: '/logout',
  },
  {
    icon: Logout,
    text: 'Danger Zone',
    link: '/danger-zone',
  },
  {
    icon: Bug,
    text: 'Bug Report',
    link: '/bug-report',
  },
];
