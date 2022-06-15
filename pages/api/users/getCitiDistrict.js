
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { queryCenter } from '../../../querySql/queryCenter';


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return res.status(200).end(`Method ${req.method} Not Allowed`)
        case 'GET':
            return getListUser();
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function getListUser() {
        try {
            const citi = await queryCenter.getCiti();
            const district = await queryCenter.getDistrict();
      
            return res.status(200).json({
                status: 200,
                citi,
                district,
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
