import excuteQuery from '../config/db';



export const Promotion = {
    insert,
    count,
    update,
    SelectAll,
    SelectByid,


};

async function insert(title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id, product_name, area, status, users, users_id, areas_id) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO promotion(title,code,numberOfUses,quantityPurchased,promotionalQuantity,startDate,endDate,product_id,product_name,area,status,users,users_Id,citys_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            values: [title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id, product_name, area, status, users, users_id, areas_id],
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
async function SelectByid(id, date) {
    try {
        let query = 'SELECT * FROM promotion p '
        query = query + "WHERE ( users_Id  LIKE  '%,?]%' or users_Id  LIKE  '%[?,%' or users_Id  LIKE  '%,?,%' ) and endDate >= ? and  status=0";

        const result = await excuteQuery({
            query: query,
            values: [id, id, id, date],
        });
        console.log(id)
        console.log(date)

        return result;
    } catch (error) {
        return [];
    }

}



async function update(title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id, product_name, area, status, users, id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  promotion SET title=?,code= ? ,numberOfUses= ?,quantityPurchased= ? ,promotionalQuantity=? ,startDate=? ,endDate=? ,product_id=? ,product_name=? ,area=? ,status=? ,users=?      where id= ?',
            values: [title, code, numberOfUses, quantityPurchased, promotionalQuantity, startDate, endDate, product_id, product_name, area, status, users, id],
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

