import excuteQuery from '../config/db';



export const Notification = {
    insert,
    count,
    update,
    SelectAll,
    SelectById_user,
    updateStatus,
    selectByID
    
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

async function selectByID(id,id_user) {

    try {
        const result = await excuteQuery({
            query: 'select * from notification where id = ? and  id_user = ?   ',
            values: [id,id_user],
        });
        return result [0];
    } catch (error) {
      return null;
    }

}

async function SelectById_user(id_user) {

    try {
        const result = await excuteQuery({
            query: 'select * from notification where id_user = ?   order by status  ASC,created_at DESC limit 10 ',
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
            query: 'select * from notification where status=0  order by created_at  DESC  LIMIT 20',
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
            query: 'UPDATE  notification SET id_user=?,message=?,status=?,tile =?  where id= ?',
            values: [ca.id_user, ca.message, ca.status,ca.tile,ca.id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function updateStatus(status,id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  notification SET status= ?  where id_user= ?',
            values: [status,id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}



async function count(id_user) {
    try {
        const result = await excuteQuery({
            query: 'SELECT COUNT(id) AS number FROM notification  where id_user = ? and  status=0 ',
            values: [id_user],
        });
        return result;
    } catch (error) {
        return 0;
    }
}

