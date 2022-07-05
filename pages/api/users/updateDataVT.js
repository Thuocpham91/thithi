
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { queryCenter } from '../../../querySql/queryCenter';

import { City } from '../../../querySql/queryCity';
import { Districts } from '../../../querySql/queryDistrict';
import { Wards } from '../../../querySql/queryWards';
import { Store } from '../../../querySql/queryStore';

import { Product } from '../../../querySql/queryProduct';





const insertdatacity = async (item, access_token) => {

    await City.insert(item.id, item.vts_id, item.name, item.zip_code, item.vtp_id);

    const cityVT = await apiViettel.getDistrict(access_token, item.id);
    cityVT.districts.map(item => {
        insertDistrict(item, access_token)
    })
}


const insertDistrict = async (item, access_token) => {


    await Districts.insert(item.id, item.city_id, item.name, item.fullname, item.vtp_id);
    const cityVT = await apiViettel.getWards(access_token, item.id);
    cityVT.wards.map(item => {
        insertdataWards(item)
    })

}

const insertdataWards = async (item) => {

    await Wards.insert(item.city_id, item.district_id, item.fullname, item.id, item.name, item.vtp_id);
}

const insertdataStore = async (item) => {


    await Store.insert(item.id, item.name, item.address, item.code, item.caption, item.channel_id, item.phone);
}



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


            let listproduct = await apiViettel.getListproduct(rp2.access_token);
            await Product.Delete();

            await Product.insert(120, JSON.stringify(listproduct))



            const cityVT = await apiViettel.getCity(loginVT.access_token);
            data = cityVT.cities;

            await City.Delete();
            await Districts.Delete();
            await Wards.Delete();
            data.map(item => {
                insertdatacity(item, loginVT.access_token);
            });

            await Store.Delete();

            const storeg = await apiViettel.getStore(rp2.access_token);
            storeg.stores.map(item => {
                insertdataStore(item);
            });

            return res.status(200).json({
                status: 200,
                city: data,
                storeg

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
