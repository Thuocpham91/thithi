
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return res.status(200).end(`Method ${req.method} Not Allowed`)
        case 'GET':
            return getListproduct();
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function getListproduct() {
        try {


            const datavietel = await apiViettel.logInViettel();
            console.log("datavietel");
            if (datavietel.access_token == null) return res.status(200).json({
                status: 1900,
                data: datavietel
            });
            const rp2 = await apiViettel.getTokenchanel(datavietel.access_token);
            let listproduct = await apiViettel.getListproduct(rp2.access_token);

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
