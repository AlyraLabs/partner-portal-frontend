"use client";

import React from "react";
import { Header } from "../Header";
import { BottomNavigation } from "../BottomNavigation";
import "./LoggedInWrapper.scss";

interface LoggedInWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const LoggedInWrapper: React.FC<LoggedInWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`logged-in-wrapper ${className}`.trim()}>
      <Header />
      <main className="logged-in-wrapper__content">
        <div className="logged-in-wrapper__container">{children}</div>
      </main>
      <BottomNavigation />
    </div>
  );
};
