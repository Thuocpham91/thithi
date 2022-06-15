import excuteQuery from '../config/db';



export const UserRole = {
    findByID,

};

async function insert(status, role_id, user_id) {
    try {
        const result = await excuteQuery({
            query: 'INSERT INTO user_role(status,role_id,user_id) VALUES(?,?,?)',
            values: [status, role_id, user_id, id_p],
        });
    } catch (error) {
        console.log(error);
    }

}

async function update(id, astatus, role_id, user_id) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  user SET astatus=?,role_id= ?,user_id= ?   where id= ?',
            values: [astatus, role_id, user_id, id],
        });
    } catch (error) {
        console.log(error);
    }

}

async function findByID(id_user) {
    try {
        const result = await excuteQuery({
            query: 'SELECT ur.id, r.name,r.key_role   FROM user_role ur  LEFT JOIN `role` r  ON r.id = ur.role_id and ur.user_id = ?  ',
            values: [id_user],
        });
        return result;
    } catch (error) {
        return [];
    }
}









