


import { User } from '../../../querySql/queryuser';




export default handler;

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
            const { newPassword, reNewPassword, id } = req.body;

          //  const user = await checlogin.checkLogin(req, res);
          //  const checkl = user.id_role == 1 ? true : false;
            // if (!checkl) return res.status(200).json({
            //     status: 194,
            //     message: "Quý đại lý ko có quền"
            // });

            // const user_chage = await User.findBId(id);
            var bcrypt = require('bcrypt');

            // if (!bcrypt.compareSync(reNewPassword, user_chage.password)) return res.status(200).json({
            //     status: 181,
            //     message: "mật khẩu không đúng",
            // });

        console.log(newPassword)
        console.log(id)

            const hash = bcrypt.hashSync(newPassword, 10);
            console.log(hash)


         let resuft=   await User.updatePass(hash, id);


            return res.status(200).json({
                status: 200,
                message: "Thay đổi thành công",
                resuft


            });


        } catch (error) {
            console.log(error)
            return res.status(200).json({
                status: 199,
                message: error
            });

        }

    }


}
