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
    findCityCode,
    findCityVTCode,
    


};

async function insert_User(account,password,status,id_khataco,token,token_refresh,score
    ,id_role,phone,description,city_id,district_id,name,address
    ,id_cityVT,code_cityVT,name_cityVT,id_districtVT,code_districtVT,name_districtVT,id_wardsVT,code_wardsVT,name_wardsVT,id_store,name_store) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO user(account,password,status,id_khataco,token,token_refresh,score,id_role,phone,description,city_id,district_id,name,address,id_cityVT,code_cityVT,name_cityVT,id_districtVT,code_districtVT,name_districtVT,id_wardsVT,code_wardsVT,name_wardsVT,id_store,name_store) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            values: [account,password,status,id_khataco,token,token_refresh,score,id_role,phone,description,city_id,district_id,name,address,id_cityVT,code_cityVT,name_cityVT,id_districtVT,code_districtVT,name_districtVT,id_wardsVT,code_wardsVT,name_wardsVT,id_store,name_store],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}



async function update(user) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  user SET token=?,token_refresh=?,account=?,status= ? ,id_khataco= ?,score= ?,id_role= ?,phone= ? ,description= ? ,city_id= ? ,district_id= ?,name= ? ,id_cityVT=?,code_cityVT=?,name_cityVT=?,id_districtVT=?,code_districtVT=?,name_districtVT=?,id_wardsVT=?,code_wardsVT=?,name_wardsVT=? ,id_store=?,name_store=?  where id= ?',
            values: [user.token,user.token_refresh,user.phone, user.status, user.id_khataco,user.score, user.id_role,  user.phone,user.description,user.city_id,user.district_id,user.name,user.id_cityVT,user.code_cityVT,user.name_cityVT,user.id_districtVT,user.code_districtVT,user.name_districtVT,user.id_wardsVT,user.code_wardsVT,user.name_wardsVT ,user.id_store,user.name_store,user.id ],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}

async function updatetoken(user) {
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
            query: 'SELECT ur.id,ur.account,ur.status,ur.id_role,ur.id_khataco,ur.city_id,ur.district_id,ur.name,ur.phone ,ur.score,ur.phone,ur.description ,us.name as name_role ,us.key_role,uk.name as name_city,ut.name as name_district,ur.created_at, ur.id_cityVT,ur.code_cityVT,ur.name_cityVT,ur.id_districtVT,ur.code_districtVT,ur.name_districtVT,ur.id_wardsVT,ur.code_wardsVT,ur.name_wardsVT FROM user ur   LEFT JOIN `role` us ON  us.id = ur.id_role LEFT JOIN `city` uk ON  uk.matp = ur.city_id  LEFT JOIN `district` ut ON  ut.maqh  = ur.district_id order by created_at  DESC ',
           
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

async function findCityCode(city_id) {
    try {
        const result = await excuteQuery({
            query: 'select * from user where city_id= ? ',
            values: [city_id],
        });
        return result;
    } catch (error) {
        return [];
    }
}

async function findCityVTCode(city_id) {
    try {
        const result = await excuteQuery({
            query: 'select * from user where id_cityVT= ? ',
            values: [city_id],
        });
        return result;
    } catch (error) {
        return [];
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









