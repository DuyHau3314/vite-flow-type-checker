// @flow
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import { manifestResponseToManifestObject } from '../../helpers/mappers/manifest';

import {
    getManifest as getManifestApi
} from '../../helpers';

import { manifestApiResponseSuccess, manifestApiResponseError } from './actions';
import { ManifestActionTypes } from './constants';

function* manifestGetManifest({payload: {manifestId, returnImage, fullResponse}}) {
    try {
        const getManifestResponse = yield call(getManifestApi, manifestId, returnImage, fullResponse);
        const manifest = manifestResponseToManifestObject(getManifestResponse.data);
        yield put(manifestApiResponseSuccess(ManifestActionTypes.GET_MANIFEST, manifest));
    } catch (error) {
        yield put(manifestApiResponseError(ManifestActionTypes.GET_MANIFEST, error));
    }
}

export function* watchManifestGetManifest(): any {
    yield takeLatest(ManifestActionTypes.GET_MANIFEST, manifestGetManifest);
}

function* manifestSaga(): any {
    yield all([
        fork(watchManifestGetManifest)
    ]);
}

export default manifestSaga;
