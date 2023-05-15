import { ShipmentsActionTypes } from './constants';

const INIT_STATE = {
    loading: false,
    error: null,
    shipments: null,
    loadingOrder: false,
    order: null,
    creatingManifest: false,
    manifest: null
};

type ShipmentsAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string },
};
//TODO: define data type for shipments (orders)
type State = { loading: Boolean, error?: null, shipments: any, loadingOrder: Boolean, order: any, creatingManifest: Boolean, manifest: any };

const Shipments = (state: State = INIT_STATE, action: ShipmentsAction): any => {
    //console.log(action);
    switch (action.type) {
        case ShipmentsActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ShipmentsActionTypes.GET_ALL_SHIPMENTS: {
                    return { ...state, loading: false, shipments: action.payload.data };
                }
                case ShipmentsActionTypes.GET_ORDER: {
                    return { ...state, loadingOrder: false, order: action.payload.data };
                }
                case ShipmentsActionTypes.CREATE_MANIFEST: {
                    return { ...state, creatingManifest: false, manifest: action.payload.data };
                }
                default:
                    return { ...state, loading: false };
            }

        case ShipmentsActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ShipmentsActionTypes.GET_ALL_SHIPMENTS: {
                    return { ...state, loading: false };
                }
                case ShipmentsActionTypes.GET_ORDER: {
                    return { ...state, loadingOrder: false };
                }
                case ShipmentsActionTypes.CREATE_MANIFEST: {
                    return { ...state, creatingManifest: false };
                };
                default:
                    return { ...state, loading: false };
            }

        case ShipmentsActionTypes.GET_ALL_SHIPMENTS:
            return { ...state, loading: true, shipments: null }
        case ShipmentsActionTypes.GET_ORDER:
            return { ...state, loadingOrder: true, order: null };
        case ShipmentsActionTypes.CREATE_MANIFEST:
            return { ...state, creatingManifest: true, manifest: null };
        case ShipmentsActionTypes.RESET_STATE:
            return INIT_STATE;
        default:
            return { ...state };
    }
};

export default Shipments;
