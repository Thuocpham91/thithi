
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { Promotion } from '../../../querySql/queryPromotion';

import { checlogin } from './common/checkLogin';

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

            const user = await checlogin.checkLogin(req, res);
            const checkl = user.id_role == 1 ? true : false;
            if (!checkl) return res.status(200).json({
                status: 194,
                message: "Bạn ko có quền"
            });

            const { title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product, area, users } = req.body;

            const users_id = users.map(item => {
                return item.id
            });

            const area_id = area.map(item => {
                return item.id
            });
            const product_id = product.map(item => {
                return item.product_id
            });

            const klk = await Promotion.SelectByCode(code);
            if (klk) return res.status(200).json({
                status: 188,
                message: "Đã có mã code",
                data: klk
            });



            const data = await Promotion.insert(title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, JSON.stringify(product_id), JSON.stringify(product), JSON.stringify(area), 0, JSON.stringify(users), JSON.stringify(users_id), JSON.stringify(area_id));

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
            console.log(erro)
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }


}
