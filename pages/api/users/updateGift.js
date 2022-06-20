

import { changeGift } from "../../../querySql/queryChangeGift"

import { checlogin } from './common/checkLogin';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            setOder(req, res);
            return;

        case 'GET':
            getGift(req, res);
            return;

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }





    async function setOder() {

        const { name, score, url, status, id, key,users } = req.body;
        const user = await checlogin.checkLogin(req, res);
        const checkl = user.id_role==1?true:false;
        if (!checkl) return res.status(200).json({
            status: 194,
            message: "Bạn ko có quền"
        });

        // name,score,url,status
        let data;

        data = await changeGift.update(name, score, url, status,JSON.stringify(users), id);


        return res.status(200).json({
            status: 200,
            message: "Thành công s",
            data: data
        });


    }


    async function getGift() {
        // name,score,url,status
        const data = await changeGift.SelectAll();

        return res.status(200).json({
            status: 200,
            message: "Thành công s",
            data: data
        });


    }




}
