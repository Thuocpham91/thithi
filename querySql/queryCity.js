import excuteQuery from '../config/db';



export const City = {
    insert,
    SelectAll,
    Delete,
};

async function insert(id, vts_id, name, zi_code, vtp_id) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO city(id,vts_id,name,zi_code,vtp_id) VALUES(?,?,?,?,?)',
            values: [id, vts_id, name, zi_code, vtp_id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectAll() {
    try {
        const result = await excuteQuery({
            query: 'select * from city',
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
            query: 'delete from city',
        });
        return result;
    } catch (error) {
        return [];
    }

}




