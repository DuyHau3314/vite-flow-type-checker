import { AddressComponentActionTypes } from './constants';

const INIT_STATE = {
    loadingAddresses: false,
    error: null,
    addresses: null
};

type AddressesAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string },
};
//TODO: define data type for orders
type State = { loadingAddresses: Boolean, error?: null, addresses: any };

const AddressComponentReducers = (state: State = INIT_STATE, action: AddressesAction): any => {
    switch (action.type) {
        case AddressComponentActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case AddressComponentActionTypes.READ_ALL_ADDRESSES_REQUEST: {
                    return { ...state, loadingAddresses: false, addresses: action.payload.data };
                }
                default:
                    return { ...state, loadingAddresses: false };
            }

        case AddressComponentActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case AddressComponentActionTypes.READ_ALL_ADDRESSES_REQUEST: {
                    return { ...state, loadingAddresses: false };
                }
                default:
                    return { ...state };
            }

        case AddressComponentActionTypes.READ_ALL_ADDRESSES_REQUEST:
            return { ...state, loadingAddresses: true, addresses: null }
        default:
            return { ...state };
    }
};

export default AddressComponentReducers;
