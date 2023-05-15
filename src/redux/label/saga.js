// @flow
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import { updateOrderObjectToUpdateOrderRequest, orderResponseToOrderObject } from '../../helpers/mappers/order';

import {
    getOrder as getOrderApi,
    getRatesForOrder as getRatesForOrderApi,
    createLabelForOrder as createLabelForOrderApi,
    updateOrder as updateOrderApi,
    updatePatchOrder as updatePatchOrderApi
} from '../../helpers/';

import { labelApiResponseSuccess, labelApiResponseError } from './actions';
import { LabelActionTypes } from './constants';
import { rateResponseToRateObject } from '../../helpers/mappers/rate';

function* labelGetOrder({ payload: { orderId, returnLabel, fullResponse } }) {
    try {
        const getOrderResponse = yield call(getOrderApi, orderId, returnLabel, fullResponse);
        const order = orderResponseToOrderObject(getOrderResponse.data);
        yield put(labelApiResponseSuccess(LabelActionTypes.GET_ORDER, order));
    } catch (error) {
        yield put(labelApiResponseError(LabelActionTypes.GET_ORDER, error));
    }
}

function* labelGetRatesForOrder({ payload: { orderId, fullResponse } }) {
    try {
        const getRatesForOrderResponse = yield call(getRatesForOrderApi, orderId, fullResponse);
        const rates = getRatesForOrderResponse.data.map(rateResponse => rateResponseToRateObject(rateResponse));
        yield put(labelApiResponseSuccess(LabelActionTypes.GET_RATES_FOR_ORDER, rates));
    } catch (error) {
        yield put(labelApiResponseError(LabelActionTypes.GET_RATES_FOR_ORDER, error));
    }
}

function* labelCreateLabelForOrder({ payload: { orderId, fullResponse } }) {
    try {
        const createLabelForOrderResponse = yield call(createLabelForOrderApi, orderId, fullResponse);
        yield put(labelApiResponseSuccess(LabelActionTypes.CREATE_LABEL_FOR_ORDER, createLabelForOrderResponse.data));
    } catch (error) {
        yield put(labelApiResponseError(LabelActionTypes.CREATE_LABEL_FOR_ORDER, error));
    }
}

function* labelUpdateOrderAndCreateLabel({ payload: { orderId, updateOrderSpec, returnLabel, fullResponse } }) {
    try {
        const request = updateOrderObjectToUpdateOrderRequest(updateOrderSpec);
        const patchOrderResponse = yield call(updatePatchOrderApi, orderId, updateOrderSpec, fullResponse);
        //TODO: handle the update response
        const createLabelForOrderResponse = yield call(createLabelForOrderApi, orderId, returnLabel, fullResponse);
        const updatedOrder = orderResponseToOrderObject(createLabelForOrderResponse.data);
        yield put(labelApiResponseSuccess(LabelActionTypes.UPDATE_ORDER_AND_CREATE_LABEL, updatedOrder));
    } catch (error) {
        yield put(labelApiResponseError(LabelActionTypes.UPDATE_ORDER_AND_CREATE_LABEL, error));
    }
}

export function* watchLabelGetOrder(): any {
    yield takeLatest(LabelActionTypes.GET_ORDER, labelGetOrder);
}

export function* watchLabelGetRatesForOrder(): any {
    yield takeLatest(LabelActionTypes.GET_RATES_FOR_ORDER, labelGetRatesForOrder);
}

export function* watchLabelCreateLabelForOrder(): any {
    yield takeLatest(LabelActionTypes.CREATE_LABEL_FOR_ORDER, labelCreateLabelForOrder);
}

export function* watchLabelUpdateOrderAndCreateLabel(): any {
    yield takeLatest(LabelActionTypes.UPDATE_ORDER_AND_CREATE_LABEL, labelUpdateOrderAndCreateLabel);
}

function* labelSaga(): any {
    yield all([
        fork(watchLabelGetOrder),
        fork(watchLabelGetRatesForOrder),
        fork(watchLabelCreateLabelForOrder),
        fork(watchLabelUpdateOrderAndCreateLabel)
    ]);
}

export default labelSaga;
