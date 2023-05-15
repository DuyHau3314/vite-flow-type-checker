import { IntegrationsActionTypes } from './constants';

type IntegrationsAction = { type: string, payload: {} | string };

export const integrationsApiResponseSuccess = (actionType: string, data: any): IntegrationsAction => ({
    type: IntegrationsActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const integrationsApiResponseError = (actionType: string, error: string): IntegrationsAction => ({
    type: IntegrationsActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAllIntegrations = (): IntegrationsAction => ({
    type: IntegrationsActionTypes.GET_ALL_INTEGRATIONS,
    payload: {},
});
