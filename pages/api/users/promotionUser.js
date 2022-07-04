
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { Promotion } from '../../../querySql/queryPromotion';

import { checlogin } from './common/checkLogin';

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return get();
        case 'GET':
            return res.status(200).end(`Method ${req.method} Not Allowed`)
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    
    async function get() {
        try {

            const { id_user, date ,id_city} = req.body;
            console.log(id_user)
            console.log(date)

            console.log(id_city)

            const data =await  Promotion.SelectByid(Number(id_user), date,Number(id_city));

            return res.status(200).json({
                status: 200,
                message: "Thành công",
                data: data
            });


        } catch (erro) {
            console.log(erro)
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }


    async function getPromotion() {
        try {

            const data = await Promotion.SelectAll();
            const count = await Promotion.count();
            return res.status(200).json({
                status: 200,
                data: data,
                count: count[0]
            });


        } catch (erro) {
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }


}
