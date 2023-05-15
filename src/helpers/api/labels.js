// @flow
import { APICore } from './apiCore';
import config from '../../config';

const api = new APICore();

function createLabel(order: any, fullResponse: Boolean): any {
    const baseUrl = config.LABELS_URL;
    return api.create(`${baseUrl}`, order, { headers: { 'full-response' : fullResponse } });
}

export { createLabel };
