import { AddressBookActionTypes } from './constants';

type AddressBookAction = { type: string, payload: {} | string };

export const addressBookApiResponseSuccess = (actionType: string, data: any): AddressBookAction => ({
    type: AddressBookActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const addressBookApiResponseError = (actionType: string, error: string): AddressBookAction => ({
    type: AddressBookActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const addressBookGetAllAddresses = (): AddressBookAction => ({
    type: AddressBookActionTypes.READ_ALL_ADDRESSES_REQUEST,
    payload: { },
});

export const addressBookCreateAddress = (address: any): AddressBookAction => ({
    type: AddressBookActionTypes.CREATE_ADDRESS_REQUEST,
    payload: { address },
});

export const addressBookReadAddress = (addressId: any): AddressBookAction => ({
    type: AddressBookActionTypes.READ_ADDRESS_REQUEST,
    payload: { addressId },
});

export const addressBookUpdateAddress = (addressId, address: any): AddressBookAction => ({
    type: AddressBookActionTypes.UPDATE_ADDRESS_REQUEST,
    payload: { addressId, address },
});

export const addressBookDeleteAddress = (addressId: any): AddressBookAction => ({
    type: AddressBookActionTypes.DELETE_ADDRESS_REQUEST,
    payload: { addressId },
});

