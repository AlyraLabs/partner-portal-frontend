import './Logo.scss';

import { Icon } from '@/components';

export function Logo() {
  return (
    <div className="logo">
      <Icon name="logo" size="xl" className="logo-icon" />
      <span className="logo-text">Alyra</span>
    </div>
  );
}
