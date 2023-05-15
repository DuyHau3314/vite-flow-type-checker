// @flow
import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import ordersSaga from './orders/saga';
import labelSaga from './label/saga';
import quickPrintSaga from './quick-print/saga';
import shipmentsSaga from './shipments/saga';
import manifestsSaga from './manifests/saga';
import integrationsSaga from './integrations/saga';
import editOrderSaga from './edit-order/saga';
import newCsvIntegrationBatchSaga from './new-csv-integration-batch/saga';
import newOrderSaga from './new-order/saga';
import addressBookSaga from './addressbook/saga';
import addressComponentSaga from './address-component/saga';
import manifestSaga from './manifest/saga';

export default function* rootSaga(): any {
    yield all([authSaga(), layoutSaga(), ordersSaga(), labelSaga(), 
        quickPrintSaga(), shipmentsSaga(), integrationsSaga(), newCsvIntegrationBatchSaga(), 
        editOrderSaga(), newOrderSaga(), addressBookSaga(), addressComponentSaga(),
        manifestsSaga(), manifestSaga()
    ]);
}
