import excuteQuery from '../config/db';



export const Promotion = {
    insert,
    count,
    update,
    SelectAll,
   
    
};

async function insert(title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id,product_name, area,status) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO promotion(title,code,numberOfUses,quantityPurchased,promotionalQuantity,startDate,endDate,product_id,product_name,city_id,status) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            values: [title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id,product_name, area, status],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectById_user(id_user) {


    try {
        const result = await excuteQuery({
            query: 'select * from promotion where id_user = ?',
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
            query: 'select * from promotion',
            values: [code],
        });
        return result;
    } catch (error) {
      return [];
    }

}



async function update(ca) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  promotion SET name=?,code= ? ,status= ?,url= ?   where id= ?',
            values: [ca.name, ca.code, ca.status,ca.url,ca.id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function count(id_user) {
    try {
        const result = await excuteQuery({
            query: 'SELECT COUNT(id) AS number FROM promotion',
            values: [],
        });
        return result;
    } catch (error) {
        return 0;
    }
}

