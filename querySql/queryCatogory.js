import excuteQuery from '../config/db';



export const Catogory = {
    insert,
    Select,
    update,
    SelectAll,
    updateCode,
    Selected,
    SelectCode,
    deletefromID,
    
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
            query: 'select * from category where code = ? order by created_at  DESC',
            values: [code],
        });
        return result;
    } catch (error) {
      return [];
    }

}

async function SelectCode(code) {


    try {
        const result = await excuteQuery({
            query: 'select * from category where code = ? order by created_at  DESC',
            values: [code],
        });
        return result [0];
    } catch (error) {
      return null;
    }

}
async function Selected(code) {


    try {
        const result = await excuteQuery({
            query: 'select * from category where code = ? order by created_at  DESC',
            values: [code],
        });
        return result[0];
    } catch (error) {
      return null;
    }

}


async function deletefromID(code) {
    try {
        const result = await excuteQuery({
            query: 'delete  from category where id = ?',
            values: [code],
        });
        return result
    } catch (error) {
      return null;
    }

}


async function SelectAll(code) {


    try {
        const result = await excuteQuery({
            query: 'select * from category order by created_at  DESC',
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


async function updateCode(value) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  category SET name=? ,status= ?,url= ?   where code= ?',
            values: [value.name, value.status,value.url,value.code],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}
