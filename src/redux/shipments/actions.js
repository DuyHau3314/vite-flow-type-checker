import { ShipmentsActionTypes } from './constants';

type ShipmentsAction = { type: string, payload: {} | string };

export const shipmentsApiResponseSuccess = (actionType: string, data: any): ShipmentsAction => ({
    type: ShipmentsActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const shipmentsApiResponseError = (actionType: string, error: string): ShipmentsAction => ({
    type: ShipmentsActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAllShipments = (): ShipmentsAction => ({
    type: ShipmentsActionTypes.GET_ALL_SHIPMENTS,
    payload: {},
});

export const shipmentsGetOrder = (orderId: string, returnLabel: Boolean, fullResponse: Boolean): ShipmentsAction => ({
    type: ShipmentsActionTypes.GET_ORDER,
    payload: { orderId, returnLabel, fullResponse },
});

export const shipmentsResetState = (): ShipmentsAction => ({
    type: ShipmentsActionTypes.RESET_STATE,
    payload: {},
});

export const shipmentsCreateManifest = (manifestSpec: any, returnImage: Boolean, fullResponse: Boolean): ShipmentsAction => ({
    type: ShipmentsActionTypes.CREATE_MANIFEST,
    payload: { manifestSpec, returnImage, fullResponse },
});
