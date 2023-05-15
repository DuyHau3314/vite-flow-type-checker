// @flow
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import { orderResponseToOrderObject } from '../../helpers/mappers/order';

import {
    getAllOrders as getAllOrdersApi,
    createLabelForOrder as createLabelForOrderApi
} from '../../helpers/';

import { ordersApiResponseSuccess, ordersApiResponseError } from './actions';
import { OrdersActionTypes } from './constants';

function* ordersGetAllOrders({ payload: { returnLabel, fullResponse } }) {
    try {
        const getAllOrdersResponse = yield call(getAllOrdersApi, returnLabel, fullResponse);
        const orders = getAllOrdersResponse.data.map(orderResponse => orderResponseToOrderObject(orderResponse));
        yield put(ordersApiResponseSuccess(OrdersActionTypes.GET_ALL_ORDERS, orders));
    } catch (error) {
        yield put(ordersApiResponseError(OrdersActionTypes.GET_ALL_ORDERS, error));
    }
}

function* ordersCreateLabelForOrder({ payload: { orderId, fullResponse } }) {
    try {
        const createLabelForOrderResponse = yield call(createLabelForOrderApi, orderId, /* this param does nothing */ true, fullResponse);
        console.log('received respone', createLabelForOrderApi);
        yield put(ordersApiResponseSuccess(OrdersActionTypes.CREATE_LABEL_FOR_ORDER, createLabelForOrderResponse.data));
    } catch (error) {
        yield put(ordersApiResponseError(OrdersActionTypes.CREATE_LABEL_FOR_ORDER, error));
    }
}

export function* watchOrdersGetAllOrders(): any {
    yield takeLatest(OrdersActionTypes.GET_ALL_ORDERS, ordersGetAllOrders);
}

export function* watchOrdersCreateLabelForOrder(): any {
    yield takeLatest(OrdersActionTypes.CREATE_LABEL_FOR_ORDER, ordersCreateLabelForOrder);
}

function* ordersSaga(): any {
    yield all([
        fork(watchOrdersGetAllOrders),
        fork(watchOrdersCreateLabelForOrder)
    ]);
}

export default ordersSaga;
