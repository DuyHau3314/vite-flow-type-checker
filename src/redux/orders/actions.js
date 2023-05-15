import { OrdersActionTypes } from './constants';

type OrdersAction = { type: string, payload: {} | string };

export const ordersApiResponseSuccess = (actionType: string, data: any): OrdersAction => ({
    type: OrdersActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const ordersApiResponseError = (actionType: string, error: string): OrdersAction => ({
    type: OrdersActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const ordersGetAllOrders = (returnLabel: Boolean, fullResponse: Boolean): OrdersAction => ({
    type: OrdersActionTypes.GET_ALL_ORDERS,
    payload: { returnLabel, fullResponse },
});

export const ordersCreateLabelForOrder = (orderId: string, fullResponse: Boolean): OrdersAction => ({
    type: OrdersActionTypes.CREATE_LABEL_FOR_ORDER,
    payload: { orderId, fullResponse },
});
export const ordersResetState = (): OrdersAction => ({
    type: OrdersActionTypes.RESET_STATE,
    payload: {},
});