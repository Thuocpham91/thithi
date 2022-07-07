
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { queryCenter } from '../../../querySql/queryCenter';

import { City } from '../../../querySql/queryCity';
import { Districts } from '../../../querySql/queryDistrict';
import { Wards } from '../../../querySql/queryWards';
import { Store } from '../../../querySql/queryStore';

import { Product } from '../../../querySql/queryProduct';


import { Catogory } from '../../../querySql/queryCatogory';



const insertdatacity = async (item, access_token) => {

    await City.insert(item.id, item.vts_id, item.name, item.zip_code, item.vtp_id);

    const cityVT = await apiViettel.getDistrict(access_token, item.id);
    cityVT.districts.map(async item => {
        await insertDistrict(item, access_token)
    })
}


const insertDistrict = async (item, access_token) => {


    await Districts.insert(item.id, item.city_id, item.name, item.fullname, item.vtp_id);
    const cityVT = await apiViettel.getWards(access_token, item.id);
    cityVT.wards.map(async item => {
        await insertdataWards(item);
    })

}

const updateCatogory = async (item) => {

    let d = Catogory.Selected(item.code);
    if (d) {
        d.name = item.name;
        await Catogory.updateCode(d)

    } else {
        await Catogory.insert(item.name, item.code, 2, null);

    }

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
            return updateData();
        case 'GET':
            return updateData();
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function updateData() {
        try {
            let data = [];
            const { key, id } = req.body;
            // console.log(req.query);
            const loginVT = await apiViettel.logInViettel();
            const rp2 = await apiViettel.getTokenchanel(loginVT.access_token);

            if (key == 1) {
                let listproduct = await apiViettel.getListproduct(rp2.access_token);
                let dt = JSON.parse(listproduct);
                let arayprodcut = dt.variants;
                // dt = dt.variants;
                const finterData = [];
                arayprodcut.map(iten => {
                    const ob = finterData.find(kk => { return kk.code == iten.variants[0].category.code });
                    if (!ob) finterData.push(iten.variants[0].category);
                });
                finterData.map(iem => {
                    updateCatogory(iem)
                });

                await Store.Delete();
                const storeg = await apiViettel.getStore(rp2.access_token);
                storeg.stores.map(item => {
                    insertdataStore(item);
                });

                await Product.Delete();
                await Product.insert(120, JSON.stringify(listproduct));

            } else {


                const cityVT = await apiViettel.getCity(loginVT.access_token);
                data = cityVT.cities;

                await City.Delete();
                await Districts.Delete();
                await Wards.Delete();
                data.forEach(async item => {
                    await insertdatacity(item, loginVT.access_token);
                });



            }

            return res.status(200).json({
                status: 200,
                message: "Update thành công"

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
