import excuteQuery from '../config/db';



export const Product = {
    insert,
    SelectAll,
    Delete,
};

async function insert(id,list) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO product(id, listproduct) VALUES(?,?)',
            values: [id, list],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectAll() {
    try {
        const result = await excuteQuery({
            query: 'select * from product ',
        });

        return result[0];
    } catch (error) {
        console.log(error)
        return null;
    }

}

async function Delete() {
    try {
        const result = await excuteQuery({
            query: 'delete * from product',
            values: [code],
        });
        return result;
    } catch (error) {
        return [];
    }

}




