"use client";

import React, { useState } from "react";
import { Icon } from "../Icon";
import "./BottomNavigation.scss";

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
}

interface BottomNavigationProps {
  className?: string;
  items?: NavigationItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

const defaultItems: NavigationItem[] = [
  { id: "integrations", label: "Integrations", icon: "people" },
  { id: "analytics", label: "Analytics", icon: "global" },
  { id: "support", label: "Support", icon: "support" },
  { id: "documentation", label: "Documentation", icon: "documentation" },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  className = "",
  items = defaultItems,
  activeItem = "integrations",
  onItemClick,
}) => {
  const [currentActive, setCurrentActive] = useState(activeItem);

  const handleItemClick = (itemId: string) => {
    setCurrentActive(itemId);
    onItemClick?.(itemId);
  };

  return (
    <nav className={`bottom-navigation ${className}`.trim()}>
      <div className="bottom-navigation__container">
        {items.map((item) => (
          <button
            key={item.id}
            className={`bottom-navigation__item ${
              currentActive === item.id ? "bottom-navigation__item--active" : ""
            }`.trim()}
            onClick={() => handleItemClick(item.id)}
            aria-label={item.label}
          >
            <div className="bottom-navigation__icon">
              <Icon name={item.icon} size="md" />
            </div>
            <span className="bottom-navigation__label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
