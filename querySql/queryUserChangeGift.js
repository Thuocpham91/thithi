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
            query: 'INSERT INTO user_change_gift(id_user, id_gift, status) VALUES(?,?,?)',
            values: [id_user, id_gift, status],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectAll() {
    try {
        let query = 'select u.name as name_user,u.address ,u.phone ,u.score ,i.* from user_change_gift k';
        query = query + ' LEFT JOIN `user` u ';
        query = query + '    ON k.id_user  = u.id  ';
        query = query + '  LEFT JOIN `change_gift` i ';
        query = query + '   ON k.id_gift  = i.id ';

        query = query + ' ORDER BY k.reg_date DESC;';


        const result = await excuteQuery({
            query: query,
        });
        return result;
    } catch (error) {
        console.log(error)
        return [];
    }

}

async function finByidUser(id) {
    try {
        const result = await excuteQuery({
            query: 'select * from user_change_gift where id_user=?',
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




