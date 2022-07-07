import excuteQuery from '../config/db';



export const Store = {
    insert,
    SelectAll,
    Delete,
};

async function insert(id, name, address, code, caption,channel_id,phone) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO store(id, name, address, code, caption,channel_id,phone) VALUES(?,?,?,?,?,?,?)',
            values: [id, name, address, code, caption,channel_id,phone],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectAll() {
    try {
        const result = await excuteQuery({
            query: 'select * from store',
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
            query: 'delete  from store',
        });
        return result;
    } catch (error) {
        return [];
    }

}




