import excuteQuery from '../config/db';



export const User = {
    findByAccount,
    update,
    selectALL,
    countUser,
    updatePass,
    findBId,


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

async function updatePass(pass,id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  user SET password= ?  where id= ?',
            values: [pass,id],
        });
    } catch (error) {
        console.log(error);
    }

}

async function selectALL() {
    try {
        const result = await excuteQuery({
            query: 'SELECT ur.account,ur.status,ur.id_khataco ,ur.score,ur.phone,ur.description ,us.name ,us.key_role,ur.created_at  FROM user ur  LEFT JOIN `role` us ON  us.id = ur.id_role',
           
        });
        return result;
    } catch (error) {
        return [];
    }
}

async function selectRole() {
    try {
        const result = await excuteQuery({
            query: 'SELECT us.* , r.name, r.key_role FROM user_role ur RIGHT JOIN `user` us ON  us.id = ur.user_id  LEFT JOIN `role` r  ON r.id = ur.role_id ',
        });
        return result;
    } catch (error) {
        return [];
    }
}

async function findByAccount(account) {
    try {
        const result = await excuteQuery({
            query: 'SELECT ur.* , us.* FROM user ur  LEFT JOIN `role` us ON  us.id = ur.id_role  where account= ? ',
            values: [account],
        });
        return result[0];
    } catch (error) {
        return null;
    }
}

async function findBId(account) {
    try {
        const result = await excuteQuery({
            query: 'select * from user where id= ? ',
            values: [account],
        });
        return result[0];
    } catch (error) {
        return null;
    }
}

async function countUser(account) {
    try {
        const result = await excuteQuery({
            query: 'SELECT COUNT(id) AS numberUser FROM user ',
            values: [account],
        });
        return result[0];
    } catch (error) {
        return null;
    }
}









