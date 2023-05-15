// @flow
import { APICore } from './apiCore';
import config from '../../config';

const api = new APICore();

//TODO: move to rating.js
function getRates(ratesRequest: any, fullResponse: Boolean): any {
    const baseUrl = config.PRICING_URL;
    return api.create(`${baseUrl}`, ratesRequest, { headers: { 'full-response' : fullResponse } });
}

function createOrder(orderRequest: any, returnLabel: Boolean, fullResponse: Boolean): any {
    const baseUrl = config.ORDERS_URL;
    return api.create(`${baseUrl}`, orderRequest, { headers: { 'return-label' : returnLabel, 'full-response' : fullResponse } });
}

function updateOrder(orderId: string, orderRequest: any, fullResponse: Boolean): any {
    const baseUrl = config.ORDERS_URL + '/' + orderId;
    return api.update(`${baseUrl}`, orderRequest, { headers: { 'full-response' : fullResponse } });
}

function updatePatchOrder(orderId: string, patchOrderRequest: any, fullResponse: Boolean): any {
    const baseUrl = config.ORDERS_URL + '/' + orderId;
    return api.updatePatch(`${baseUrl}`, patchOrderRequest, { headers: { 'full-response' : fullResponse } });
}

function getOrder(orderId: string, returnLabel: Boolean, fullResponse: Boolean): any {
    const baseUrl = config.ORDERS_URL + '/' + orderId;
    return api.get(`${baseUrl}`, {}, { headers: { 'return-label' : returnLabel, 'full-response' : fullResponse } });
}

function getRatesForOrder(orderId: string, fullResponse: Boolean): any {
    const baseUrl = config.ORDERS_URL + '/' + orderId + '/' + 'rates';
    return api.get(`${baseUrl}`, {}, { headers: { 'full-response' : fullResponse } });
}

function createLabelForOrder(orderId: string, fullResponse: Boolean): any {
    const baseUrl = config.ORDERS_URL + '/' + orderId + '/' + 'label';
    return api.get(`${baseUrl}`, {}, { headers: { 'full-response' : fullResponse } });
}

function getAllOrders(returnLabel: Boolean, fullResponse: Boolean): any {
    const baseUrl = config.ORDERS_URL;
    console.log(returnLabel, fullResponse);
    return api.get(`${baseUrl}`, {}, { headers: { 'return-label' : returnLabel, 'full-response' : fullResponse } });
}

export { getRates, createOrder, updateOrder, updatePatchOrder, getOrder, getAllOrders, getRatesForOrder, createLabelForOrder };
