

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

        const { id, name,score,url,users,area } = req.body;
        // name,score,url,status
        const data=await changeGift.insert(name,score,url,0,JSON.stringify(users),JSON.stringify(area));

        return res.status(200).json({
            status: 200,
            message: "Thành công s",
            data: data
        });


    }


    async function getGift() {
        // name,score,url,status
        const data=await changeGift.SelectAll();

        return res.status(200).json({
            status: 200,
            message: "Thành công s",
            data: data
        });


    }




}
