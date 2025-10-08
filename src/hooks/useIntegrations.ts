import { useIntegrations as useIntegrationContext } from '../contexts/IntegrationContext';
import { CreateIntegrationDto } from '../types/integration';

export const useIntegrations = () => {
  const context = useIntegrationContext();

  const createIntegration = async (data: CreateIntegrationDto) => {
    try {
      const newIntegration = await context.createIntegration(data);
      return newIntegration;
    } catch (error) {
      console.error('Error creating integration:', error);
      throw error;
    }
  };

  return {
    ...context,
    createIntegration,
  };
};
