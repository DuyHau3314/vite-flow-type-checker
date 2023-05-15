// @flow
import { APICore } from './apiCore';
import config from '../../config';

const api = new APICore();

function getAllManifests(returnImage: Boolean, fullResponse: Boolean): any {
    const baseUrl = config.MANIFESTS_URL;
    return api.get(`${baseUrl}`, {}, { headers: { 'return-image' : returnImage, 'full-response' : fullResponse } });
}

function createManifest(manifestRequest: any, returnImage: Boolean, fullResponse: Boolean): any {
    const baseUrl = config.MANIFESTS_URL;
    console.log('---', returnImage, fullResponse);
    return api.create(`${baseUrl}`, manifestRequest, { headers: { 'return-image' : returnImage, 'full-response' : fullResponse } });
}

function getManifest(manifestId, returnImage: Boolean, fullResponse: Boolean): any {
    const baseUrl = config.MANIFESTS_URL;
    return api.get(`${baseUrl}/${manifestId}`, {}, { headers: { 'return-image' : returnImage, 'full-response' : fullResponse } });
}

export { getAllManifests, createManifest, getManifest };
