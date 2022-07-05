import excuteQuery from '../config/db';



export const changeGift = {
    insert,
    Selectbyid,
    update,
    SelectAll,
    SelectAllBuyIdIDcity,

};

async function insert(name, score, url, status, users, area,id_users,id_citys) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO change_gift(name,score,url,status,users,area,id_users,id_citys) VALUES(?,?,?,?,?,?,?,?)',
            values: [name, score, url, status, users, area,id_users,id_citys],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function Selectbyid(code) {
    try {
        const result = await excuteQuery({
            query: 'select * from change_gift where id = ? order by created_at  DESC ',
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
            query: 'select * from change_gift where status=0 order by created_at  DESC',
            values: [],
        });
        return result;
    } catch (error) {
        return [];
    }

}


async function SelectAllBuyIdIDcity(id,id_cityVT) {


    try {
        const result = await excuteQuery({
            query: "select * from change_gift   WHERE ( id_users  LIKE  '%[?]%' or  id_users  LIKE  '%,?]%' or id_users  LIKE  '%[?,%' or id_users  LIKE  '%,?,%' or id_citys  LIKE  '%,?]%' or id_citys  LIKE  '%[?,%'  or id_citys  LIKE  '%[?]%' or id_citys  LIKE  '%,?,%' ) and status=0 order by created_at  DESC",
            values: [id,id,id,id,id_cityVT,id_cityVT,id_cityVT,id_cityVT],
        });
        return result;
    } catch (error) {
        return [];
    }

}



async function update(name, score, url, status, users, area,id_users,id_citys,id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  change_gift SET name=?,score= ? ,url= ?,status= ? ,users=?,area=? ,id_users=?,id_citys=? where id= ? ',
            values: [name, score, url, status, users, area,id_users,id_citys,id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}

