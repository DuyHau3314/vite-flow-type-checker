import { AddressBookActionTypes } from './constants';

const INIT_STATE = {
    loadingAddresses: false,
    error: null,
    addresses: null,
    creatingAddress: false,
    createdAddress: null,
    deletingAddress: false,
    deletedAddress: false,
    updatingAddress: false,
    updatedAddress: null,
    initialAddress: {
        description: null,
        name: null,
        companyName: null,
        email: null,
        phone: null,
        street1: null,
        street2: null,
        street3: null,
        stateProvince: null,
        postalCode: null,
        cityLocality: null,
        countryCode: null
    }
};

type AddressesAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string },
};
//TODO: define data type for orders
type State = { loadingAddresses: Boolean, error?: null, addresses: any, creatingAddress: Boolean, createdAddress: any, deletingAddress: Boolean, deletedAddress: Boolean, updatingAddress: Boolean, updatedAddress: any, initialAddress: any };

const AddressBook = (state: State = INIT_STATE, action: AddressesAction): any => {
    switch (action.type) {
        case AddressBookActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case AddressBookActionTypes.READ_ALL_ADDRESSES_REQUEST: {
                    return { ...state, loadingAddresses: false, addresses: action.payload.data };
                }
                case AddressBookActionTypes.CREATE_ADDRESS_REQUEST: {
                    return { ...state, creatingAddress: false, createdAddress: action.payload.data };
                }
                case AddressBookActionTypes.DELETE_ADDRESS_REQUEST: {
                    return { ...state, deletingAddress: false, deletedAddress: true };
                }
                case AddressBookActionTypes.UPDATE_ADDRESS_REQUEST: {
                    return { ...state, updatedAddress: false, updatedAddress: action.payload.data };
                }
                default:
                    return { ...state, loadingAddresses: false };
            }

        case AddressBookActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case AddressBookActionTypes.READ_ALL_ADDRESSES_REQUEST: {
                    return { ...state, loadingAddresses: false };
                }
                case AddressBookActionTypes.CREATE_ADDRESS_REQUEST: {
                    return { ...state, creatingAddress: false };
                }
                case AddressBookActionTypes.DELETE_ADDRESS_REQUEST: {
                    return { ...state, deletingAddress: false };
                }
                case AddressBookActionTypes.UPDATE_ADDRESS_REQUEST: {
                    return { ...state, updatingAddress: false };
                }
                default:
                    return { ...state };
            }

        case AddressBookActionTypes.READ_ALL_ADDRESSES_REQUEST:
            return { ...state, loadingAddresses: true, addresses: null }
        case AddressBookActionTypes.CREATE_ADDRESS_REQUEST:
            return { ...state, creatingAddress: true, createdAddress: null }
        case AddressBookActionTypes.DELETE_ADDRESS_REQUEST:
            return { ...state, deletingAddress: true, deletedAddress: false }
        case AddressBookActionTypes.UPDATE_ADDRESS_REQUEST:
            return { ...state, updatingAddress: true, updatedAddress: null }
        default:
            return { ...state };
    }
};

export default AddressBook;
