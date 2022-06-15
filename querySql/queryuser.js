import excuteQuery from '../config/db';



export const User = {
    findByAccount,
    update,
    selectALL,
    countUser,
    updatePass,
    findBId,
    insert_User,
    deleteUser,
    updatetoken,


};

async function insert_User(account,password,status,id_khataco,token,token_refresh,score,id_role,phone,description,city_id,district_id,name) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO user(account,password,status,id_khataco,token,token_refresh,score,id_role,phone,description,city_id,district_id,name) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
            values: [account,password,status,id_khataco,token,token_refresh,score,id_role,phone,description,city_id,district_id,name],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}



async function update(user) {
    console.log(user)
    try {
        const result = await excuteQuery({
            query: 'UPDATE  user SET token=?,token_refresh=?,account=?,status= ? ,id_khataco= ?,score= ?,id_role= ?,phone= ? ,description= ? ,city_id= ? ,district_id= ?,name= ?    where id= ?',
            values: [user.token,user.token_refresh,user.phone, user.status, user.id_khataco,user.score, user.id_role,  user.phone,user.description,user.city_id,user.district_id,user.name,user.id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}

async function updatetoken(user) {
    console.log(user)
    try {
        const result = await excuteQuery({
            query: 'UPDATE  user SET token=?,token_refresh=?  where id= ?',
            values: [user.token,user.token_refresh,user.id],
        });
        return result;
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


async function deleteUser(id) {
    try {
        const result = await excuteQuery({
            query: 'delete from  user   where id= ?',
            values: [id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}

async function selectALL() {
    try {
        const result = await excuteQuery({
            query: 'SELECT ur.id,ur.account,ur.status,ur.id_role,ur.id_khataco,ur.city_id,ur.district_id,ur.name,ur.phone ,ur.score,ur.phone,ur.description ,us.name as name_role ,us.key_role,uk.name as name_city,ut.name as name_district,ur.created_at  FROM user ur   LEFT JOIN `role` us ON  us.id = ur.id_role LEFT JOIN `city` uk ON  uk.matp = ur.city_id  LEFT JOIN `district` ut ON  ut.maqh  = ur.district_id ',
           
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
            query: 'SELECT ur.* , us.key_role,us.name as name_role FROM user ur  LEFT JOIN `role` us ON  us.id = ur.id_role  where account= ? ',
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









