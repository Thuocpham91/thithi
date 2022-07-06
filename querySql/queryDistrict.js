import excuteQuery from '../config/db';



export const Districts = {
    insert,
    SelectAll,
    Delete,
    finbyidcity,
};

async function insert(id, city_id, name, fullname, vtp_id) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO districts(id, city_id, name, fullname, vtp_id) VALUES(?,?,?,?,?)',
            values: [id, city_id, name, fullname, vtp_id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectAll() {
    try {
        const result = await excuteQuery({
            query: 'select * from districts',
            values: [code],
        });
        return result;
    } catch (error) {
        return [];
    }

}

async function finbyidcity(id) {
    try {
        const result = await excuteQuery({
            query: 'select * from districts where city_id = ?',
            values: [id],
        });
        return result;
    } catch (error) {
        console.log(error)
        return [];
    }

}

async function Delete() {
    try {
        const result = await excuteQuery({
            query: 'delete  from districts',
            values: [code],
        });
        return result;
    } catch (error) {
        return [];
    }

}




