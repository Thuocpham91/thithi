import getConfig from 'next/config';

import { userService } from '../services';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    posth,
    put,
    getVT,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    try {
        return fetch(url, requestOptions).then(handleResponse);

    } catch (erro) {

        return null
    }

}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function posth(url, body) {
    console.log("bodyposth", body)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function getVT(url) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(url, requestOptions).then(handleResponse);
}


function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    console.log(user)
    // console.log(user)
    // const isLoggedIn = user && user.token;
    // const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    // if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user ? user.token ? user.token : "ádadsda" : "ádsadasd"}` };
    // } else {
    // return {};
    // }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
    });
}