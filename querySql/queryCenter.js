import excuteQuery from '../config/db';



export const queryCenter = {
    getCiti,
    getDistrict,


};



async function getCiti() {
    try {
        const result = await excuteQuery({
            query: 'select * from  city ',
           
        });
        return result;
    } catch (error) {
        return [];
    }
}

async function getDistrict() {
    try {
        const result = await excuteQuery({
            query: 'select * from  district ',
           
        });
        return result;
    } catch (error) {
        return [];
    }
}





