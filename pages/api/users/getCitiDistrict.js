
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
            const loginVT = await apiViettel.logInViettel();
            const rp2 = await apiViettel.getTokenchanel(loginVT.access_token);


            if (key == "city") {
                const cityVT = await apiViettel.getCity(loginVT.access_token);
                data = cityVT.cities;
            } else if (key == "district") {
                const cityVT = await apiViettel.getDistrict(loginVT.access_token, id);
                data = cityVT;
            } else if (key == "wards") {
                const cityVT = await apiViettel.getWards(loginVT.access_token, id);
                data = cityVT;
            }

            const store = await apiViettel.getStore(rp2.access_token);





            return res.status(200).json({
                status: 200,
                city: data,
                store

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
