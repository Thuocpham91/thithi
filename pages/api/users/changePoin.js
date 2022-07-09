
import { apiViettel } from './common/apiViettell';

import { apiHandler } from '../../../helpers/api';

import { User } from '../../../querySql/queryuser';
import { Notification } from '../../../querySql/queryNotification';
import { changeGift } from '../../../querySql/queryChangeGift';

import { UserChangeGift } from '../../../querySql/queryUserChangeGift';


import { checlogin } from './common/checkLogin';


export default apiHandler(handler);




function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return changePoin(req, res);

        case 'GET':
            return res.status(200).end(`Method ${req.method} Not Allowed`)
        default:
            return res.status(200).end(`Method ${req.method} Not Allowed`)
    }




    async function changePoin(req, res) {
        try {

            const user = await checlogin.checkLogin(req, res);

            // const data= await Notification.SelectById_user(user.id);
            const gif = await changeGift.Selectbyid(req.body.dChoose.id);
            if (!gif) return res.status(200).json({
                status: 198,
                message: "Quý Đại lý Không có quà đổi!",
                gif
            });
            console.log(gif);
            console.log(user)


            if (Number(user.score) < Number(gif.score)) return res.status(200).json({
                status: 198,
                message: "Quý Đại lý chưa đủ điểm",
            });
            const scored = Number(user.score) - Number(gif.score);
            console.log("scored")
            if (scored == null) return res.status(200).json({
                status: 198,
                message: "Có lỗi sảy ra",
            });
            user.score = scored;
            await User.update(user);


            await UserChangeGift.insert(user.id,req.body.dChoose.id,0);

            return res.status(200).json({
                status: 200,
                user,
                message:"Thành công",
            });


        } catch (erro) {
            return res.status(200).json({
                status: 199,
                message: erro,

            });

        }

    }



}
