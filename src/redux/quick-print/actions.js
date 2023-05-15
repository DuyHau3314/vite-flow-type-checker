// @flow
import { QuickPrintActionTypes } from './constants';

type QuickPrintAction = { type: string, payload: {} | string };

export const quickPrintApiResponseSuccess = (actionType: string, data: any): QuickPrintAction => ({
    type: QuickPrintActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const quickPrintApiResponseError = (actionType: string, error: string): QuickPrintAction => ({
    type: QuickPrintActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

/*
export const getAllPrices = (priceSpec: PriceRequest): QuickPrintAction => ({
    type: QuickPrintActionTypes.GET_ALL_PRICES,
    payload: { priceSpec },
});

export const initializeGetAllPrices = (): QuickPrintAction => ({
    type: QuickPrintActionTypes.GET_ALL_PRICES_INIT,
    payload: {},
});

export const getAllPricesSuccess = (): QuickPrintAction => ({
    type: QuickPrintActionTypes.GET_ALL_PRICES_SUCCESS,
    payload: {},
label
export const getAllPricesError = (): QuickPrintAction => ({
    type: QuickPrintActionTypes.GET_ALL_PRICES_ERROR,
    payload: {},
});
*/

export const quickPrintUpdateOrderSpec = (data: any, returnLabel: Boolean, fullResponse: Boolean): QuickPrintAction => ({
    type: QuickPrintActionTypes.UPDATE_ORDER_SPEC,
    payload: { data, returnLabel, fullResponse },
});

export const quickPrintGetRates = (orderSpec: any, fullResponse: Boolean): QuickPrintAction => ({
    type: QuickPrintActionTypes.GET_RATES,
    payload: { orderSpec, fullResponse },
});

export const quickPrintCreateLabel = (orderSpec: any, fullResponse: Boolean): QuickPrintAction => ({
    type: QuickPrintActionTypes.CREATE_LABEL,
    payload: { orderSpec, fullResponse },
});

export const quickPrintResetState = (): QuickPrintAction => ({
    type: QuickPrintActionTypes.RESET_STATE,
    payload: {},
});