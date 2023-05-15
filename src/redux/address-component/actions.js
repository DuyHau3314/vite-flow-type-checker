import { AddressComponentActionTypes } from './constants';

type AddressComponentAction = { type: string, payload: {} | string };

export const addressComponentApiResponseSuccess = (actionType: string, data: any): AddressComponentAction => ({
    type: AddressComponentActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const addressComponentApiResponseError = (actionType: string, error: string): AddressComponentAction => ({
    type: AddressComponentActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const addressComponentGetAllAddresses = (): AddressComponentAction => ({
    type: AddressComponentActionTypes.READ_ALL_ADDRESSES_REQUEST,
    payload: { },
});
