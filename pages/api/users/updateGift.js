

import { changeGift } from "../../../querySql/queryChangeGift"


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

        const { name, score, url, status, id, key } = req.body;
        // name,score,url,status
        let data;

        data = await changeGift.update(name, score, url, status, id);


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
