import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

export const productService = {

    getProduct,
    updateCatogory,
    getCategory,
    putNotification,
    addPromotion,
    getPromotion,
    postOder,
    upaloadFile,
};

function getProduct() {
    return fetchWrapper.get(`${baseUrl}/product`)
        .then(user => {
            return user;
        });
}

function updateCatogory(data) {
    return fetchWrapper.post(`${baseUrl}/updateCatogory`, data)
        .then(user => {
            return user;
        });
}

function getCategory(data) {
    return fetchWrapper.get(`${baseUrl}/updateCatogory`, data)
        .then(user => {
            return user;
        });
}
function putNotification(data) {
    return fetchWrapper.post(`${baseUrl}/notification`, data)
        .then(user => {
            return user;
        });
}

function addPromotion(data) {
    return fetchWrapper.post(`${baseUrl}/promotion`, data)
        .then(user => {
            return user;
        });
}

function getPromotion(data) {
    return fetchWrapper.get(`${baseUrl}/promotion`, data)
        .then(user => {
            return user;
        });
}



function postOder(data) {
    return fetchWrapper.post(`${baseUrl}/sentOder`, data)
        .then(user => {
            return user;
        });
}

function upaloadFile(data) {
    return fetchWrapper.postLile(`${baseUrl}/uploadFile`, data)
        .then(user => {
            return user;
        });
}


