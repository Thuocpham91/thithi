import excuteQuery from '../config/db';

export async function insert_Acountvietteel(account, token, pass, access_token_expired_at) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO AccountViettell(account,token,passs,access_token_expired_at) VALUES(?,?,?,?)',
            values: [account, token, pass, access_token_expired_at],
        });
    } catch (error) {
        console.log(error);
    }

}

export async function update_Acountvietteel(token, access_token_expired_at) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  AccountViettell SET token=?,access_token_expired_at= ? where id= 1',
            values: [token, access_token_expired_at],
        });
    } catch (error) {
        console.log(error);
    }

}

export async function select_Acountvietteel(id) {
    try {
        const result = await excuteQuery({
            query: 'select * from AccountViettell where id= ?',
            values: [id],
        });
        return result;
    } catch (error) {
        return [];
    }

}



