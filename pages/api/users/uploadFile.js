import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'



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
                const form = new IncomingForm();
                form.parse(req, (err, fields, files) => {
                    if (err) return reject(err);
                    resolve({ fields, files });
                });
            });





            const imageFile = data.files.file; // .image because I named it in client side by that name: // pictureData.append('image', pictureFile);
            const imagePath = imageFile.filepath;
            let file_n=randomString(12)+imageFile.originalFilename;

        
            const pathToWriteImage = `public/${file_n}`; // include name and .extention, you can get the name from data.files.image object
            const image = await fs.readFile(imagePath);
            await fs.writeFile(pathToWriteImage, image);

            let part=`/${file_n}`



            res.status(200).json({ status: 200,url:part });


        } catch (erro) {
            console.log(erro);

            res.status(200).json({ status: 199, message: "cõ lỗi sảy ra", data: erro });


        }





    }





}
export default handler;
