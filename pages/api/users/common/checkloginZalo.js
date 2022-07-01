import axios from 'axios'
import { insert_Acountvietteel, update_Acountvietteel, select_Acountvietteel } from '../../../../querySql/queryAccountViettell';


export const loginZalo = {
    checkLoginZalo,


};



async function checkLoginZalo(code) {

    try {

        const scret = "fB76ajaBnW77wScSHStX";
        const apID = "809218530111061135";

        const verifile = "NTIy55xUD93I1EztevfO7oV0CsbQKgZp7YENNIKGd3s";
        const code_change = "sZMEoTR4B0SmEHdi3CjKuJtNoY9bV5LK7UPb3p4RLCg";
        const state = "sZMEoTR4B0SmEHdi3CjKuJt"

        const dsd="https://oauth.zaloapp.com/v4/permission?app_id=809218530111061135&redirect_uri=https://ktcshop.top/login&code_challenge=sZMEoTR4B0SmEHdi3CjKuJtNoY9bV5LK7UPb3p4RLCg&state=sZMEoTR4B0SmEHdi3CjKuJt";

        const url = "https://oauth.zaloapp.com/v4/access_token";
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'secret_key': scret,

            },
            responseType: 'json'
        };

        const queryString = new URLSearchParams();

        queryString.append('code', code);
        queryString.append('app_id', apID);
        queryString.append('grant_type', "authorization_code");
        queryString.append('code_verifier', verifile);
     
        const rp = await axios.post(url, queryString, config);


        return null;


    } catch (orro) {
        console.log(orro)
        return null

    }


}







