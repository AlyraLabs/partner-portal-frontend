"use client";

import React from "react";
import { IntegrationWizard } from "../../ui/IntegrationWizard";
import { LoggedInWrapper } from "../../ui/LoggedInWrapper";
import "./AddIntegrationPage.scss";

export const AddIntegrationPage: React.FC = () => {
  const handleIntegrationComplete = (data: any) => {
    console.log("Integration created:", data);
    // Handle integration creation and redirect to dashboard
    // You can use Next.js router here to redirect
  };

  const handleCancel = () => {
    // Handle cancel action - redirect back to dashboard
    console.log("Integration creation cancelled");
  };

  return (
    <LoggedInWrapper>
      <div className="add-integration-page">
        <IntegrationWizard
          hasExistingIntegrations={false} // Assume user has existing integrations
          onComplete={handleIntegrationComplete}
          onCancel={handleCancel}
        />
      </div>
    </LoggedInWrapper>
  );
};
