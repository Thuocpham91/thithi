import excuteQuery from '../config/db';



export const Promotion = {
    insert,
    count,
    update,
    SelectAll,
   
    
};

async function insert(title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id,product_name, area,status,users) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO promotion(title,code,numberOfUses,quantityPurchased,promotionalQuantity,startDate,endDate,product_id,product_name,city_id,status,users) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
            values: [title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id,product_name, area, status,users],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectById_user(id_user) {


    try {
        const result = await excuteQuery({
            query: 'select * from promotion where id_user = ? and status=0',
            values: [id_user],
        });
        return result;
    } catch (error) {
      return [];
    }

}
async function SelectAll(code) {


    try {
        const result = await excuteQuery({
            query: 'select * from promotion where status=0',
            values: [code],
        });
        return result;
    } catch (error) {
      return [];
    }

}



async function update(title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id,product_name, area, status,users,id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  promotion SET title=?,code= ? ,numberOfUses= ?,quantityPurchased= ? ,promotionalQuantity=? ,startDate=? ,endDate=? ,product_id=? ,product_name=? ,area=? ,status=? ,users=?      where id= ?',
            values: [title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id,product_name, area, status,users,id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function count(id_user) {
    try {
        const result = await excuteQuery({
            query: 'SELECT COUNT(id) AS number FROM promotion where status=0',
            values: [],
        });
        return result;
    } catch (error) {
        return 0;
    }
}

