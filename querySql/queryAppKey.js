import excuteQuery from '../config/db';



export const Appkey = {
    insert,
    count,
    update,
    SelectAll,

    
};

async function insert(name,key) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO app_key(name,`key`) VALUES(?,?)',
            values: [name,key],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}




async function SelectAll(code) {
    try {
        const result = await excuteQuery({
            query: 'select * from app_key where 1=1  order by created_at  DESC  LIMIT 20',
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
            query: 'UPDATE  app_key SET id_user=?,message=?,status=?,tile =?  where id= ?',
            values: [ca.id_user, ca.message, ca.status,ca.tile,ca.id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}




async function count(id_user) {
    try {
        const result = await excuteQuery({
            query: 'SELECT COUNT(id) AS number FROM notifications  where id_user = ? and  status=0 ',
            values: [id_user],
        });
        return result;
    } catch (error) {
        return 0;
    }
}

