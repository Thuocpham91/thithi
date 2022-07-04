

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
        case 'PUT':
            getallGift(req, res);
            return;

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }





    async function setOder() {

        const { id, name, score, url, users, area } = req.body;
        // name,score,url,status

        const id_citys = area.map(item => { return item.id });
        const id_users = users.map(item => { return item.id });
        const data = await changeGift.insert(name, score, url, 0, JSON.stringify(users), JSON.stringify(area), JSON.stringify(id_users), JSON.stringify(id_citys));

        return res.status(200).json({
            status: 200,
            message: "Thành công",
            data: data
        });


    }


    async function getGift() {
        // name,score,url,status
        const user = await checlogin.checkLogin(req, res);

        const data = await changeGift.SelectAllBuyIdIDcity(user.id, Number(user.id_cityVT));

        return res.status(200).json({
            status: 200,
            message: "Thành công",
            data: data
        });


    }

    async function getallGift() {
        // name,score,url,status

        const data = await changeGift.SelectAll();

        return res.status(200).json({
            status: 200,
            message: "Thành công",
            data: data
        });


    }

    


}
