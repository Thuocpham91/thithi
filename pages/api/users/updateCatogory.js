
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { Catogory } from '../../../querySql/queryCatogory';
import { checlogin } from './common/checkLogin';


export default apiHandler(handler);


const createCatogory = async (item) => {
    const data = await Catogory.Select(item.code);

    if (data.length == 0) await Catogory.insert(item.name, item.code, item.status, "");

}

function handler(req, res) {
    switch (req.method) {
        case 'POST':

            return changePass(req, res);
        case 'GET':
            return getCategory(req, res);
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }




    async function changePass(req, res) {
        try {
            const { data } = req.body;
            data.map(item => {
                createCatogory(item);
            });
            return res.status(200).json({
                status: 200,
                message: "thay đổi thành công",
                // data:rt

            });


        } catch (erro) {
            console.log(erro)
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }



    async function getCategory(req, res) {
        try {
            const data = await Catogory.SelectAll();
            return res.status(200).json({
                status: 200,
                message: "Thuc hien thanh cong",
                data: data

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
