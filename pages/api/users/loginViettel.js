
import excuteQuery from '../../../config/db.js';
export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function  authenticate() {

        try {
            const result = await excuteQuery({
                query: 'SELECT * FROM AccountViettell',
                // values: [ email ],
            });
            
            return res.status(200).json({
                status: 200,
                message: "ok",
                data: result
    
            });
        } catch (error) {
                 return res.status(199).json({
                status: 199,
                message: "loi",
                data: result
    
            });
        }





        // const axios = require('axios');
        // axios.post('https://partner.viettelsale.com/viettelsale/login', {
        //     Username: "test342018@gmail.com",
        //     Password: "12345678aA@"
        //   }, {

        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
          
        // }).then(response => {

        //     return res.status(200).json({
        //         status: 200,
        //         message: "ok",
        //         data: response.data
    
        //     });
    
        // }).catch(error => {

        //     return res.status(200).json({
        //         status: 200,
        //         message: "ok",
        //         data: null
    
        //     });

        // })


     
    }
}
