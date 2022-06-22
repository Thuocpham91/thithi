import axios from 'axios'
import { insert_Acountvietteel, update_Acountvietteel, select_Acountvietteel } from '../../../../querySql/queryAccountViettell';


export const apiViettel = {
    logInViettel,
    getTokenchanel,
    getListproduct,
    sentOder,
    getCity,
    getDistrict,
    getWards,


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

async function createOder(token, data) {
    try {
        const url = "https://partner.viettelsale.com/product/v2.0/api/order/tmdt";
        var config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            responseType: 'json'
        };

        const rp = await axios.post(url, data, config);
        return rp.data.data ? rp.data : rp.data;
    } catch (ero) {
        return null;

    }

}


async function getCity(token) {


    try {
        const url = "https://partner.viettelsale.com/product/v2.0/api/location/city"; 
        var config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            responseType: 'json'
        };

        const rp = await axios.get(url, config);
        return rp.data.data ? rp.data.data : rp.data;
    } catch (ero) {
        return [];

    }


}


async function getDistrict(token,id_city) {

    try {
        const url = "https://partner.viettelsale.com/product/v2.0/api/location/city/"+id_city+"/districts";
        var config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            responseType: 'json'
        };

        const rp = await axios.get(url, config);
        return rp.data.data ? rp.data.data : rp.data;
    } catch (ero) {
        return [];

    }


}


async function getWards(token,id_dis) {


    try {
        const url = "https://partner.viettelsale.com/product/v2.0/api/location/district/"+id_dis+"/wards";
        var config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            responseType: 'json'
        };

        const rp = await axios.get(url, config);
        return rp.data.data ? rp.data.data : rp.data;
    } catch (ero) {
        return [];

    }



}




async function sentOder(data) {
    try {
        const acount = await logInViettel();
        const rp2 = await getTokenchanel(acount.access_token);
        // const datap = {
        //     "products": [
        //         {
        //             "id": 1231231231,
        //             "quantity": 42,
        //             "price": 26
        //         }
        //     ],
        //     "total": 1132,
        //     "transport": {
        //         "id": "211232",
        //         "title": "thuoc gui",
        //         "delivery_time": "string",
        //         "payer_type": 1
        //     },
        //     "transport_type": 1,
        //     "staff_note": "string",
        //     "total_weight":2,
        //     "total_money_product":1999,
        //     "total_ship": 0,
        //     "store_id": 0,
        //     "payment_method": 1,
        //     "source": "TMĐT",
        //     "total_discount": 0,
        //     "total_money_cod": 0,
        //     "customer": {
        //         "phone": "0978095248",
        //         "fullName": "phamvutuoc",
        //         "province_id": 0,
        //         "ward_id": 0,
        //         "district_id": 1,
        //         "address": "hop hoa tam duong vinh phuc",
        //         "location_type": "VIETTELPOST"
        //     }
        // };

        const oder = await createOder(rp2.access_token,data);
        console.log(oder)
        return oder;
    } catch (ero) {
        console.log(ero)
        return null;

    }

}



