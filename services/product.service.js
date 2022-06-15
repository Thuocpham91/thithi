import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

export const productService = {
  
    getProduct,
    updateCatogory,
    getCategory,
};

function getProduct() {
    return fetchWrapper.get(`${baseUrl}/product`)
        .then(user => {
            return user;
        });
}

function updateCatogory(data) {
    return fetchWrapper.post(`${baseUrl}/updateCatogory`,data)
        .then(user => {
            return user;
        });
}

function getCategory(data) {
    return fetchWrapper.get(`${baseUrl}/updateCatogory`,data)
        .then(user => {
            return user;
        });
}




