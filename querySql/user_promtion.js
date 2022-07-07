import excuteQuery from '../config/db';



export const user_promtion = {
    insert,
    SelectAll,
    Delete,
    finByid,
    finByid_idprom,
    update,
};

async function insert(id_user, id_promotion, number_uses) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO number_user_promontion(id_user, id_promotion,number_uses) VALUES(?,?,?)',
            values: [id_user, id_promotion, number_uses],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectAll() {
    try {
        const result = await excuteQuery({
            query: 'select * from number_user_promontion',
        });
        return result;
    } catch (error) {
        return [];
    }

}

async function finByid(id) {
    try {
        const result = await excuteQuery({
            query: 'select * from number_user_promontion where id=?',
            values: [id],
        });
        return result;
    } catch (error) {
        return [];
    }

}
async function finByid_idprom(id, id_pro) {
    try {
        const result = await excuteQuery({
            query: 'select * from number_user_promontion where id_user=? and id_promotion=?',
            values: [id, id_pro],
        });
        return result [0];
    } catch (error) {
        return null
    }

}



async function update(number, id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  number_user_promontion SET number_uses= ?  where id= ?',
            values: [number, id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function Delete() {
    try {
        const result = await excuteQuery({
            query: 'delete  from number_user_promontion',
        });
        return result;
    } catch (error) {
        return [];
    }

}




