// @flow
import { EditOrderActionTypes } from './constants';

type EditOrderAction = { type: string, payload: {} | string };

export const editOrderApiResponseSuccess = (actionType: string, data: any): EditOrderAction => ({
    type: EditOrderActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const editOrderApiResponseError = (actionType: string, error: string): EditOrderAction => ({
    type: EditOrderActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const editOrderGetOrder = (orderId: string, returnLabel: Boolean, fullResponse: Boolean): LabelAction => ({
    type: EditOrderActionTypes.GET_ORDER,
    payload: { orderId, returnLabel, fullResponse },
});

export const editOrderUpdateSpec = (order: any): EditOrderAction => ({
    type: EditOrderActionTypes.UPDATE_ORDER_SPEC,
    payload: { order },
});

export const editOrderUpdateOrder = (order: any, fullResponse: Boolean): EditOrderAction => ({
    type: EditOrderActionTypes.UPDATE_ORDER,
    payload: { order, fullResponse },
});

export const editOrderResetState = (): EditOrderAction => ({
    type: EditOrderActionTypes.RESET_STATE,
    payload: {},
});

export const editOrderGetRatesForOrder = (orderId: string, fullResponse: Boolean): LabelAction => ({
    type: EditOrderActionTypes.GET_RATES_FOR_ORDER,
    payload: { orderId, fullResponse },
});
