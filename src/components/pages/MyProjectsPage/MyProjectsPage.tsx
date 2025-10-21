'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import './MyProjectsPage.scss';

import { Button, Icon, LoggedInWrapper } from '@/components';
import { IntegrationCard, IntegrationCardSkeleton } from '@/components/ui';
import { useIntegrations } from '@/contexts/IntegrationContext';

export const MyProjectsPage: React.FC = () => {
  const router = useRouter();
  const { integrations, isLoading, error } = useIntegrations();

  console.log(integrations);

  const handleCreateNew = () => {
    router.push('/new-integration');
  };

  const handleEdit = (id: string) => {
    router.push(`/integrations/${id}/edit`);
  };

  return (
    <LoggedInWrapper>
      <div className="my-projects-page">
        <div className="my-projects-page__container">
          <h1 className="my-projects-page__title">// YOUR PROJECTS</h1>

          {error && (
            <div className="my-projects-page__error">
              <p>Failed to load projects: {error}</p>
            </div>
          )}

          <div className="my-projects-page__grid">
            {isLoading ? (
              // Show skeleton loaders while loading
              <>
                <IntegrationCardSkeleton />
                <IntegrationCardSkeleton />
                <IntegrationCardSkeleton />
              </>
            ) : integrations.length === 0 ? (
              // Empty state
              <div className="my-projects-page__empty">
                <p>No projects yet. Create your first integration!</p>
              </div>
            ) : (
              // Show actual integrations
              integrations.map(integration => (
                <IntegrationCard key={integration.id} integration={integration} onEdit={handleEdit} />
              ))
            )}
          </div>

          <div className="my-projects-page__actions">
            <Button variant="primary" size="lg" onClick={handleCreateNew} className="my-projects-page__create-btn">
              <span>+</span>
              CREATE NEW PROJECT
            </Button>
          </div>
        </div>
      </div>
    </LoggedInWrapper>
  );
};
