"use client";

import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Button } from "../../ui/Button";
import { LoggedInWrapper } from "../../ui/LoggedInWrapper";
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
    <LoggedInWrapper>
      <div className="dashboard">
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
      </div>
    </LoggedInWrapper>
  );
};
