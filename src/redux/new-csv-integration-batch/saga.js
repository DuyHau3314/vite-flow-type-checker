// @flow
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    createIntegration as createIntegrationApi,
    createBatch as createBatchApi,
    batchFileUpload as batchFileUploadApi
} from '../../helpers/';

import { newCsvIntegrationBatchApiResponseSuccess, newCsvIntegrationBatchApiResponseError } from './actions';
import { NewCsvIntegrationBatchActionTypes } from './constants';

function* createCsvIntegrationWithBatchContent({ payload: { integration, batch, fileFormData } }) {
    try {
        const createIntegrationResponse = yield call(createIntegrationApi, integration);
        const integrationId = createIntegrationResponse.data.id;
        const createBatchResponse = yield call(createBatchApi, integrationId, batch);
        const batchId = createBatchResponse.data.id;
        const batchFileUploadResponse = yield call(batchFileUploadApi, integrationId, batchId, fileFormData);
        yield put(newCsvIntegrationBatchApiResponseSuccess(NewCsvIntegrationBatchActionTypes.CREATE_CSV_INTEGRATION_BATCH, batchFileUploadResponse.data));        
    } catch (error) {
        yield put(newCsvIntegrationBatchApiResponseError(NewCsvIntegrationBatchActionTypes.CREATE_CSV_INTEGRATION_BATCH, error));
    }
}

export function* watchCreateCsvIntegrationWithBatchContent(): any {
    yield takeLatest(NewCsvIntegrationBatchActionTypes.CREATE_CSV_INTEGRATION_BATCH, createCsvIntegrationWithBatchContent);
}

function* newCsvIntegrationBatchSaga(): any {
    yield all([
        fork(watchCreateCsvIntegrationWithBatchContent)
    ]);
}

export default newCsvIntegrationBatchSaga;
