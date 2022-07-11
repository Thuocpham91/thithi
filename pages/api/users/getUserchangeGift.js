

import { apiHandler } from '../../../helpers/api';

import { UserChangeGift } from '../../../querySql/queryUserChangeGift';
import { checlogin } from './common/checkLogin';

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return res.status(200).end(`Method ${req.method} Not Allowed`);

        case 'GET':
            return changePass(req, res);
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function changePass(req, res) {
        try {
            const user = await checlogin.checkLogin(req, res);
            const checkl = user.id_role==1?true:false;
            if (!checkl) return res.status(200).json({
                status: 194,
                message: "Quý đại lý ko có quền"
            });

            const data=await UserChangeGift.SelectAll();

            return res.status(200).json({
                status: 200,
                message: "lấy danh sách thành công",
                data
            });


        } catch (erro) {
            return res.status(200).json({
                status: 199,
                message: "erro"
            });

        }

    }


}
