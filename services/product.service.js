import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';
import axios from 'axios';


const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

export const productService = {
    deleteAll,
    addAppKey,
    getAppKey,
    getCategory,
    putNotification,
    addPromotion,
    
    updateNotifi,
};

function getAppKey() {
    return fetchWrapper.get(`${baseUrl}/addappkey`)
        .then(user => {
            return user;
        });
}

function addAppKey(data) {
    return fetchWrapper.post(`${baseUrl}/addappkey`, data)
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







async function  deleteAll(data){
    const user =  await fetchWrapper.post(`${baseUrl}/deleteALL`,data);
    return user;
}

async function  updateNotifi(data){
    const user =  await fetchWrapper.put(`${baseUrl}/notification`,data);
    return user;
}