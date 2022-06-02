import excuteQuery from '../config/db';



export const User = {
    findByAccount,
    update,

};

async function insert_User(account, password, status, id_p, token, token_refresh) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO user(account,password,status,id_p,token,token_refresh) VALUES(?,?,?,?,?,?)',
            values: [account, password, status, id_p, token, token_refresh],
        });
    } catch (error) {
        console.log(error);
    }

}

async function update(user) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  user SET account=?,password= ?,status= ? ,id_p= ?,token= ?,token_refresh= ?  where id= ?',
            values: [user.account, user.password, user.status, user.id_p, user.token, user.token_refresh, user.id],
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
        return result[0];
    } catch (error) {
        return null;
    }
}









