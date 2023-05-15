// @flow
import { APICore } from './apiCore';
import config from '../../config';

const api = new APICore();

function getAllShipments(returnLabel: Boolean, fullResponse: Boolean): any {
    const baseUrl = config.SHIPMENTS_URL;
    return api.get(`${baseUrl}`, {}, { headers: { 'return-label' : returnLabel, 'full-response' : fullResponse } });
}

export { getAllShipments };
