import { NewCsvIntegrationBatchActionTypes } from './constants';

type NewCsvIntegrationBatchAction = { type: string, payload: {} | string };

export const newCsvIntegrationBatchApiResponseSuccess = (actionType: string, data: any): NewCsvIntegrationBatchAction => ({
    type: NewCsvIntegrationBatchActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const newCsvIntegrationBatchApiResponseError = (actionType: string, error: string): NewCsvIntegrationBatchAction => ({
    type: NewCsvIntegrationBatchActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const createCsvIntegrationWithBatchContent = (integration: any, batch: any, fileFormData: any): NewCsvIntegrationBatchAction => ({
    type: NewCsvIntegrationBatchActionTypes.CREATE_CSV_INTEGRATION_BATCH,
    payload: { integration, batch, fileFormData },
});
