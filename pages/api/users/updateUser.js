
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

            const user = await checlogin.checkLogin(req, res);
            const checkl = user.id_role==1?true:false;
            if (!checkl) return res.status(200).json({
                status: 194,
                message: "Bạn ko có quền"
            });

            const {id, phone, name,district_id,city_id,id_khataco,id_role,status,score,description } = req.body;
         
            const user_change = await User.findBId(id);
            if(!user_change) return;
            if(id_role)user_change.id_role=id_role;
            if(phone)user_change.phone=phone;
            
            if(name)user_change.name=name;
            if(district_id)user_change.district_id=district_id;
            if(city_id)user_change.city_id=city_id;
            if(id_khataco)user_change.id_khataco=id_khataco;
            if(status)user_change.status=status;
            if(score)user_change.score=score;
            if(description)user_change.description=description;
            const rt= await User.update(user_change);


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
