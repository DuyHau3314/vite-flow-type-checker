// @flow
import { APICore } from './apiCore';
import config from '../../config';

const api = new APICore();

function getAllIntegrations(): any {
    const baseUrl = config.INTEGRATIONS_URL;
    return api.get(`${baseUrl}`, {});
}

function createIntegration(integration: any): any {
    const baseUrl = config.INTEGRATIONS_URL;

    const integrationRequest = {
        name: integration.name,
        type: integration.type,
        active: integration.active,
        params: integration.params
    };

    return api.create(`${baseUrl}`, integrationRequest);
}

function createBatch(integrationId: string, batch: any): any {
    const baseUrl = config.INTEGRATIONS_URL + '/' + integrationId + '/' + 'batches';

    const batchRequest = {
        label: batch.label
    };

    return api.create(`${baseUrl}`, batchRequest);
}

function batchFileUpload(integrationId: string, batchId: any, fileFormData: string): any {
    const baseUrl = config.INTEGRATIONS_URL + '/' + integrationId + '/' + 'batches' + '/' + batchId + '/' + 'file';

    return api.createWithFile(`${baseUrl}`, fileFormData);
}

export { getAllIntegrations, createIntegration, createBatch, batchFileUpload };
