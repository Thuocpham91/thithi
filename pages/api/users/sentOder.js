

import { apiViettel } from './common/apiViettell';


export default handler;

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
        const data = await apiViettel.sentOder(req.body);
        if(data==null) return res.status(200).json({
            status: 1767,
            message: "Thất bại",
            data: data
        });

        return res.status(200).json({
            status: 200,
            message: "Thành công",
            data: data
        });


    }





}
