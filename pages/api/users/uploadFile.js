import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

var mv = require('mv');



export default handler;


export const config = {
    api: {
        bodyParser: false,
    }
};


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



    function randomString(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }


    async function setOder() {

        try {

            const data = await new Promise((resolve, reject) => {
                const form = new IncomingForm()

                form.parse(req, (err, fields, files) => {
                    if (err) return reject(err)

                    var str = randomString(6);
                    str = str + files.file.originalFilename;

                    var oldPath = files.file.filepath;
                    var newPath = `./public/images/uploads/${str}`;

                    mv(oldPath, newPath, function (err) {

                        return reject(err)
                    });
                   let  strl = `/images/uploads/${str}`;

                    return resolve({ status: 200, url: str,file: strl});

                    // res.status(200).json({ status:200, url:str })
                })


            });

            res.status(200).json({ status: 200,  data,url: data.url});


        } catch (erro) {
            console.log(erro);

            res.status(200).json({ status: 199,message:"cõ lỗi sảy ra", data: erro });


        }





    }





}
