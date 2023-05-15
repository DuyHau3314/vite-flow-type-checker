// @flow
import { orders } from '../../pages/apps/Ecommerce/Data';
import { getUser, login, logout, signup, forgotPassword, forgotPasswordConfirm } from './auth';
import { getRates, createOrder, updateOrder, updatePatchOrder, getOrder, getAllOrders, getRatesForOrder, createLabelForOrder } from './orders';
import { createLabel } from './labels';
import { getAllManifests, createManifest, getManifest } from './manifests';
import { getAllShipments } from './shipments';
import { getAllIntegrations, createIntegration, createBatch, batchFileUpload } from './integrations';
import { readAllAddresses, createAddress, updateAddress, readAddress, deleteAddress } from './addresses'; 

export { getUser, login, logout, signup, forgotPassword, forgotPasswordConfirm, 
    getRates, createOrder, updateOrder, updatePatchOrder, getOrder, getAllOrders, createLabel, 
    getRatesForOrder, createLabelForOrder, getAllShipments, getAllIntegrations, createIntegration, 
    createBatch, batchFileUpload, readAllAddresses, createAddress, updateAddress, readAddress, 
    deleteAddress, getAllManifests, createManifest, getManifest };
