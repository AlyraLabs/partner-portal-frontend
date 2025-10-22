'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import useAuth from '@hooks/useAuth';
import { isFullUrl } from '@utils/isFullUrl';
import { sidebarLinks } from '@constants/sidebar';

import './Sidebar.scss';

import { SVGComponent } from '@/types';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__content">
        <ul className="sidebar__links">
          {sidebarLinks.slice(0, 5).map((link, index) => (
            <Link key={index} Icon={link.icon} text={link.text} link={link.link}></Link>
          ))}
        </ul>
        <div className="sidebar__content-bottom">
          <ul className="sidebar__links">
            {sidebarLinks.slice(5, 10).map((link, index) => (
              <Link key={index} Icon={link.icon} text={link.text} link={link.link}></Link>
            ))}
          </ul>
          <ul className="sidebar__links">
            {sidebarLinks.slice(10).map((link, index) => (
              <Link key={index} Icon={link.icon} text={link.text} link={link.link}></Link>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

const Link = ({ Icon, text, link }: { Icon: SVGComponent; text: string; link: string }) => {
  const { handleLogout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isExternal = isFullUrl(link);

  const handleClick = () => {
    if (link === '/logout') return handleLogout();
    if (!isExternal) router.push(link);
  };
  return (
    <li className={`sidebar__link ${pathname === link && 'sidebar__link--active'}`} onClick={handleClick}>
      {isExternal ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Icon /> {text}
        </a>
      ) : (
        <>
          <Icon /> {text}
        </>
      )}
    </li>
  );
};
