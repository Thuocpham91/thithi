
import excuteQuery from '../../../config/db.js';
import axios from 'axios'
import { insert_Acountvietteel, update_Acountvietteel, select_Acountvietteel } from '../../../querySql/queryAccountViettell';

import { select_Channel_product_id, insert_Channel } from '../../../querySql/querychannel';
import { UserRole } from '../../../querySql/qeryUserRole';


export default handler;

function handler(req, res) {
    console.log("req.method", req.method);
    switch (req.method) {
        case 'POST':
            authenticate(req, res);
            return;
        case 'GET':
            authenticate(req, res);

            return;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }


    async function logInViettel() {
        const url = "https://partner.viettelsale.com/viettelsale/login";
        var config = {
            headers: { 'Content-Type': 'application/json' },
            responseType: 'json'
        };
        const data = {
            "Username": "0982288550",
            "Password": "Pthp123@"
        }


        const rp = await axios.post(url, data, config);

        const dt = await select_Acountvietteel(1);
        if (dt.length == 0) {
            insert_Acountvietteel("0982288550", rp.data.data.access_token, "no pass", rp.data.data.access_token_expired_at);
        } else {
            update_Acountvietteel(rp.data.data.access_token, rp.data.data.access_token_expired_at);
        }
        return rp.data.data ? rp.data.data : rp.data;
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


    async function getTokenchanel(token) {

        const url = "https://partner.viettelsale.com/api/v1/viettelsale/channel/token";
        var config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            responseType: 'json'
        };
        const data = { "channel_id": "224166" };

        const rp = await axios.post(url, data, config);

        return rp.data.data ? rp.data.data : rp.data;

    }









    async function authenticate(req, res) {

        try {
            const rp = await logInViettel();
            console.log(rp.access_token);
            const rp2 = await getTokenchanel(rp.access_token);

            const respon = {
                acount: rp,
                chanel: rp2
            }


            return res.status(200).json({
                status: 200,
                message: "hoan thanh",
                data: respon
            });

        } catch (error) {
            return res.status(199).json({
                status: 199,
                message: "loi",
                data: null
            });
        }

    }
}
