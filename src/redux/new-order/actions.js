// @flow
import { NewOrderActionTypes as NewOrderActionTypes } from './constants';

type NewOrderAction = { type: string, payload: {} | string };

export const newOrderApiResponseSuccess = (actionType: string, data: any): NewOrderAction => ({
    type: NewOrderActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const newOrderApiResponseError = (actionType: string, error: string): NewOrderAction => ({
    type: NewOrderActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const newOrderUpdateOrderSpec = (data: any): NewOrderAction => ({
    type: NewOrderActionTypes.UPDATE_ORDER_SPEC,
    payload: { data },
});

export const newOrderGetRates = (orderSpec: any, fullResponse: Boolean): NewOrderAction => ({
    type: NewOrderActionTypes.GET_RATES,
    payload: { orderSpec, fullResponse },
});

export const newOrderCreateOrder = (orderSpec: any, returnLabel: Boolean, fullResponse: Boolean): NewOrderAction => ({
    type: NewOrderActionTypes.CREATE_ORDER,
    payload: { orderSpec, returnLabel, fullResponse },
});

export const newOrderResetState = (): NewOrderAction => ({
    type: NewOrderActionTypes.RESET_STATE,
    payload: {},
});