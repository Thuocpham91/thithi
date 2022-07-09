

import { apiViettel } from './common/apiViettell';
import { Promotion } from '../../../querySql/queryPromotion';
import { user_promtion } from '../../../querySql/user_promtion';

import { checlogin } from './common/checkLogin';



export default handler;

const checkJson = (string) => {
    let rp;
    try {
        if (string == null) return false;
        rp = JSON.parse(string);
        return true;
    } catch (erro) {
        return false;
    }

};

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            setOder(req, res);
            return;
        case 'GET':
            return res.status(405).end(`Method ${req.method} Not Allowed`)

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }





    async function setOder() {
        const data = await apiViettel.sentOder(req.body);

        const user = await checlogin.checkLogin(req, res);
        if (!user) return res.status(200).json({
            status: 1767,
            message: "không có  user",

        });



        const { id_code } = req.body;
        if (data == null) return res.status(200).json({
            status: 1767,
            message: "Thất bại",
            data: data
        });
        const dk = await Promotion.SelectById_promotion(id_code);
        if (dk) {
            let total = Number(dk.number_use) + 1;
            dk.number_use = total;
            await Promotion.update(dk);
            const dll = await user_promtion.finByid_idprom(user.id, dk.id);
            console.log(dll)

            if (dll) {
                let totals = Number(dll.number_uses) + 1;
                dll.number_uses = totals;
                 await user_promtion.update(totals,dll.id);
            } else {
                await user_promtion.insert(user.id, dk.id, 1);
            }


        }



        return res.status(200).json({
            status: 200,
            message: "Thành công",
            data: data
        });


    }





}
