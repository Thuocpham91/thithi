
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { Promotion } from '../../../querySql/queryPromotion';

import { checlogin } from './common/checkLogin';
import { loginZalo } from './common/checkloginZalo';



export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addPromotion();
        case 'GET':
            return getPromotion();
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }



    async function addPromotion() {
        try {
            const { code, code_verifier } = req.body;
            
            const data= await loginZalo.checkLoginZalo(code);
            return res.status(200).json({
                status: 200,
                message: "Thành công",
                data:data
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
            console.log(erro)
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }


}
