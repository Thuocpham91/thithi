import excuteQuery from '../config/db';



export const UserChangeGift = {
    insert,
    SelectAll,
    Delete,
    finByidUser,
};

async function insert(id_user, id_gift, status) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO userr_change_gift(id_user, id_gift, status) VALUES(?,?,?)',
            values: [id_user, id_gift, status],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectAll() {
    try {
        const result = await excuteQuery({
            query: 'select * from userr_change_gift',
            values: [code],
        });
        return result;
    } catch (error) {
        return [];
    }

}

async function finByidUser(id) {
    try {
        const result = await excuteQuery({
            query: 'select * from userr_change_gift where id_user=?',
            values: [id],
        });
        return result;
    } catch (error) {
        return [];
    }

}

async function Delete() {
    try {
        const result = await excuteQuery({
            query: 'delete * from wards',
            values: [code],
        });
        return result;
    } catch (error) {
        return [];
    }

}




