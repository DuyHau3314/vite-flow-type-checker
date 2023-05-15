// @flow
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getUser as getUserApi,
    login as loginApi,
    logout as logoutApi,
    signup as signupApi,
    forgotPassword as forgotPasswordApi,
    forgotPasswordConfirm,
} from '../../helpers/';

import { APICore, setAuthorization } from '../../helpers/api/apiCore';
import { authApiResponseSuccess, authApiResponseError } from './actions';
import { AuthActionTypes } from './constants';

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - email and password
 */
function* login({ payload: { email, password } }) {
    try {
        const loginResponse = yield call(loginApi, { email, password });
        const token = loginResponse.headers.token;
        const userId = loginResponse.headers.id;
        setAuthorization(token);

        const userResponse = yield call(getUserApi, { userId });

        const user = {
            id: userId,
            email: userResponse.data.email,
            role: 'Admin',
            token: token,
            firstName: userResponse.data.firstName,
            middleName: userResponse.data.middleName,
            lastName: userResponse.data.lastName,
            companyName: userResponse.data.companyName,
            line1: userResponse.data.line1,
            line2: userResponse.data.line2,
            line3: userResponse.data.line3,
            city: userResponse.data.city,
            stateProvince: userResponse.data.stateProvince,
            postalCode: userResponse.data.postalCode
        };
        console.log(token);
        console.log(userId);
        console.log(user);
        
        api.setLoggedInUser(user);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

/**
 * Logout the user
 */
function* logout() {
    try {
        yield call(logoutApi);
        api.setLoggedInUser(null);
        setAuthorization(null);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

function* signup({ payload: { email, password } }) {
    try {
        const registerResponse = yield call(signupApi, { email, password });
        // const user = response.data;
        // api.setLoggedInUser(user);
        // setAuthorization(user['token']);
        // yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));

        const loginResponse = yield call(loginApi, { email, password });
        const token = loginResponse.headers.token;
        const userId = loginResponse.headers.id;
        setAuthorization(token);

        const userResponse = yield call(getUserApi, { userId });

        const user = {
            id: userId,
            email: userResponse.data.email,
            role: 'Admin',
            token: token,
            firstName: userResponse.data.firstName,
            middleName: userResponse.data.middleName,
            lastName: userResponse.data.lastName,
            companyName: userResponse.data.companyName,
            line1: userResponse.data.line1,
            line2: userResponse.data.line2,
            line3: userResponse.data.line3,
            city: userResponse.data.city,
            stateProvince: userResponse.data.stateProvince,
            postalCode: userResponse.data.postalCode
        };
        console.log(token);
        console.log(userId);
        console.log(user);
        
        api.setLoggedInUser(user);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

function* forgotPassword({ payload: { username } }) {
    try {
        const response = yield call(forgotPasswordApi, { username });
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
    }
}

function* forgotPasswordChange({ payload: { data } }) {
    try {
        const response = yield call(forgotPasswordConfirm, data);
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD_CHANGE, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD_CHANGE, error));
    }
}

export function* watchLoginUser(): any {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout(): any {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchForgotPasswordChange(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD_CHANGE, forgotPasswordChange);
}

function* authSaga(): any {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchForgotPassword),
        fork(watchForgotPasswordChange),
    ]);
}

export default authSaga;
