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
    getStore,


};

async function getlogInViettel() {
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
        return rp.data.data ? rp.data.data : rp.data;
    } catch (orro) {
        return null

    }
}

async function logInViettel() {

    try {
        const dt = await select_Acountvietteel(1);

        if (dt.length == 0) {
            const data = await getlogInViettel();
            insert_Acountvietteel("0982288550", data.access_token, "no pass", data.access_token_expired_at);
            return data;
        } else {
            const date = new Date();
            if (date.getTime() > parseFloat(dt[0].access_token_expired_at)) {
                const data = await getlogInViettel();
                insert_Acountvietteel("0982288550", data.access_token, "no pass", data.access_token_expired_at);
                return data;
            } else {
                const rt = { access_token: dt[0].token };
                return rt;

            }
        }
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

// async function createOder(token, data) {
//     try {
//         const url = "https://partner.viettelsale.com/product/v2.0/api/order/tmdt";
//         var config = {
//             headers: { 'Content-Type': 'application/json', 'Authorization': token },
//             responseType: 'json'
//         };

//         const rp = await axios.post(url, data, config);
//         return rp.data.data ? rp.data : rp.data;
//     } catch (ero) {
//         return null;

//     }

// }



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


async function getDistrict(token, id_city) {

    try {
        const url = "https://partner.viettelsale.com/product/v2.0/api/location/city/" + id_city + "/districts";
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


async function getWards(token, id_dis) {
    try {
        const url = "https://partner.viettelsale.com/product/v2.0/api/location/district/" + id_dis + "/wards";
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



async function getStore(token) {
    try {
        const url = "https://partner.viettelsale.com/product/v2.0/api/stores?page=1&limit=20";
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
     

        const oder = await createOder(rp2.access_token, data);
        return oder;
    } catch (ero) {
        console.log(ero)
        return null;

    }

}



