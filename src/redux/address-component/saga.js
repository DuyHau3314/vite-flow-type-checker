import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import { readAllAddresses } from '../../helpers';
import { addressComponentApiResponseSuccess, addressComponentApiResponseError } from './actions';
import { AddressComponentActionTypes } from './constants';
import { addressBookEntryResponseToAddressBookEntryObject } from '../../helpers/mappers/addressbook';

function* readAllAddressesSaga() {
    try {
        const response = yield call(readAllAddresses);
        const addressEntries = response.data.map(addressResponse => addressBookEntryResponseToAddressBookEntryObject(addressResponse));
        yield put(addressComponentApiResponseSuccess(AddressComponentActionTypes.READ_ALL_ADDRESSES_REQUEST, addressEntries));
    } catch (error) {
        yield put(addressComponentApiResponseError(AddressComponentActionTypes.READ_ALL_ADDRESSES_REQUEST, error));
    }
}

export function* watchReadAllAddressesSaga(): any {
    yield takeLatest(AddressComponentActionTypes.READ_ALL_ADDRESSES_REQUEST, readAllAddressesSaga);
}

function* addressComponentSaga() {
    yield all([
        fork(watchReadAllAddressesSaga),
    ]);
}

export default addressComponentSaga;
