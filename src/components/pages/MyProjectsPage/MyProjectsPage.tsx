'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import './MyProjectsPage.scss';

import { Wrapper } from '@/components';
import { Button } from '@/components';
import { IntegrationCard, IntegrationCardSkeleton } from '@/components/ui';
import { useIntegrations } from '@/contexts/IntegrationContext';

export const MyProjectsPage: React.FC = () => {
  const router = useRouter();
  const { integrations, isLoading } = useIntegrations();

  console.log(integrations);

  const handleCreateNew = () => {
    router.push('/new-integration');
  };

  const handleEdit = (id: string) => {
    router.push(`/projects/${id}/edit`);
  };

  return (
    <Wrapper>
      <div className="my-projects-page">
        <div className="my-projects-page__container">
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <h1 className="my-projects-page__title">// YOUR PROJECTS</h1>

          <div className="my-projects-page__grid">
            {isLoading ? (
              // Show skeleton loaders while loading
              <>
                <IntegrationCardSkeleton />
                <IntegrationCardSkeleton />
              </>
            ) : integrations.length > 0 ? (
              // Show actual integrations
              integrations.map(integration => (
                <IntegrationCard key={integration.id} integration={integration} onEdit={handleEdit} />
              ))
            ) : null}
          </div>

          <div className="my-projects-page__actions">
            {/*<Button variant="primary" size="lg" onClick={handleCreateNew} className="my-projects-page__create-btn">*/}
            {/*  <span>+</span>*/}
            {/*  CREATE NEW PROJECT*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
