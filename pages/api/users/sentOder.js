

import { apiViettel } from './common/apiViettell';
import { Promotion } from '../../../querySql/queryPromotion';



export default handler;

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

        }
        console.log("id_code", id_code);
        return res.status(200).json({
            status: 200,
            message: "Thành công",
            data: data
        });


    }





}
