import excuteQuery from '../config/db';



export const changeGift = {
    insert,
    Selectbyid,
    update,
    SelectAll,

};

async function insert(name, score, url, status, users, area) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO change_gift(name,score,url,status,users,area) VALUES(?,?,?,?,?,?)',
            values: [name, score, url, status, users, area],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function Selectbyid(code) {
    try {
        const result = await excuteQuery({
            query: 'select * from change_gift where id = ?',
            values: [code],
        });
        return result[0];
    } catch (error) {

        return null;
    }

}
async function SelectAll() {


    try {
        const result = await excuteQuery({
            query: 'select * from change_gift where status=0',
            values: [],
        });
        return result;
    } catch (error) {
        return [];
    }

}



async function update(name, score, url, status, users, id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  change_gift SET name=?,score= ? ,url= ?,status= ? ,users=?  where id= ? ',
            values: [name, score, url, status, users, id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}

