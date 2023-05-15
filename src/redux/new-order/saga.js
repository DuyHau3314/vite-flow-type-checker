// @flow
import { all, fork, put, takeLatest, call, join } from 'redux-saga/effects';

import {
    getRates as getRatesApi,
    createOrder as createOrderApi
} from '../../helpers/';
import { orderObjectToOrderRequest, orderResponseToOrderObject } from '../../helpers/mappers/order';

import { rateObjectToRateRequest, rateResponseToRateObject } from '../../helpers/mappers/rate';

import { newOrderApiResponseSuccess, newOrderApiResponseError } from './actions';
import { NewOrderActionTypes } from './constants';

function* getRates({ payload: { orderSpec, fullResponse } }) {
    try {
        const ratesRequest = rateObjectToRateRequest(orderSpec);
        const ratesResponse = yield call(getRatesApi, ratesRequest, fullResponse);
        const rates = ratesResponse.data.map(rateResponse => rateResponseToRateObject(rateResponse));
        yield put(newOrderApiResponseSuccess(NewOrderActionTypes.GET_RATES, rates));
    } catch (error) {
        yield put(newOrderApiResponseError(NewOrderActionTypes.GET_RATES, error));
    }
}

function* createOrder({ payload: { orderSpec, returnLabel, fullResponse } }) {
    try {
        const request = orderObjectToOrderRequest(orderSpec);
        const createOrderResponse = yield call(createOrderApi, request, returnLabel, fullResponse);
        yield put(newOrderApiResponseSuccess(NewOrderActionTypes.CREATE_ORDER, createOrderResponse.data.id));
    } catch (error) {
        yield put(newOrderApiResponseError(NewOrderActionTypes.CREATE_ORDER, error));
    }
}

export function* watchGetRates(): any {
    yield takeLatest(NewOrderActionTypes.GET_RATES, getRates);
}

export function* watchCreateOrder(): any {
    yield takeLatest(NewOrderActionTypes.CREATE_ORDER, createOrder);
}

function* newOrderSaga(): any {
    yield all([
        //fork(watchGetAllPrices),
        fork(watchGetRates),
        fork(watchCreateOrder),
    ]);
}

export default newOrderSaga;
