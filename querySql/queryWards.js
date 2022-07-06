import excuteQuery from '../config/db';



export const Wards = {
    insert,
    SelectAll,
    Delete,
    finByidDistrict,
};

async function insert(city_id, district_id, fullname, id, name, vtp_id) {

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO wards(city_id,district_id,fullname,id,name,vtp_id) VALUES(?,?,?,?,?,?)',
            values: [city_id, district_id, fullname, id, name, vtp_id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }

}


async function SelectAll() {
    try {
        const result = await excuteQuery({
            query: 'select * from wards',
            values: [code],
        });
        return result;
    } catch (error) {
        return [];
    }

}

async function finByidDistrict(id) {
    try {
        const result = await excuteQuery({
            query: 'select * from wards where district_id=?',
            values: [id],
        });
        return result;
    } catch (error) {
        return [];
    }

}

async function Delete() {
    try {
        const result = await excuteQuery({
            query: 'delete  from wards',
            values: [code],
        });
        return result;
    } catch (error) {
        return [];
    }

}




