
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { User } from '../../../querySql/queryuser';
import { Notification } from '../../../querySql/queryNotification';

import { checlogin } from './common/checkLogin';


export default apiHandler(handler);

const findUser = async (title, content, matp) => {
    // id_user,message,status,tile
    const data = await User.findCityCode(matp);
    data.map(item => {
        Notification.insert(item.id, content, 0, title);


    })


}

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return res.status(200).end(`Method ${req.method} Not Allowed`)

        case 'GET':
            return getNotification(req, res);
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


 


    async function getNotification(req, res) {
        try {

            const user = await checlogin.checkLogin(req, res);
           

            const data= await Notification.count(user.id);
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
