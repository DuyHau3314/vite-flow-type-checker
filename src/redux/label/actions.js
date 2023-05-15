// @flow
import { LabelActionTypes } from './constants';

type LabelAction = { type: string, payload: {} | string };

export const labelApiResponseSuccess = (actionType: string, data: any): LabelAction => ({
    type: LabelActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const labelApiResponseError = (actionType: string, error: string): LabelAction => ({
    type: LabelActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const labelGetOrder = (orderId: string, returnLabel: Boolean, fullResponse: Boolean): LabelAction => ({
    type: LabelActionTypes.GET_ORDER,
    payload: { orderId, returnLabel, fullResponse },
});

export const labelGetRatesForOrder = (orderId: string, fullResponse: Boolean): LabelAction => ({
    type: LabelActionTypes.GET_RATES_FOR_ORDER,
    payload: { orderId, fullResponse },
});

export const labelCreateLabelForOrder = (orderId: string, fullResponse: Boolean): LabelAction => ({
    type: LabelActionTypes.CREATE_LABEL_FOR_ORDER,
    payload: { orderId, fullResponse },
});

export const labelUpdateOrderAndCreateLabel = (orderId: string, updateOrderSpec: any, returnLabel: Boolean, fullResponse: Boolean): LabelAction => ({
    type: LabelActionTypes.UPDATE_ORDER_AND_CREATE_LABEL,
    payload: { orderId, updateOrderSpec, returnLabel, fullResponse },
});
