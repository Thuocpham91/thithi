import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Autocomplete from '@mui/material/Autocomplete';

import { userService } from '../../../services/user.service';

import toast from "react-hot-toast";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AddUser = (props) => {
    const [openAddUser, setOpenAddUser] = useState(false);
    const [valueAddUser, setValueAddUser] = React.useState({
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
        showPassword: false,
        id_cityVT: "",
        code_cityVT: "",
        name_cityVT: "",
        id_districtVT: "",
        code_districtVT: "",
        name_districtVT: "",
        id_wardsVT: "",
        code_wardsVT: "",
        name_wardsVT: "",
        id_store: "",
        name_store: "",

    });

    const [city, setCIty] = useState([]);

    const [listStore, setListStore] = useState([]);
    const [listdisStrict, setListDisStrict] = useState([]);
    const [listWards, setLisWards] = useState([]);

    useEffect(() => {

        async function fetchData() {
            let data = await userService.getCitiDistrict({ key: "city" });
            if (data.status != 200) return;
            console.log(data)

            setCIty(data.city);
            // setDisStrict(data.district)
            setListStore(data.store.stores)

        }
        fetchData();
    }, []);



    const handleClickOpenAdduser = () => {
        setOpenAddUser(true);
    };

    const handleClickCloseAddUser = () => {
        setOpenAddUser(false);
    };

    const handleClickAddUser = async () => {

        const datah = await userService.addUser(valueAddUser);

        if(valueAddUser.name=="")return  toast.error("chưa nhập họ và tên");
        if(valueAddUser.password=="")return  toast.error("chưa nhập  mật khẩu");

        if (datah.status == 200) {
            toast.success("Thêm thành viên thành công");
            setOpenAddUser(false);
            props.fetchData();
        } else {
            toast.error("Có lỗi ở đây!");
        }
    };


    const handleClickShowPasswordAddUser = () => {
        setValueAddUser({
            ...valueAddUser,
            showPassword: !valueAddUser.showPassword,
        });
    };

    const handleMouseDownPasswordAddUser = (event) => {
        event.preventDefault();
    };


    return {
        setOpenAddUser,
        renderAddUser: (<>
            <Dialog
                open={openAddUser}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickCloseAddUser}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Thêm thành viên</div>
                    <div className='form-adduser'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Họ và tên" 
                                  required={true}
                                variant="outlined" onChange={e => { setValueAddUser({ ...valueAddUser, name: e.target.value }) }} value={valueAddUser.name} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className='mb-1' sx={{ width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        required={true}
                                        type={valueAddUser.showPassword ? 'text' : 'password'}
                                        value={valueAddUser.password}
                                        onChange={e => { setValueAddUser({ ...valueAddUser, password: e.target.value }) }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordAddUser}
                                                    onMouseDown={handleMouseDownPasswordAddUser}
                                                    edge="end"
                                                >
                                                    {valueAddUser.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Mật khẩu"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Số điện thoại" variant="outlined" onChange={e => { setValueAddUser({ ...valueAddUser, phoneNumber: e.target.value }) }} value={valueAddUser.phoneNumber} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Id thành viên" variant="outlined" onChange={e => { setValueAddUser({ ...valueAddUser, idUser: e.target.value }) }} value={valueAddUser.idUser} />
                            </Grid>



                            <Grid item xs={6}>

                                <Autocomplete

                                    fullWidth
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    onChange={async (item, value) => {

                                        if (!value) return;
                                        setValueAddUser({ ...valueAddUser, city: value.name, city_code: value.id, id_cityVT: value.id, code_cityVT: value.vtp_id, name_cityVT: value.name });
                                        let data = await userService.getCitiDistrict({ key: "district", id: value.id });
                                        console.log(data)
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
                                    onChange={async (item, value) => {
                                        if (!value) return;
                                        setValueAddUser({ ...valueAddUser, district: value.name, district_code: value.id, id_districtVT: value.id, code_districtVT: value.vtp_id, name_districtVT: value.name });
                                        let data = await userService.getCitiDistrict({ key: "wards", id: value.id });
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
                                    onChange={async (item, value) => {
                                        if (!value) return;
                                        setValueAddUser({ ...valueAddUser, id_wardsVT: value.id, code_wardsVT: value.vtp_id, name_wardsVT: value.name });

                                    }}
                                    options={listWards}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} label="Khu vực" placeholder="Chọn khu vực" />
                                    )}
                                // sx={{ width: '500px' }}
                                />

                            </Grid>


                            <Grid item xs={6}>

                                <Autocomplete
                                    fullWidth
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    onChange={async (item, value) => {
                                        if (!value) return;
                                        setValueAddUser({ ...valueAddUser, id_store: value.id, code_: value.code, name_store: value.name });

                                    }}
                                    options={listStore}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} label="Chọn kho hàng" placeholder="Kho hàng" />
                                    )}
                                // sx={{ width: '500px' }}
                                />

                            </Grid>

                            <Grid item xs={12}>
                                <TextField className='mb-1' fullWidth label="Địa chỉ giao hàng" variant="outlined" onChange={e => { setValueAddUser({ ...valueAddUser, address: e.target.value }) }} value={valueAddUser.address} />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField className='mb-1' fullWidth label="Mô tả" variant="outlined" onChange={e => { setValueAddUser({ ...valueAddUser, desc: e.target.value }) }} value={valueAddUser.desc} />
                            </Grid>


                        </Grid>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={e => handleClickAddUser()} variant="contained" style={{ background: "#EE0232" }}>Thêm mới</Button>
                        </div>
                        <Button onClick={handleClickCloseAddUser} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default AddUser