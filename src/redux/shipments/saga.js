// @flow
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    getAllShipments as getAllShipmentsApi,
    getOrder as getOrderApi,
    createManifest as createManifestApi
} from '../../helpers/';

import { shipmentsApiResponseSuccess, shipmentsApiResponseError } from './actions';
import { ShipmentsActionTypes } from './constants';
import { orderResponseToOrderObject } from '../../helpers/mappers/order';
import { manifestObjectToManifestRequest } from '../../helpers/mappers/manifest';

function* getAllShipments() {
    try {
        const getAllShipmentsResponse = yield call(getAllShipmentsApi, {});
        const shipments = getAllShipmentsResponse.data.map(shipmentResponse => orderResponseToOrderObject(shipmentResponse));
        yield put(shipmentsApiResponseSuccess(ShipmentsActionTypes.GET_ALL_SHIPMENTS, shipments));
    } catch (error) {
        yield put(shipmentsApiResponseError(ShipmentsActionTypes.GET_ALL_SHIPMENTS, error));
    }
}

function* shipmentsGetOrder({ payload: { orderId, returnLabel, fullResponse } }) {
    try {
        const getOrderResponse = yield call(getOrderApi, orderId, returnLabel, fullResponse);
        const order = orderResponseToOrderObject(getOrderResponse.data);
        yield put(shipmentsApiResponseSuccess(ShipmentsActionTypes.GET_ORDER, order));
    } catch (error) {
        yield put(shipmentsApiResponseError(ShipmentsActionTypes.GET_ORDER, error));
    }
}

function* shipmentsCreateManifest({ payload: { manifestSpec, returnImage, fullResponse } }) {
    try {
        const request = manifestObjectToManifestRequest(manifestSpec);
        console.log(request);
        const createManifestResponse = yield call(createManifestApi, request, returnImage, fullResponse);
        console.log(createManifestResponse);
        yield put(shipmentsApiResponseSuccess(ShipmentsActionTypes.CREATE_MANIFEST, createManifestResponse.data));
    } catch (error) {
        yield put(shipmentsApiResponseError(ShipmentsActionTypes.CREATE_MANIFEST, error));
    }
}

export function* watchGetAllShipments(): any {
    yield takeLatest(ShipmentsActionTypes.GET_ALL_SHIPMENTS, getAllShipments);
}

export function* watchShipmentsGetOrder(): any {
    yield takeLatest(ShipmentsActionTypes.GET_ORDER, shipmentsGetOrder);
}

export function* watchShipmentsCreateManifest(): any {
    yield takeLatest(ShipmentsActionTypes.CREATE_MANIFEST, shipmentsCreateManifest);
}

function* shipmentsLogSaga(): any {
    yield all([
        fork(watchGetAllShipments),
        fork(watchShipmentsGetOrder),
        fork(watchShipmentsCreateManifest)
    ]);
}

export default shipmentsLogSaga;
