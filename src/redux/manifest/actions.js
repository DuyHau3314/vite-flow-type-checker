import { ManifestActionTypes } from './constants';

type ManifestAction = { type: string, payload: {} | string };

export const manifestApiResponseSuccess = (actionType: string, data: any): ManifestAction => ({
    type: ManifestActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const manifestApiResponseError = (actionType: string, error: string): ManifestAction => ({
    type: ManifestActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const manifestGetManifest = (manifestId, returnImage: Boolean, fullResponse: Boolean): ManifestAction => ({
    type: ManifestActionTypes.GET_MANIFEST,
    payload: { manifestId, returnImage, fullResponse },
});

export const manifestResetState = (): ManifestAction => ({
    type: ManifestActionTypes.RESET_STATE,
    payload: {},
});