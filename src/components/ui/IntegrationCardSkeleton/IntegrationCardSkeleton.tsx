import React from 'react';

import './IntegrationCardSkeleton.scss';

export const IntegrationCardSkeleton: React.FC = () => {
  return (
    <div className="integration-card-skeleton">
      <div className="integration-card-skeleton__header">
        <div className="integration-card-skeleton__logo skeleton-shimmer"></div>
        <div className="integration-card-skeleton__title skeleton-shimmer"></div>
        <div className="integration-card-skeleton__button skeleton-shimmer"></div>
      </div>

      <div className="integration-card-skeleton__content">
        {[1, 2, 3, 4].map(item => (
          <div key={item} className="integration-card-skeleton__field">
            <div className="integration-card-skeleton__label skeleton-shimmer"></div>
            <div className="integration-card-skeleton__value skeleton-shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
