// @flow
import { all, fork, put, takeLatest, call, join } from 'redux-saga/effects';

import {
    //getPrice as getPriceApi,
    getRates as getRatesApi,
    createLabel as createLabelApi,
    createOrder as createOrderApi
} from '../../helpers/';
import { orderObjectToOrderRequest, orderResponseToOrderObject } from '../../helpers/mappers/order';

import { rateObjectToRateRequest, rateResponseToRateObject } from '../../helpers/mappers/rate';

//import { initializeGetAllPrices, getAllPricesSuccess, getAllPricesError } from './actions';
import { quickPrintApiResponseSuccess, quickPrintApiResponseError } from './actions';
import { QuickPrintActionTypes } from './constants';

//NOTE: this is old code when the API returned a single price and the UI requested
//NOTE: multiple prices in parallel. I left it here because it was hard to figure out
//NOTE: and I don't want to lose the code

/*
const carrierServices = [
    //    { carrier: "usps", service: "FirstClass" },
    { carrier: "usps", service: "PriorityMail" },
    { carrier: "usps", service: "PriorityMailExpress" }
];

function* getPrice(priceSpec) {
    try {
        const priceResponse = yield call(getPriceApi, priceSpec);
        yield put(quickPrintApiResponseSuccess(QuickPrintActionTypes.GET_PRICE, priceResponse.data));
    } catch (error) {
        yield put(quickPrintApiResponseError(QuickPrintActionTypes.GET_PRICE, error));
    }
}

// get prices for all carriers and services in parallel
function* getAllPrices({ payload: { priceSpec } }) {
    try {
        // new get-all-prices request is starting
        yield put(initializeGetAllPrices(QuickPrintActionTypes.GET_ALL_PRICES_INIT));

        // create the requests for each carrier & service
        const priceSpecRequests = carrierServices.map(carrierService => ({ ...priceSpec, ...carrierService }));

        let tasks = [];
        for (const priceSpecRequest of priceSpecRequests) {
            tasks.push(yield fork(getPrice, priceSpecRequest));
        }

        // do nothing with the results; will silently swallow errors
        yield join(tasks);

        yield put(getAllPricesSuccess(QuickPrintActionTypes.GET_ALL_PRICES_SUCCESS));
    } catch (error) {
        yield put(getAllPricesError(QuickPrintActionTypes.GET_ALL_PRICES_ERROR));
    }
}

export function* watchGetAllPrices(): any {
    yield takeLatest(QuickPrintActionTypes.GET_ALL_PRICES, getAllPrices);
}
*/

function* getRates({ payload: { orderSpec, fullResponse } }) {
    try {
        console.log('will call getRatesApi');
        const ratesRequest = rateObjectToRateRequest(orderSpec);
        console.log('ratesRequest', ratesRequest);
        const ratesResponse = yield call(getRatesApi, ratesRequest, fullResponse);
        console.log('ratesResponse', ratesResponse);
        const rates = ratesResponse.data.map(rateResponse => rateResponseToRateObject(rateResponse));
        console.log('rates', rates);
        yield put(quickPrintApiResponseSuccess(QuickPrintActionTypes.GET_RATES, rates));
    } catch (error) {
        console.log('error', error);
        yield put(quickPrintApiResponseError(QuickPrintActionTypes.GET_RATES, error));
    }
}

function* createLabel({ payload: { orderSpec, fullResponse } }) {
    try {
        const request = orderObjectToOrderRequest(orderSpec);
        const createLabelResponse = yield call(createLabelApi, request, /* this param does nothing*/ true, fullResponse);
        yield put(quickPrintApiResponseSuccess(QuickPrintActionTypes.CREATE_LABEL, createLabelResponse.data.id));
    } catch (error) {
        yield put(quickPrintApiResponseError(QuickPrintActionTypes.CREATE_LABEL, error));
    }
}

export function* watchGetRates(): any {
    yield takeLatest(QuickPrintActionTypes.GET_RATES, getRates);
}

export function* watchCreateLabel(): any {
    yield takeLatest(QuickPrintActionTypes.CREATE_LABEL, createLabel);
}

function* quickPrintSaga(): any {
    yield all([
        //fork(watchGetAllPrices),
        fork(watchGetRates),
        fork(watchCreateLabel),
    ]);
}

export default quickPrintSaga;
