
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
            const { newPassword, reNewPassword } = req.body;

            const userl = await checlogin.checkLogin(req, res);
            const checkl = userl.id_role==1?true:false;
            if (!checkl) return res.status(200).json({
                status: 194,
                message: "Quý đại lý ko có quyền"
            });


            const user = await checlogin.checkLogin(req, res);

            var bcrypt = require('bcrypt');

            if (!bcrypt.compareSync(reNewPassword, user.password)) return res.status(200).json({
                status: 181,
                message: "Mật khẩu không đúng",
            });

            const hash = bcrypt.hashSync(newPassword, 10);

            User.updatePass(hash, user.id);


            return res.status(200).json({
                status: 200,
                message:"Thay đổi thành công"

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
