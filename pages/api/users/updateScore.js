
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { User } from '../../../querySql/queryuser';


import { checlogin } from './common/checkLogin';


export default apiHandler(handler);


const updateScoreUser=async(id,score)=>{

    if(typeof score != 'number') return;

    const user_chage = await User.findBId(id);
    user_chage.score=score;
    User.update(user_chage);
    

}

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
            const { listUser } = req.body;

            const user = await checlogin.checkLogin(req, res);
            const checkl = user.id_role==1?true:false;
            if (!checkl) return res.status(200).json({
                status: 194,
                message: "Bạn ko có quền"
            });

            listUser.map(item=>{
                updateScoreUser(item.id,item.score);
            })

            // var bcrypt = require('bcrypt');

            // if (!bcrypt.compareSync(reNewPassword, user_chage.password)) return res.status(200).json({
            //     status: 181,
            //     message: "mật khẩu không đúng",
            // });
            return res.status(200).json({
                status: 200,
                message: "thay đổi thành công",
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
