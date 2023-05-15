import { ManifestsActionTypes } from './constants';

const INIT_STATE = {
    loadingManifests: false,
    error: null,
    manifests: null,
    creatingManifest: false,
    createdManifest: null,
    downloadManifest: null,
    downloadedManifest: null
};

type ManifestsAction = {
    type: string,
    payload: { actionType?: string, loadingManifests: Boolean, manifests?: any, error?: string, creatingManifest: Boolean, createdManifest: any, downloadManifest: Boolean, downloadedManifest: any },
};
//TODO: define data type for manifests
type State = { loadingManifests: Boolean, error?: null, manifests: any, creatingManifest: Boolean, createdManifest: any, downloadingManifest: Boolean, downloadedManifest: any };

const Manifests = (state: State = INIT_STATE, action: ManifestsAction): any => {
    //console.log(action);
    switch (action.type) {
        case ManifestsActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ManifestsActionTypes.GET_ALL_MANIFESTS: {
                    return { ...state, loadingManifests: false, manifests: action.payload.data };
                }
                case ManifestsActionTypes.CREATE_MANIFEST_FOR_ALL_UNMANIFESTED: {
                    return { ...state, creatingManifest: false, createdManifest: action.payload.data };
                }
                case ManifestsActionTypes.GET_MANIFEST: {
                    return { ...state, downloadManifest: false, downloadedManifest: action.payload.data };
                }
                default:
                    return { ...state, loadingManifests: false, creatingManifest: false };
            }

        case ManifestsActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ManifestsActionTypes.GET_ALL_MANIFESTS: {
                    return { ...state, loadingManifests: false }
                }
                case ManifestsActionTypes.CREATE_MANIFEST_FOR_ALL_UNMANIFESTED: {
                    return { ...state, creatingManifest: false };
                }
                case ManifestsActionTypes.GET_MANIFEST: {
                    return { ...state, downloadManifest: false, downloadedManifest: null };
                }
                default:
                    return { ...state, loadingManifests: false, creatingManifest: false };
            }

        case ManifestsActionTypes.GET_ALL_MANIFESTS:
            return { ...state, loadingManifests: true, manifests: null }
        case ManifestsActionTypes.CREATE_MANIFEST_FOR_ALL_UNMANIFESTED:
            return { ...state, creatingManifest: true, createdManifest: null };
        case ManifestsActionTypes.GET_MANIFEST:
            return { ...state, downloadManifest: true, downloadedManifest: null };
        case ManifestsActionTypes.RESET_STATE:
            return INIT_STATE;
        default:
            return { ...state };
    }
};

export default Manifests;
