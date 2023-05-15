import { ManifestActionTypes } from './constants';

const INIT_STATE = {
    loadingManifest: false,
    error: null,
    manifest: null
};

type ManifestAction = {
    type: string,
    payload: { actionType?: string, loadingManifest: Boolean, manifest?: any, error?: string },
};
//TODO: define data type for manifest
type State = { loadingManifest: Boolean, error?: null, manifest: any };

const Manifest = (state: State = INIT_STATE, action: ManifestAction): any => {
    //console.log(action);
    switch (action.type) {
        case ManifestActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ManifestActionTypes.GET_MANIFEST: {
                    return { ...state, loadingManifest: false, manifest: action.payload.data };
                }
                default:
                    return { ...state, loadingManifests: false };
            }

        case ManifestActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ManifestActionTypes.GET_MANIFEST: {
                    return { ...state, loadingManifest: false, manifest: null };
                }
                default:
                    return { ...state, loadingManifest: false };
            }

        case ManifestActionTypes.GET_MANIFEST:
            return { ...state, loadingManifest: true, manifest: null };
        case ManifestActionTypes.RESET_STATE:
            return INIT_STATE;
        default:
            return { ...state };
    }
};

export default Manifest;
