
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { Promotion } from '../../../querySql/queryPromotion';


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addPromotion();
        case 'GET':
            return getListproduct();
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }



    async function addPromotion() {
        try {

            console.log(req.body);
            const{title,code,numberOfUses,quantityPurchased,promotionalQuantity,startDate,endDate,product ,area} =req.body;

            const data=await Promotion.insert(title,code,numberOfUses,quantityPurchased,promotionalQuantity,startDate,endDate,product.product_id,JSON.stringify(area),0);



             return res.status(200).json({
                status: 200,
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


    async function getListproduct() {
        try {


            const datavietel = await apiViettel.logInViettel();
            const rp2 = await apiViettel.getTokenchanel(datavietel.access_token);
            let listproduct=await apiViettel.getListproduct(rp2.access_token);

             listproduct = JSON.parse(listproduct);

             return res.status(200).json({
                status: 200,
                data: listproduct
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
