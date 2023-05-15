// @flow
import { APICore } from './apiCore';
import config from '../../config';

const api = new APICore();

function readAllAddresses(): any {
    const baseUrl = config.ADDRESSBOOK_URL;
    console.log('calling api', baseUrl);
    return api.get(`${baseUrl}`, {});
}

function createAddress(addressRequest: any): any {
    const baseUrl = config.ADDRESSBOOK_URL;
    return api.create(`${baseUrl}`, addressRequest);
}

function updateAddress(addressId: string, addressRequest: any): any {
    const baseUrl = config.ADDRESSBOOK_URL + '/' + addressId;
    return api.update(`${baseUrl}`, addressRequest);
}

function readAddress(addressId: string): any {
    const baseUrl = config.ADDRESSBOOK_URL + '/' + addressId;
    return api.get(`${baseUrl}`, {});
}

function deleteAddress(addressId: string): any {
    const baseUrl = config.ADDRESSBOOK_URL + '/' + addressId;
    return api.delete(`${baseUrl}`, {});
}

export { readAllAddresses, createAddress, updateAddress, readAddress, deleteAddress };
