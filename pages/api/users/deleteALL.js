
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { User } from '../../../querySql/queryuser';
import { checlogin } from './common/checkLogin';

import { Catogory } from '../../../querySql/queryCatogory';


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

        const user = await checlogin.checkLogin(req, res);
        const checkl = user.id_role==1?true:false;
        if (!checkl) return res.status(200).json({
            status: 194,
            message: "Quý đại lý ko có quền"
        });

        try {
            const {id,code } = req.body;
            let rt;

            if(code==1)  rt= await User.deleteUser(id);
            if(code==2)  rt= await Catogory.deletefromID(id);

            
           
            return res.status(200).json({
                status: 200,
                message: "Xóa thành công",
                data:rt

            });


        } catch (erro) {
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }


}
