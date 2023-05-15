// @flow
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import { manifestResponseToManifestObject } from '../../helpers/mappers/manifest';

import {
    getAllManifests as getAllManifestsApi,
    createManifest as createManifestApi,
    getManifest as getManifestApi
} from '../../helpers';

import { manifestsApiResponseSuccess, manifestsApiResponseError } from './actions';
import { ManifestsActionTypes } from './constants';

function* manifestsGetAllManifests({ payload: { returnImage, fullResponse } }) {
    try {
        const getAllManifestsResponse = yield call(getAllManifestsApi, returnImage, fullResponse);
        const manifests = getAllManifestsResponse.data.map(manifestResponse => manifestResponseToManifestObject(manifestResponse));
        yield put(manifestsApiResponseSuccess(ManifestsActionTypes.GET_ALL_MANIFESTS, manifests));
    } catch (error) {
        yield put(manifestsApiResponseError(ManifestsActionTypes.GET_ALL_MANIFESTS, error));
    }
}

function* manifestsCreateManifestForAllUnmanifested({ payload: { returnImage, fullResponse } }) {
    try {
        console.log('createManifestForAllUnmanifested', returnImage, fullResponse);
        const createManifestResponse = yield call(createManifestApi, {}, returnImage, fullResponse);
        console.log('received respone', createManifestResponse);
        yield put(manifestsApiResponseSuccess(ManifestsActionTypes.CREATE_MANIFEST_FOR_ALL_UNMANIFESTED, createManifestResponse.data));
    } catch (error) {
        yield put(manifestsApiResponseError(ManifestsActionTypes.CREATE_MANIFEST_FOR_ALL_UNMANIFESTED, error));
    }
}

function* manifestsGetManifest({payload: {manifestId, returnImage, fullResponse}}) {
    try {
        const getManifestResponse = yield call(getManifestApi, manifestId, returnImage, fullResponse);
        const manifest = manifestResponseToManifestObject(getManifestResponse.data);
        yield put(manifestsApiResponseSuccess(ManifestsActionTypes.GET_MANIFEST, manifest));
    } catch (error) {
        yield put(manifestsApiResponseError(ManifestsActionTypes.GET_MANIFEST, error));
    }
}

export function* watchManifestsGetAllManifests(): any {
    yield takeLatest(ManifestsActionTypes.GET_ALL_MANIFESTS, manifestsGetAllManifests);
}

export function* watchManifestsCreateManifestForAllUnmanifested(): any {
    yield takeLatest(ManifestsActionTypes.CREATE_MANIFEST_FOR_ALL_UNMANIFESTED, manifestsCreateManifestForAllUnmanifested);
}

export function* watchManifestsGetManifest(): any {
    yield takeLatest(ManifestsActionTypes.GET_MANIFEST, manifestsGetManifest);
}

function* manifestsSaga(): any {
    yield all([
        fork(watchManifestsGetAllManifests),
        fork(watchManifestsCreateManifestForAllUnmanifested),
        fork(watchManifestsGetManifest)
    ]);
}

export default manifestsSaga;
