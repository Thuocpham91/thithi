
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { User } from '../../../querySql/queryuser';
import { checlogin } from './common/checkLogin';


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return changePass(req, res);
        case 'GET':
            return res.status(200).end(`Method ${req.method} Not Allowed`)
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function changePass(req, res) {
        try {
            const {id } = req.body;
            
            const rt= await User.deleteUser(id);
            return res.status(200).json({
                status: 200,
                message: "thay đổi thành công",
                data:rt

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
