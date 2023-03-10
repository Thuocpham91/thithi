

import { apiHandler } from '../../../helpers/api';

import { User } from '../../../querySql/queryuser';


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addUser();
        case 'GET':
            return getListUser();
        case 'PUT':
            return getListUser();
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }


    async function getListUser() {
        try {

            const { id } = req.body
            let danhsachuser, count;

            if (id) {
                danhsachuser = await User.searchUser(id);
                count = await User.searchUserCount(id);
            } else {
                count = await User.countUser();
                danhsachuser = await User.selectALL();
            }

            return res.status(200).json({
                status: 200,
                data: danhsachuser,
                count: count
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

            const { name, password, idUser, desc, phoneNumber, city, city_code, district, district_code, address } = req.body;

            const { id_cityVT, code_cityVT, name_cityVT, id_districtVT, code_districtVT, name_districtVT, id_wardsVT, code_wardsVT, name_wardsVT, id_store, name_store } = req.body;


            const u_s=await User.searchUserIdkhataco(idUser);
            if(u_s)  return res.status(200).json({
                status: 199,
                message: "Đã có Đại lý dùng ID này",
            });

            const hash = bcrypt.hashSync(password, 10);

            const djj = await User.insert_User(phoneNumber, hash, 0, idUser, "", "", 0, 2, phoneNumber, desc, city_code, district_code, name, address, id_cityVT, code_cityVT, name_cityVT, id_districtVT, code_districtVT, name_districtVT, id_wardsVT, code_wardsVT, name_wardsVT, id_store, name_store);

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
