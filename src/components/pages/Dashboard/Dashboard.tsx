'use client';

import React, { useState } from 'react';

import { useAuthContext } from '@context/AuthContext';

import './Dashboard.scss';

import { Button } from '@/components';
import { Icon } from '@/components';
import { LoggedInWrapper } from '@/components';

interface Integration {
  id: string;
  name: string;
  url: string;
  string: string;
  plan: string;
  fee: string;
  rpms: string;
}

interface Analytics {
  availableFees: {
    amount: string;
    change: string;
    trend: 'up' | 'down';
  };
  totalVolumes: {
    amount: string;
    change: string;
    trend: 'up' | 'down';
  };
  totalUsers: {
    amount: string;
    change: string;
    trend: 'up' | 'down';
  };
  totalTransactions: {
    amount: string;
    change: string;
    trend: 'up' | 'down';
  };
}

export const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const [integrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Alyra Finance',
      url: 'app.alyra.finance',
      string: 'alyrafinance',
      plan: 'Standard Plan',
      fee: '10 bps',
      rpms: '200',
    },
  ]);

  const [analytics] = useState<Analytics>({
    availableFees: {
      amount: '$423.15',
      change: '+1.452,98 today',
      trend: 'up',
    },
    totalVolumes: {
      amount: '$129.784.12',
      change: '▲12.3% +$1.453,89 today',
      trend: 'up',
    },
    totalUsers: {
      amount: '28.834',
      change: '▲20.2% +2.054 today',
      trend: 'up',
    },
    totalTransactions: {
      amount: '234.004',
      change: '▲3.01% +1.492 today',
      trend: 'up',
    },
  });

  return (
    <LoggedInWrapper>
      <div className="dashboard">
        <div className="dashboard__container">
          {/* Your dApp Section */}
          <div className="dashboard__dapp-card">
            <div className="dashboard__dapp-info">
              <h2 className="dashboard__dapp-title">Your dApp</h2>
              <div className="dashboard__dapp-details">
                <div className="dashboard__dapp-url">
                  <span className="dashboard__dapp-label">URL:</span>
                  <span className="dashboard__dapp-value">{integrations[0]?.url}</span>
                </div>
                <div className="dashboard__dapp-string">
                  <span className="dashboard__dapp-label">String:</span>
                  <span className="dashboard__dapp-value">{integrations[0]?.string}</span>
                  <button className="dashboard__copy-btn" aria-label="Copy string">
                    <Icon name="copy" size="sm" />
                  </button>
                </div>
              </div>
            </div>

            <div className="dashboard__dapp-actions">
              <div className="dashboard__plan-section">
                <span className="dashboard__plan-text">{integrations[0]?.plan}</span>
                <Button variant="outline" size="sm" className="dashboard__upgrade-btn">
                  Upgrade
                </Button>
              </div>

              <div className="dashboard__action-buttons">
                <Button variant="outline" size="sm">
                  <Icon name="key" size="sm" />
                  API Keys
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="settings" size="sm" />
                  Settings
                </Button>
              </div>

              <div className="dashboard__metrics">
                <div className="dashboard__metric">
                  <span className="dashboard__metric-label">Alyra&apos;s Fee:</span>
                  <span className="dashboard__metric-value">{integrations[0]?.fee}</span>
                </div>
                <div className="dashboard__metric">
                  <span className="dashboard__metric-label">RPMs:</span>
                  <span className="dashboard__metric-value">{integrations[0]?.rpms}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="dashboard__analytics">
            <div className="dashboard__analytics-header">
              <h3 className="dashboard__analytics-title">View full analytics</h3>
              <select className="dashboard__analytics-filter">
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </div>

            <div className="dashboard__analytics-grid">
              <div className="dashboard__analytics-card">
                <div className="dashboard__analytics-icon">
                  <Icon name="dollar" size="md" />
                </div>
                <div className="dashboard__analytics-content">
                  <h4 className="dashboard__analytics-label">Available Fees</h4>
                  <div className="dashboard__analytics-amount">{analytics.availableFees.amount}</div>
                  <div
                    className={`dashboard__analytics-change dashboard__analytics-change--${analytics.availableFees.trend}`}>
                    {analytics.availableFees.change}
                  </div>
                </div>
              </div>

              <div className="dashboard__analytics-card">
                <div className="dashboard__analytics-icon">
                  <Icon name="trending-up" size="md" />
                </div>
                <div className="dashboard__analytics-content">
                  <h4 className="dashboard__analytics-label">Total Volumes</h4>
                  <div className="dashboard__analytics-amount">{analytics.totalVolumes.amount}</div>
                  <div
                    className={`dashboard__analytics-change dashboard__analytics-change--${analytics.totalVolumes.trend}`}>
                    {analytics.totalVolumes.change}
                  </div>
                </div>
              </div>

              <div className="dashboard__analytics-card">
                <div className="dashboard__analytics-icon">
                  <Icon name="users" size="md" />
                </div>
                <div className="dashboard__analytics-content">
                  <h4 className="dashboard__analytics-label">Total Users</h4>
                  <div className="dashboard__analytics-amount">{analytics.totalUsers.amount}</div>
                  <div
                    className={`dashboard__analytics-change dashboard__analytics-change--${analytics.totalUsers.trend}`}>
                    {analytics.totalUsers.change}
                  </div>
                </div>
              </div>

              <div className="dashboard__analytics-card">
                <div className="dashboard__analytics-icon">
                  <Icon name="zap" size="md" />
                </div>
                <div className="dashboard__analytics-content">
                  <h4 className="dashboard__analytics-label">Total Transactions</h4>
                  <div className="dashboard__analytics-amount">{analytics.totalTransactions.amount}</div>
                  <div
                    className={`dashboard__analytics-change dashboard__analytics-change--${analytics.totalTransactions.trend}`}>
                    {analytics.totalTransactions.change}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Integration Section */}
          <div className="dashboard__new-integration">
            <div className="dashboard__new-integration-content">
              <h3 className="dashboard__new-integration-title">New Integration</h3>
              <p className="dashboard__new-integration-subtitle">You can add up to 5 integrations</p>
              <Button variant="primary" className="dashboard__create-btn">
                Create
                <Icon name="arrow-right" size="sm" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LoggedInWrapper>
  );
};
