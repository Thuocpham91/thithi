import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'



import axios from 'axios';

export const config = {
    api: {
        bodyParser: false,
    }
};

async function uploadfile(data) {
    try {
        const url = "http://localhost:7005/upload";


        const response = await axios.request({
            url: url,
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: data,
        });

        return response;
    } catch (orro) {
        return null

    }
}

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            setOder(req, res);
            return;
        case 'GET':
            return res.status(405).end(`Method ${req.method} Not Allowed`)

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function setOder() {
        try {
            const data = await new Promise((resolve, reject) => {
                const form = new IncomingForm();
                form.parse(req, (err, fields, files) => {
                    if (err) return reject(err);
                    resolve({ fields, files });
                });
            });

            const dald = {
                "key": "mabimatidsoadjoassd",
                "file": data.files.file
            };
            var FormData = require('form-data');
            var bodyFormData = new FormData();
             bodyFormData.append('file', data.files.file);

            const rps = await uploadfile(bodyFormData);
            res.status(200).json({ status: 200, url: "rps" });
        } catch (erro) {
            console.log(erro);
            res.status(200).json({ status: 199, message: "cõ lỗi sảy ra", data: erro });

        }

    }



}
export default handler;
