import excuteQuery from '../config/db';



export const Promotion = {
    insert,
    count,
    update,
    SelectAll,
    SelectByid,
    SelectByidNotDate,


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
async function SelectByid(id, date,id_city) {
    try {
        let query = 'SELECT * FROM promotion p '
        query = query + "WHERE ( users_Id  LIKE  '%[?]%' or users_Id  LIKE  '%,?]%' or users_Id  LIKE  '%[?,%' or users_Id  LIKE  '%,?,%' or citys_id  LIKE  '%,?]%' or citys_id  LIKE  '%[?,%' or citys_id  LIKE  '%[?]%' or citys_id  LIKE  '%,?,%' ) and endDate >= ? and  status=0";

        const result = await excuteQuery({
            query: query,
            values: [id, id, id,id, id_city,id_city,id_city,id_city,date],
        });
    
        return result;
    } catch (error) {
        return [];
    }

}

async function SelectByidNotDate(id) {
    try {
        let query = 'SELECT * FROM promotion p '
        query = query + "WHERE ( users_Id  LIKE  '%,?]%' or users_Id  LIKE  '%[?,%' or users_Id  LIKE  '%,?,%' )  and  status=0";

        const result = await excuteQuery({
            query: query,
            values: [id, id, id],
        });
        return result;
    } catch (error) {
        return [];
    }

}



async function update(value) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  promotion SET title = ? ,code = ?,numberOfUses = ?,quantityPurchased = ?,promotionalQuantity = ?,startDate = ?,endDate = ?,product_id = ?,product_name = ?,area = ?,status = ?,users = ?,users_Id = ?,citys_id = ?,number_use = ?      where id= ?',
            values: [value.title,value.code,value.numberOfUses,value.quantityPurchased,value.promotionalQuantity,value.startDate,value.endDate,value.product_id,value.product_name,value.area,value.status,value.users,value.users_Id,value.citys_id,value.number_use, value.id],
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

