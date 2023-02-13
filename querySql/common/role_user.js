import excuteQuery from '../config/db';



export const User = {
    findByAccount,

};

async function insert_User(account, pass, status, id_p, token, token_refresh) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO user(account,pass,status,id_p,token,token_refresh) VALUES(?,?,?,?,?,?)',
            values: [account, pass, status, id_p, token, token_refresh],
        });
    } catch (error) {
        console.log(error);
    }

}

async function update(id, account, pass, status, id_p, token, token_refresh) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  user SET account=?,pass= ?,status= ? ,id_p= ?,token= ?,token_refresh= ?  where id= ?',
            values: [account, pass, status, id_p, token, token_refresh, id],
        });
    } catch (error) {
        console.log(error);
    }

}

async function selectALL(id) {
    try {
        const result = await excuteQuery({
            query: 'select * from user ',
            values: [id],
        });
        return result;
    } catch (error) {
        return [];
    }
}
async function findByAccount(account) {
    try {
        const result = await excuteQuery({
            query: 'select * from user where account= ? ',
            values: [account],
        });
        return result;
    } catch (error) {
        return [];
    }
}







