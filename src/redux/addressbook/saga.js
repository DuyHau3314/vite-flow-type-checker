import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import { readAllAddresses, createAddress, readAddress, updateAddress, deleteAddress } from '../../helpers';
import { addressBookApiResponseSuccess, addressBookApiResponseError } from './actions';
import { AddressBookActionTypes } from './constants';
import { addressBookEntryResponseToAddressBookEntryObject, addressBookEntryObjectToAddressBookEntryRequest } from '../../helpers/mappers/addressbook';

function* readAllAddressesSaga() {
    try {
        const response = yield call(readAllAddresses);
        const addressEntries = response.data.map(addressResponse => addressBookEntryResponseToAddressBookEntryObject(addressResponse));
        yield put(addressBookApiResponseSuccess(AddressBookActionTypes.READ_ALL_ADDRESSES_REQUEST, addressEntries));
    } catch (error) {
        yield put(addressBookApiResponseError(AddressBookActionTypes.READ_ALL_ADDRESSES_REQUEST, error));
    }
}

function* createAddressSaga({ payload: { address } }) {
    try {
        const addressRequest = addressBookEntryObjectToAddressBookEntryRequest(address);
        const response = yield call(createAddress, addressRequest);
        const addressResponse = addressBookEntryResponseToAddressBookEntryObject(response);
        yield put(addressBookApiResponseSuccess(AddressBookActionTypes.CREATE_ADDRESS_REQUEST, addressResponse));
    } catch (error) {
        yield put(addressBookApiResponseError(AddressBookActionTypes.CREATE_ADDRESS_REQUEST, error));
    }
}

function* readAddressSaga({ payload: { addressId } }) {
    try {
        const response = yield call(readAddress, addressId);
        yield put(addressBookApiResponseSuccess(AddressBookActionTypes.READ_ADDRESS_REQUEST, response));
    } catch (error) {
        yield put(addressBookApiResponseError(AddressBookActionTypes.READ_ADDRESS_REQUEST, error));
    }
}

function* updateAddressSaga({ payload: { addressId, address } }) {
    try {
        const addressRequest = addressBookEntryObjectToAddressBookEntryRequest(address);
        console.log('updating', addressId, addressRequest);
        const response = yield call(updateAddress, addressId, addressRequest);
        console.log('updated', response);
        const addressResponse = addressBookEntryResponseToAddressBookEntryObject(response);
        yield put(addressBookApiResponseSuccess(AddressBookActionTypes.UPDATE_ADDRESS_REQUEST, addressResponse));
    } catch (error) {
        yield put(addressBookApiResponseError(AddressBookActionTypes.UPDATE_ADDRESS_REQUEST, error));
    }
}

function* deleteAddressSaga({ payload: { addressId } }) {
    try {
        // response should be HTTP success with empty body
        console.log('deleting', addressId);
        const response = yield call(deleteAddress, addressId);
        yield put(addressBookApiResponseSuccess(AddressBookActionTypes.DELETE_ADDRESS_REQUEST, response));
    } catch (error) {
        yield put(addressBookApiResponseError(AddressBookActionTypes.DELETE_ADDRESS_REQUEST, error));
    }
}

export function* watchReadAllAddressesSaga(): any {
    yield takeLatest(AddressBookActionTypes.READ_ALL_ADDRESSES_REQUEST, readAllAddressesSaga);
}

export function* watchCreateAddressSaga(): any {
    yield takeLatest(AddressBookActionTypes.CREATE_ADDRESS_REQUEST, createAddressSaga);
}

export function* watchReadAddressSaga(): any {
    yield takeLatest(AddressBookActionTypes.READ_ADDRESS_REQUEST, readAddressSaga);
}

export function* watchUpdateAddressSaga(): any {
    yield takeLatest(AddressBookActionTypes.UPDATE_ADDRESS_REQUEST, updateAddressSaga);
}

export function* watchDeleteAddressSaga(): any {
    yield takeLatest(AddressBookActionTypes.DELETE_ADDRESS_REQUEST, deleteAddressSaga);
}

function* addressBookSaga() {
    yield all([
        fork(watchReadAllAddressesSaga),
        fork(watchCreateAddressSaga),
        fork(watchReadAddressSaga),
        fork(watchUpdateAddressSaga),
        fork(watchDeleteAddressSaga)
    ]);
}

export default addressBookSaga;
