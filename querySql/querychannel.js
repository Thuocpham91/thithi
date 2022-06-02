import excuteQuery from '../config/db';

export async function insert_Channel(name, token, status, channel_id,access_token_expired_at) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO channel(name,token,status,channel_id,access_token_expired_at) VALUES(?,?,?,?,?)',
            values: [name, token, status, channel_id,access_token_expired_at],
        });
    } catch (error) {
        console.log(error);
    }

}

export async function update_Channel(token, access_token_expired_at,id_chanel) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  channel SET token=?,access_token_expired_at= ? where id= ?',
            values: [token, access_token_expired_at,id_chanel],
        });
    } catch (error) {
        console.log(error);
    }

}

export async function select_Channel(id) {
    try {
        const result = await excuteQuery({
            query: 'select * from channel ',
            values: [id],
        });
        return result;
    } catch (error) {
        return [];
    }

}
export async function select_Channel_product_id(channel_id) {
    try {
        const result = await excuteQuery({
            query: 'select * from channel  where channel_id=? ',
            values: [channel_id],
        });
        return result;
    } catch (error) {
        return [];
    }

}




