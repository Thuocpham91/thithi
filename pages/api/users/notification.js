


import { apiHandler } from '../../../helpers/api';
import { Notification } from '../../../querySql/queryNotification';
import { DeviceToken } from '../../../querySql/queryDiviceToken';

const send = require('../../../components/firebase/send');
//const sendqh88 = require('../../../components/firebase/qh88sent.js');

// } from './common/checkLogin';
export default apiHandler(handler);
function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addNotification(req, res);
        case 'GET':
            return getNotification(req, res);
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function addNotification(req, res) {
        try {

            // const user = await checlogin.checkLogin(req, res);
            // const checkl = user.id_role == 1 ? true : false;
            // if (!checkl) return res.status(200).json({
            //     status: 194,
            //     message: "Bạn ko có quền"

            // });
            const { title, message, app_key } = req.body;

            let payload = {
                notification: {
                    title:title,
                    body: message
                }
            };
            
            for await (const items of app_key){

                let dataDevice = await DeviceToken.selectByAppKey(items);
                for  (const item of dataDevice){
                    // if(dataDevice.namefirebase){
                        // if(dataDevice.namefirebase=="QH88"){
                        //     sendqh88(item.device_token, payload);
                        // }else{
                            send(item.device_token, payload);
                        // }
                    // }
                }
            }
           
          let data= await  Notification.insert(JSON.stringify(app_key),title, message,2 );
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
