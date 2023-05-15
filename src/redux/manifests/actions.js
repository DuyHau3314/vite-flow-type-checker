import { ManifestsActionTypes } from './constants';

type ManifestsAction = { type: string, payload: {} | string };

export const manifestsApiResponseSuccess = (actionType: string, data: any): ManifestsAction => ({
    type: ManifestsActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const manifestsApiResponseError = (actionType: string, error: string): ManifestsAction => ({
    type: ManifestsActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const manifestsGetAllManifests = (returnImage: Boolean, fullResponse: Boolean): ManifestsAction => ({
    type: ManifestsActionTypes.GET_ALL_MANIFESTS,
    payload: { returnImage, fullResponse },
});

export const manifestsCreateManifestForAllUnmanifested = (returnImage: Boolean, fullResponse: Boolean): ManifestsAction => ({
    type: ManifestsActionTypes.CREATE_MANIFEST_FOR_ALL_UNMANIFESTED,
    payload: { returnImage, fullResponse },
});

export const manifestsGetManifest = (manifestId, returnImage: Boolean, fullResponse: Boolean): ManifestsAction => ({
    type: ManifestsActionTypes.GET_MANIFEST,
    payload: { manifestId, returnImage, fullResponse },
});

export const manifestsResetState = (): ManifestsAction => ({
    type: ManifestsActionTypes.RESET_STATE,
    payload: {},
});