

import { apiHandler } from '../../../helpers/api';

import { Appkey } from '../../../querySql/queryAppKey';

// } from './common/checkLogin';


export default apiHandler(handler);



function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addAppkey(req, res);

        case 'GET':
            return getAppKey(req, res);
        case 'PUT':
            //return updateNotification(req, res);
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function addAppkey(req, res) {
        try {

            // const user = await checlogin.checkLogin(req, res);
            // const checkl = user.id_role == 1 ? true : false;
            // if (!checkl) return res.status(200).json({
            //     status: 194,
            //     message: "Bạn ko có quền"
            // });



                 const { name, key } = req.body;
           let data=  await    Appkey.insert(name, key );
            

            return res.status(200).json({
                status: 200,
                data,
                message: "gưi tin thành công",
            });


        } catch (erro) {
            console.log(erro)
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }




    async function getAppKey(req, res) {
        try {
            const data = await Appkey.SelectAll();
            return res.status(200).json({
                status: 200,
                data: data,
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
