
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { User } from '../../../querySql/queryuser';


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addUser();
        case 'GET':
            return getListUser();
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function getListUser() {
        try {
            const danhsachuser = await User.selectALL();
            let count=await User.countUser();

            return res.status(200).json({
                status: 200,
                data: danhsachuser,
                count:count
            });


        } catch (erro) {
            console.log(erro)
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }


    async function addUser() {
        try {
            var bcrypt = require('bcrypt');

        //   account,password,status,id_khataco,token,token_refresh,score,id_role,phone,description,city_id,district_id

          const {name,password,idUser,desc,phoneNumber,city,city_code,district,district_code}=req.body;

          const hash = bcrypt.hashSync(password, 10);

          const djj= await User.insert_User(phoneNumber,hash,1,idUser,"","",0,2,phoneNumber,desc,city_code,district_code,name);

            return res.status(200).json({
                status: 200,
                data: djj,
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
