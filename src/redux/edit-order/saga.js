// @flow
import { all, fork, put, takeLatest, call, join } from 'redux-saga/effects';

import {
    getRatesForOrder as getRatesForOrderApi,
    getOrder as getOrderApi,
    updateOrder as updateOrderApi,
} from '../../helpers';
import { orderObjectToOrderRequest, orderResponseToOrderObject } from '../../helpers/mappers/order';
import { rateResponseToRateObject } from '../../helpers/mappers/rate'; 

import { editOrderApiResponseSuccess, editOrderApiResponseError } from './actions';
import { EditOrderActionTypes } from './constants';

function* editOrderGetOrder({ payload: { orderId, returnLabel, fullResponse } }) {
    try {
        const getOrderResponse = yield call(getOrderApi, orderId, returnLabel, fullResponse);
        const order = orderResponseToOrderObject(getOrderResponse.data);
        yield put(editOrderApiResponseSuccess(EditOrderActionTypes.GET_ORDER, order));
    } catch (error) {
        yield put(editOrderApiResponseError(EditOrderActionTypes.GET_ORDER, error));
    }
}

function* editOrderGetRatesForOrder({ payload: { orderId, fullResponse } }) {
    try {
        const getRatesForOrderResponse = yield call(getRatesForOrderApi, orderId, fullResponse);
        const rates = getRatesForOrderResponse.data.map(rateResponse => rateResponseToRateObject(rateResponse));
        yield put(editOrderApiResponseSuccess(EditOrderActionTypes.GET_RATES_FOR_ORDER, rates));
    } catch (error) {
        yield put(editOrderApiResponseError(EditOrderActionTypes.GET_RATES_FOR_ORDER, error));
    }
}

function* editOrderUpdateOrder({ payload: { order, fullResponse } }) {
    try {
        const orderRequest = orderObjectToOrderRequest(order);
        const updateOrderResponse = yield call(updateOrderApi, orderRequest, fullResponse);
        yield put(editOrderApiResponseSuccess(EditOrderActionTypes.UPDATE_ORDER, updateOrderResponse.data));
    } catch (error) {
        yield put(editOrderApiResponseError(EditOrderActionTypes.UPDATE_ORDER, error));
    }
}

export function* watchEditOrderGetOrder(): any {
    yield takeLatest(EditOrderActionTypes.GET_ORDER, editOrderGetOrder);
}

export function* watchEditOrderGetRatesForOrder(): any {
    yield takeLatest(EditOrderActionTypes.GET_RATES_FOR_ORDER, editOrderGetRatesForOrder);
}

export function* watchEditOrderUpdateOrder(): any {
    yield takeLatest(EditOrderActionTypes.UPDATE_ORDER, editOrderUpdateOrder);
}

function* editOrderSaga(): any {
    yield all([
        fork(watchEditOrderGetOrder),
        fork(watchEditOrderGetRatesForOrder),
        fork(watchEditOrderUpdateOrder),
    ]);
}

export default editOrderSaga;
