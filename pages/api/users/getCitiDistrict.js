
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { queryCenter } from '../../../querySql/queryCenter';


import { City } from '../../../querySql/queryCity';
import { Districts } from '../../../querySql/queryDistrict';
import { Wards } from '../../../querySql/queryWards';

import { Store } from '../../../querySql/queryStore';


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
                const cityVT = await City.SelectAll();


                data = cityVT;
            } else if (key == "district") {
                const cityVT = await Districts.finbyidcity(id);
                data =  {districts:cityVT};
            } else if (key == "wards") {
                const cityVT = await Wards.finByidDistrict(id);
                data =  {wards:cityVT};
            }

            const store = await Store.SelectAll();

            return res.status(200).json({
                status: 200,
                city: data,
                store:{stores:store}

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
