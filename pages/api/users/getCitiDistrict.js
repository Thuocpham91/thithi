
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { queryCenter } from '../../../querySql/queryCenter';


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return getListUser();
        case 'GET':
            return getListUser();
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function getListUser() {
        try {
            let data = [];
            const { key, id } = req.body;
            // console.log(req.query);

            if (key == "city") {
                const loginVT = await apiViettel.logInViettel();
                const cityVT = await apiViettel.getCity(loginVT.access_token);

                data = cityVT.cities;

            } else if (key == "district") {
                const loginVT = await apiViettel.logInViettel();
                const cityVT = await apiViettel.getDistrict(loginVT.access_token, id);

                data = cityVT;
            } else if (key == "wards") {
                const loginVT = await apiViettel.logInViettel();
                const cityVT = await apiViettel.getWards(loginVT.access_token, id);
                data = cityVT;

            }
            return res.status(200).json({
                status: 200,
                city: data,
                // district,
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
