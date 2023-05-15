// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import Orders from './orders/reducers';
import Label from './label/reducers';
import QuickPrint from './quick-print/reducers';
import Shipments from './shipments/reducers';
import Manifests from './manifests/reducers';
import Integrations from './integrations/reducers';
import EditOrder from './edit-order/reducers';
import NewCsvIntegrationBatch from './new-csv-integration-batch/reducers';
import NewOrder from './new-order/reducers';
import AddressBook from './addressbook/reducers';
import AddressComponentReducers from './address-component/reducers';
import Manifest from './manifest/reducers';

export default (combineReducers({
    Auth,
    Layout,
    Orders,
    Label,
    QuickPrint,
    Shipments,
    Manifests,
    Integrations,
    EditOrder,
    NewCsvIntegrationBatch,
    NewOrder,
    AddressBook,
    AddressComponentReducers,
    Manifest
}): any);
