import axios from 'axios'
import { insert_Acountvietteel, update_Acountvietteel, select_Acountvietteel } from '../../../../querySql/queryAccountViettell';


export const apiViettel = {
    logInViettel,
    getTokenchanel,
    getListproduct,

};



async function logInViettel() {

    try {
        const url = "https://partner.viettelsale.com/viettelsale/login";
        var config = {
            headers: { 'Content-Type': 'application/json' },
            responseType: 'json'
        };
        const data = {
            "Username": process.env.USER_NAME_VIETTEL,
            "Password": process.env.PASSWORD_VIETTEL,
        }
        const rp = await axios.post(url, data, config);

        const dt = await select_Acountvietteel(1);
        if (dt.length == 0) {
            insert_Acountvietteel("0982288550", rp.data.data.access_token, "no pass", rp.data.data.access_token_expired_at);
        } else {
            update_Acountvietteel(rp.data.data.access_token, rp.data.data.access_token_expired_at);
        }
        return rp.data.data ? rp.data.data : rp.data;


    } catch (orro) {
        console.log(orro)
        return null

    }


}



async function getListchanel(token) {

    const request = require('request');
    const util = require('util');
    var config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        responseType: 'json'
    };
    const url = "https://partner.viettelsale.com/api/v1/viettelsale/channel";
    // const resul = await request(url, config);
    const requestPromise = util.promisify(request);
    const response = await requestPromise(url, config);

    return response.body;
}


async function getListproduct(token) {

    const request = require('request');
    const util = require('util');
    var config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        responseType: 'json'
    };
    const url = "https://partner.viettelsale.com/product/v2.0/api/products/variants?";
    // const resul = await request(url, config);
    const requestPromise = util.promisify(request);
    const response = await requestPromise(url, config);

    return response.body;
}


async function getTokenchanel(token) {
    try {
        const url = "https://partner.viettelsale.com/api/v1/viettelsale/channel/token";
        var config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            responseType: 'json'
        };
        const data = { "channel_id": "224166" };
        const rp = await axios.post(url, data, config);
        return rp.data.data ? rp.data.data : rp.data;
    } catch (ero) {
        return null;

    }



}


