import excuteQuery from '../config/db';



export const Promotion = {
    insert,
    count,
    update,
    SelectAll,
   
    
};

async function insert(title,code,numberOfUses,quantityPurchased,promotionalQuantity,startDate,endDate,product_id,city_id,status) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO Promotion(title,code,numberOfUses,quantityPurchased,promotionalQuantity,startDate,endDate,product_id,city_id,status) VALUES(?,?,?,?,?,?,?,?,?,?)',
            values: [title,code,numberOfUses,quantityPurchased,promotionalQuantity,startDate,endDate,product_id,city_id,status],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectById_user(id_user) {


    try {
        const result = await excuteQuery({
            query: 'select * from notification where id_user = ?',
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
            query: 'select * from Promotion',
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
            query: 'UPDATE  notification SET name=?,code= ? ,status= ?,url= ?   where id= ?',
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
            query: 'SELECT COUNT(id) AS number FROM notification  where id_user = ?',
            values: [id_user],
        });
        return result;
    } catch (error) {
        return 0;
    }
}

