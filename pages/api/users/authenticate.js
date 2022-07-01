const jwt = require('jsonwebtoken');
import getConfig from 'next/config';

import { apiHandler } from '../../../helpers/api';
import { User } from '../../../querySql/queryuser';
import { UserRole } from '../../../querySql/qeryUserRole';
import { apiViettel } from './common/apiViettell';


const { serverRuntimeConfig } = getConfig();
export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        case 'GET':
            return checkLogin();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }


    async function checkLogin() {
        try {

            if (typeof req.headers.authorization == "undefined") return res.status(200).json({
                status: 163,
                message: "sai token",
            });

            const tok = req.headers.authorization ? req.headers.authorization.split(' ')[1] : "";
            if (tok == "") return res.status(200).json({
                status: 167,
                message: "sai token",
            });
            const chec_token = jwt.verify(tok, serverRuntimeConfig.secret);

            if (!chec_token) return res.status(200).json({
                status: 177,
                message: "sai token",
            });

            if (Date.now() >= Number(chec_token.exp) * 1000) {
                return res.status(200).json({
                    status: 176,
                    message: "end date",
                });
            }

            const user_ = await User.findByAccount(chec_token.account);
            if (!user_) return res.status(200).json({
                status: 180,
                message: "không có tài khoản",
            });

            if (user_.token != tok) return res.status(200).json({
                status: 182,
                message: "token exit",
            });

            return res.status(200).json({
                status: 200,
                message: "check ok",
            });

        } catch (erro) {
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }

    async function authenticate() {
        try {
            const { email, password } = req.body;
            const user_ = await User.findByAccount(email);
            if (!user_) return res.status(200).json({
                status: 180,
                message: "không có tài khoản",
            });
            var bcrypt = require('bcrypt');

            if (!bcrypt.compareSync(password, user_.password)) return res.status(200).json({
                status: 181,
                message: "mật khẩu không đúng",
            });

            const token = jwt.sign({ account: user_.account }, serverRuntimeConfig.secret, { expiresIn: '7d' });
            const token_refresh = jwt.sign({ account: user_.account }, serverRuntimeConfig.secret, { expiresIn: '7d' });
            user_.token = token;
            user_.token_refresh = token_refresh;

            const ds = await User.updatetoken(user_);
            user_.password = "";

            // const datavietel = await apiViettel.logInViettel();

            // const rp2 = await apiViettel.getTokenchanel(datavietel.access_token);
            // const listproduct=await apiViettel.getListproduct(rp2.access_token);

            // user_.listproduct = JSON.parse(listproduct);

            return res.status(200).json({
                status: 200,
                data: user_,
                token
            });

        } catch (erro) {
            return res.status(200).json({
                status: 199,
                message: erro
            });

        }

    }
}
