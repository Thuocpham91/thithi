import excuteQuery from '../config/db';



export const changeGift = {
    insert,
    Select,
    update,
    SelectAll,
    
};

async function insert(name,score,url,status) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO change_gift(name,score,url,status) VALUES(?,?,?,?)',
            values: [name,score,url,status],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function Select(code) {


    try {
        const result = await excuteQuery({
            query: 'select * from change_gift where code = ?',
            values: [code],
        });
        return result;
    } catch (error) {
      return [];
    }

}
async function SelectAll() {


    try {
        const result = await excuteQuery({
            query: 'select * from change_gift',
            values: [],
        });
        return result;
    } catch (error) {
      return [];
    }

}



async function update(name,score,url,status,id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  change_gift SET name=?,score= ? ,url= ?,status= ?   where id= ?',
            values: [name,score,url,status,id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}

