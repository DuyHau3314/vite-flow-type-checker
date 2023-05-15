// @flow
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    getAllIntegrations as getAllIntegrationsApi,
    createIntegration as createIntegrationApi
} from '../../helpers/';

import { integrationsApiResponseSuccess, integrationsApiResponseError } from './actions';
import { IntegrationsActionTypes } from './constants';

function* getAllIntegrations() {
    try {
        const getAllIntegrationsResponse = yield call(getAllIntegrationsApi, {});
        yield put(integrationsApiResponseSuccess(IntegrationsActionTypes.GET_ALL_INTEGRATIONS, getAllIntegrationsResponse.data));
    } catch (error) {
        yield put(integrationsApiResponseError(IntegrationsActionTypes.GET_ALL_INTEGRATIONS, error));
    }
}

export function* watchGetAllIntegrations(): any {
    yield takeLatest(IntegrationsActionTypes.GET_ALL_INTEGRATIONS, getAllIntegrations);
}

function* integrationsSaga(): any {
    yield all([
        fork(watchGetAllIntegrations)
    ]);
}

export default integrationsSaga;
