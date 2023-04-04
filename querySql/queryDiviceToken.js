import excuteQuery from '../config/db';



export const DeviceToken = {
    insert,
    update,
    selectByDeviceToken,
    selectByDevice_Token,
    selectByAppKey
    
};

async function insert(user_id,device_token,app_key,namefirebase) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO device_tokens(user_id,device_token,app_key,namefirebase) VALUES(?,?,?,?)',
            values: [user_id,device_token,app_key,namefirebase],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}



async function selectByAppKey(app_key) {

    try {
        const result = await excuteQuery({
            query: 'select * from device_tokens where app_key = ?  ',
            values: [app_key],
        });
        return result;
    } catch (error) {
      return null;
    }

}


async function selectByDeviceToken(app_key,namefirebase) {

    try {
        const result = await excuteQuery({
            query: 'select * from device_tokens where device_token = ?  and namefirebase=? ',
            values: [app_key,namefirebase],
        });
        return result;
    } catch (error) {
      return null;
    }

}

async function selectByDevice_Token(device_token) {

    try {
        const result = await excuteQuery({
            query: 'select * from device_tokens where device_token = ?  and namefirebase=? ',
            values: [device_token],
        });
        return result;
    } catch (error) {
      return null;
    }

}





async function update(ca) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE  device_tokens SET id_user=?,message=?,status=?,tile =?,namefirebase = ?  where id= ?',
            values: [ca.id, ca.message, ca.status,ca.tile,ca.id,ca.namefirebase],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}








