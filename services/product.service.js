import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

export const productService = {
  
    getProduct,
};

function getProduct() {
    return fetchWrapper.get(`${baseUrl}/product`)
        .then(user => {
            return user;
        });
}

