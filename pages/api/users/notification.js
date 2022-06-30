
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


const findCityVTCode = async (title, content, matp) => {
    // id_user,message,status,tile
    const data = await User.findCityVTCode(matp);
    data.map(item => {
        Notification.insert(item.id, content, 0, title);
    })
}



function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return changePass(req, res);

        case 'GET':
            return getNotification(req, res);
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function changePass(req, res) {
        try {

            const user = await checlogin.checkLogin(req, res);
            const checkl = user.id_role==1?true:false;
            if (!checkl) return res.status(200).json({
                status: 194,
                message: "Bạn ko có quền"
            });

            const { title, content, city,users } = req.body;

            city.map(item => {
                findUser(title, content, item.matp);
            })

             
            if (city.length == 0 && users.length> 0) {
                const datauser = await User.selectALL();
                datauser.map(ik => {

                    Notification.insert(ik.id, content, 0, title);
                })

            }

            users.map(item => {
                Notification.insert(item.id, content, 0, title);
            })

            return res.status(200).json({
                status: 200,
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


    async function getNotification(req, res) {
        try {

            const user = await checlogin.checkLogin(req, res);

            const data= await Notification.SelectById_user(user.id);

            await Notification.updateStatus(1,user.id);

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
