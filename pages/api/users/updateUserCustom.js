
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

         

            const {id, phone, name,district_id,city_id,id_khataco,id_role,status,score,description } = req.body;
            const {id_cityVT,code_cityVT,name_cityVT,id_districtVT,code_districtVT,name_districtVT,id_wardsVT,code_wardsVT,name_wardsVT,id_store,name_store } = req.body;
         
            const user_change = await User.findBId(id);
            if(!user_change) return res.status(200).json({
                status: 199,
                message: "Không có dữ liệu",
                data:rt

            });
           
            user_change.id_cityVT=id_cityVT;
            user_change.code_cityVT=code_cityVT;
            user_change.name_cityVT=name_cityVT;
            user_change.id_districtVT=id_districtVT;
            user_change.code_districtVT=code_districtVT;
            user_change.name_districtVT=name_districtVT;
            user_change.id_wardsVT=id_wardsVT;
            user_change.code_wardsVT=code_wardsVT;
            user_change.name_wardsVT=name_wardsVT;
            user_change.id_store=id_store;
            user_change.name_store=name_store;

            const rt= await User.update(user_change);


            return res.status(200).json({
                status: 200,
                message: "Thay đổi thành công",
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
