


import { apiHandler } from '../../../helpers/api';

import { User } from '../../../querySql/queryuser';
import { DeviceToken } from '../../../querySql/queryDiviceToken';




// } from './common/checkLogin';


export default apiHandler(handler);



function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addeviceToken(req, res);

        case 'GET':
            return getNotification(req, res);
     
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function addeviceToken(req, res) {
        try {


            const { app_key, device_token } = req.body;
            let data=null;
            let datacolum= await DeviceToken.selectByDeviceToken(device_token);
            if(datacolum.length>0){


            }else{
                data= await DeviceToken.insert(1,device_token,app_key);

            }


            return res.status(200).json({
                status: 200,
                data,
                message: "Tao notification thành công",
            });


        } catch (erro) {
            console.log(erro)
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }



    async function getNotification(req, res) {
        try {
            const data = await Notification.SelectAll();
            // await Notification.updateStatus(1,user.id);
            return res.status(200).json({
                status:200,
                data: data,
            });


        } catch (erro) {
            console.log(erro)
            return res.status(200).json({
                status:500,
                message: erro
            });

        }

    }



}
