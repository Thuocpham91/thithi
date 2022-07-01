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
    changeGift,
    getGift,
    updateGift,
    updatePromotion,
    updateDataVT,
    changePoin,
    getDataUserchangGift,
    getPromotionUser,
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

async function upaloadFile(data) {
    return fetchWrapper.postLile(`${baseUrl}/uploadFile`, data)
        .then(user => {
            return user;
        });
}


async function changeGift(data) {
    return fetchWrapper.post(`${baseUrl}/changeGift`, data)
        .then(user => {
            return user;
        });
}

async function getGift(data) {
    return fetchWrapper.get(`${baseUrl}/changeGift`, data)
        .then(user => {
            return user;
        });
}

async function updateGift(data) {
    return fetchWrapper.post(`${baseUrl}/updateGift`, data)
        .then(user => {
            return user;
        });
}
async function updatePromotion(data) {
    return fetchWrapper.post(`${baseUrl}/updatepromotion `, data)
        .then(user => {
            return user;
        });
}

async function updateDataVT(data) {
    return fetchWrapper.post(`${baseUrl}/updateDataVT `, data)
        .then(user => {
            return user;
        });
}


async function changePoin(data) {
    const user = await fetchWrapper.post(`${baseUrl}/changePoin `, data);
    return user;
}

async function getDataUserchangGift(data) {
    const user = await fetchWrapper.get(`${baseUrl}/getUserchangeGift `, data);
    return user;
}



async function getPromotionUser(data) {
    const user = await fetchWrapper.post(`${baseUrl}/promotionUser `, data);
    return user;
}

