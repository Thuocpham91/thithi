
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { Promotion } from '../../../querySql/queryPromotion';
import { sassNull } from 'sass';

import { checlogin } from './common/checkLogin';

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addPromotion();
        case 'GET':
            return getPromotion();
        case 'PUT':
            return Delete();
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }




    async function Delete() {
        try {
            const user = await checlogin.checkLogin(req, res);
            const checkl = user.id_role == 1 ? true : false;
            if (!checkl) return res.status(200).json({
                status: 194,
                message: "Bạn ko có quền"
            });
            const { title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_name, area, status, users, users_Id, citys_id, number_use, id } = req.body;

            const pPP = await Promotion.SelectByidNotDate(id);
            if (!pPP) return res.status(200).json({
                status: 188,
                message: "Không có ma khuyến mại",

            });
            pPP.status = status;


            const data = await Promotion.update(pPP);

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





    async function addPromotion() {
        try {
            const user = await checlogin.checkLogin(req, res);
            const checkl = user.id_role == 1 ? true : false;
            if (!checkl) return res.status(200).json({
                status: 194,
                message: "Bạn ko có quền"
            });


            const { title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_name, area, status, users, users_Id, citys_id, number_use, id } = req.body;


            const users_id = users.map(item => {
                return item.id
            });

            const area_id = area.map(item => {
                return item.id
            });
            const product_id = product_name.map(item => {
                return item.product_id
            });

            const pPP = await Promotion.SelectByidNotDate(id);
            if (!pPP) return res.status(200).json({
                status: 188,
                message: "Không có ma khuyến mại",

            });
            pPP.title = title;
            pPP.numberOfUses = numberOfUses;
            pPP.quantityPurchased = quantityPurchased;
            pPP.promotionalQuantity = promotionalQuantity;
            pPP.startDate = startDate;
            pPP.endDate = endDate;
            pPP.product_name = JSON.stringify(product_name);
            pPP.area = JSON.stringify(area);
            pPP.status = status;
            pPP.users = JSON.stringify(users);
            pPP.number_use = number_use;
            pPP.product_id = JSON.stringify(product_id);
            pPP.area_id = JSON.stringify(area_id);
            pPP.users_Id = JSON.stringify(users_id);
            pPP.citys_id = JSON.stringify(area_id);
            pPP.id = JSON.stringify(id);


            const data = await Promotion.update(pPP);

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
