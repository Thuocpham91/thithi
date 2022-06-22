import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { userService} from '../../../services/user.service';
import Button from '@mui/material/Button';

const AddUserLoginZalo = () => {
    const [openAddUserLoginZalo, setOpenAddUserLoginZalo] = useState(false);

    const [valueAddUser, setValueAddUser] = useState({
        name: '',
        password: '',
        idUser: '',
        desc: '',
        phoneNumber: '',
        city: "",
        city_code: "",
        district: "",
        district_code: "",
        address: "",
        id_cityVT:"",
        code_cityVT:"",
        name_cityVT:"",
        id_districtVT:"",
        code_districtVT:"",
        name_districtVT:"",
        id_wardsVT:"",
        code_wardsVT:"",
        name_wardsVT:"",
    });

    const [city, setCIty] = useState([]);
    const [disStrict, setDisStrict] = useState([]);

    const [listdisStrict, setListDisStrict] = useState([]);
    const [listWards, setLisWards] = useState([]);

    useEffect(() => {

        async function fetchData() {
            let data = await userService.getCitiDistrict( {key:"city"});
            if (data.status != 200) return;

            setCIty(data.city);
            // setDisStrict(data.district)

        }
        fetchData();
    }, []);
    

    return {
        setOpenAddUserLoginZalo,
        renderAddUserLoginZalo: (<>
            <div className={openAddUserLoginZalo ? 'popup-add-user active' : 'popup-add-user'}>
                <div className='add-user--main'>
                    <div className='add-user--main__header'>Nhập thông tin thành viên</div>
                    <div className='add-user--main__body'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Số điện thoại" variant="outlined" onChange={e => { setValueAddUser({ ...valueAddUser, phoneNumber: e.target.value }) }} value={valueAddUser.phoneNumber} />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    onChange={async(item, value) => {
                                      
                                        if (!value)return;
                                        setValueAddUser({ ...valueAddUser, city: value.name,city_code:value.id,id_cityVT:value.id,code_cityVT:value.vtp_id,name_cityVT:value.name });
                                        let data = await userService.getCitiDistrict( {key:"district",id:value.id});
                                        if (data.status != 200) return;
                                        // const ds = disStrict.filter(item => { return value.matp == item.matp });
                                        setListDisStrict(data.city.districts);
                                    }}
                                    options={city}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} label="Tỉnh thành" placeholder="Chọn khu vực" />
                                    )}
                                // sx={{ width: '500px' }}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    onChange={async(item, value) => {
                                        if (!value)return;
                                        setValueAddUser({ ...valueAddUser, district: value.name,district_code:value.id,id_districtVT:value.id,code_districtVT:value.vtp_id,name_districtVT:value.name });
                                        let data = await userService.getCitiDistrict( {key:"wards",id:value.id});
                                        if (data.status != 200) return;
                                        // const ds = disStrict.filter(item => { return value.matp == item.matp });
                                        setLisWards(data.city.wards);
                                      

                                    }}
                                    options={listdisStrict}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} label="Quận huyện" placeholder="Chọn khu vực" />
                                    )}
                                // sx={{ width: '500px' }}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    onChange={async(item, value) => {
                                        if (!value)return;
                                        setValueAddUser({ ...valueAddUser, id_wardsVT:value.id,code_wardsVT:value.vtp_id,name_wardsVT:value.name });
                                      
                                    }}
                                    options={listWards}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} label="Khu vực" placeholder="Chọn khu vực" />
                                    )}
                                // sx={{ width: '500px' }}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField className='mb-1' fullWidth label="Địa chỉ giao hàng" variant="outlined" onChange={e => { setValueAddUser({ ...valueAddUser, address: e.target.value }) }} value={valueAddUser.address} />
                            </Grid>
                        </Grid>
                        <div className='flex justify-center mt-8 mb-3'>
                            <Button variant="contained" style={{ background: "#EE0232" }}>Cập nhật</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default AddUserLoginZalo