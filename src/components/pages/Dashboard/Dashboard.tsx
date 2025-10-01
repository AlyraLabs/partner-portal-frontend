"use client";

import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Button } from "../../ui/Button";
import "./Dashboard.scss";

export const Dashboard: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="dashboard dashboard--loading">
        <div className="dashboard__spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <header className="dashboard__header">
          <div className="dashboard__brand">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l2 2 4-4" />
            </svg>
            <span>Blackhole Portal</span>
          </div>
          <div className="dashboard__user">
            <span>Welcome, {user?.name || user?.email}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </header>

        <main className="dashboard__main">
          <div className="dashboard__welcome">
            <h1>Welcome to Blackhole Portal</h1>
            <p>Your authentication system is working perfectly!</p>
          </div>

          <div className="dashboard__cards">
            <div className="dashboard__card">
              <h3>API Integration</h3>
              <p>Setup and manage your Blackhole integrations</p>
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </div>

            <div className="dashboard__card">
              <h3>API Keys</h3>
              <p>Request API keys and rate limits</p>
              <Button variant="primary" size="sm">
                Manage Keys
              </Button>
            </div>

            <div className="dashboard__card">
              <h3>Analytics</h3>
              <p>View your data & analytics</p>
              <Button variant="primary" size="sm">
                View Reports
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
