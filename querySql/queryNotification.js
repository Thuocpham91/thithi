import excuteQuery from '../config/db';



export const Notification = {
    insert,
    count,
    update,
    SelectAll,
    SelectById_user,
    
};

async function insert(id_user,message,status,tile) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO notification(id_user,message,status,tile) VALUES(?,?,?,?)',
            values: [id_user,message,status,tile],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectById_user(id_user) {


    try {
        const result = await excuteQuery({
            query: 'select * from notification where id_user = ?  order by created_at  DESC ',
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
            query: 'select * from notification  order by created_at  DESC ',
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

