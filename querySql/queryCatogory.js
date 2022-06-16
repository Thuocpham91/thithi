import excuteQuery from '../config/db';



export const Catogory = {
    insert,
    Select,
    update,
    SelectAll,
    
};

async function insert(name,code,status,url) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO category(name,code,status,url) VALUES(?,?,?,?)',
            values: [name,code,status,url],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function Select(code) {


    try {
        const result = await excuteQuery({
            query: 'select * from category where code = ?',
            values: [code],
        });
        return result;
    } catch (error) {
      return [];
    }

}
async function SelectAll(code) {


    try {
        const result = await excuteQuery({
            query: 'select * from category',
            values: [code],
        });
        return result;
    } catch (error) {
      return [];
    }

}



async function update(name, code, status,url,id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  category SET name=?,code= ? ,status= ?,url= ?   where id= ?',
            values: [name, code, status,url,id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}

