// @flow
import { APICore } from './apiCore';
import config from '../../config';

const api = new APICore();

function getUser(params: any): any {
    const baseUrl = config.USERS_URL;
    return api.get(`${baseUrl}/${params.userId}`, {});
}

// account
function login(params: any): any {
    const baseUrl = `${config.USERS_URL}/login`;
    return api.create(`${baseUrl}`, params);
}

function logout(): any {
    const baseUrl = '/logout/';
    return api.create(`${baseUrl}`, {});
}

function signup(params: any): any {
    const baseUrl = config.USERS_URL;
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: any): any {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

function forgotPasswordConfirm(params: any): any {
    const baseUrl = '/password/reset/confirm/';
    return api.create(`${baseUrl}`, params);
}

export { getUser, login, logout, signup, forgotPassword, forgotPasswordConfirm };
