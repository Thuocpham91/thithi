import getConfig from 'next/config';
const jwt = require('jsonwebtoken');
import { User } from '../../../../querySql/queryuser';
const { serverRuntimeConfig } = getConfig();


export const checlogin = {
    checkLogin,
};



async function checkLogin(req,res) {
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

        return user_;



    } catch (erro) {
        console.log(erro)
        return res.status(200).json({
            status: 199,
            message: erro
        });

    }

}

