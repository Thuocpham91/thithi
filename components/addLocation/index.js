import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { userService } from '../../services/user.service';

import toast from "react-hot-toast";

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const EditUser = (dataUser, CallBack) => {
    const [openEditUser, setOpenEditUser] = useState(false);
    const [loading, setLoading] = useState(false);

    const [valueEditUser, setValueEditUser] = useState(null);
    const [city, setCIty] = useState([]);


    const [listdisStrict, setListDisStrict] = useState([]);
    const [listWards, setLisWards] = useState([]);

    const [listStore, setListStore] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let data = await userService.getCitiDistrict({ key: "city" });
            if (data.status != 200) return;

            setCIty(data.city);
            // setDisStrict(data.district)
            setListStore(data.store.stores)

        }
        fetchData();
    }, []);



    const handleCloseEditUser = () => {
        setOpenEditUser(false);
    };


    const handleEditUser = async () => {
        console.log(valueEditUser)

        if (!valueEditUser.id_store) return toast.success("Chưa chọn kho hàng");
        if (!valueEditUser.code_cityVT) return toast.success("Chưa Thành phố");
        if (!valueEditUser.id_districtVT) return toast.success("Chưa chọn quận huyện");

        if (!valueEditUser.id_wardsVT) return toast.success("Chưa chọn khu vực");


        setLoading(true)
        const data = await userService.updateUserCustom(valueEditUser);
        if (data.status == 200) {

            let dataUser = JSON.parse(localStorage.getItem('user'));
            dataUser.data = valueEditUser;

            localStorage.setItem('user', JSON.stringify(dataUser));
            setLoading(false);
            toast.success("Sửa thành công");
            setOpenEditUser(false);
            CallBack.CallBack();
        } else {
            setLoading(false)
            toast.error("Sửa thất bại!");
        }
    };

    useEffect(() => {


        const dataUser = JSON.parse(localStorage.getItem('user'));
        if (dataUser) setValueEditUser(dataUser.data);

    }, [dataUser])

    return {
        setOpenEditUser,
        renderAddLocation: (<>
            <Dialog
                open={openEditUser}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEditUser}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Thêm thông tin đặt hàng</div>
                    <div className='form-editUser'>
                        {valueEditUser && <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField className='mb-1' fullWidth label="Họ và tên" variant="outlined"
                                        onChange={(e) => setValueEditUser({ ...valueEditUser, name: e.target.value })}
                                        value={valueEditUser.name}
                                    />
                                </Grid>
                                {/* <Grid item xs={6}>
                                    <TextField className='mb-1' fullWidth label="Số điện thoại" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, phone: e.target.value })} disabled defaultValue={valueEditUser.phone} />
                                </Grid> */}
                                {/* <Grid item xs={6}>
                                    <TextField className='mb-1' fullWidth label="Id thành viên" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, idUser: e.target.value })} defaultValue={valueEditUser.id_khataco} />
                                </Grid> */}
                                {/* <Grid item xs={6}>
                                    <TextField className='mb-1' fullWidth label="Điểm thưởng" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, score: e.target.value })} defaultValue={valueEditUser.score} />
                                </Grid> */}

                                <Grid item xs={6}>

                                    <Autocomplete
                                        fullWidth
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        defaultValue={valueEditUser.name_cityVT ? { name: valueEditUser.name_cityVT } : null}
                                        onChange={async (item, value) => {
                                            if (!value) return;
                                            setValueEditUser({ ...valueEditUser, city: value.name, city_code: value.id, id_cityVT: value.id, code_cityVT: value.vtp_id, name_cityVT: value.name });
                                            let data = await userService.getCitiDistrict({ key: "district", id: value.id });
                                            if (data.status != 200) return;
                                            // const ds = disStrict.filter(item => { return value.matp == item.matp });
                                            setListDisStrict(data.city.districts);
                                        }}
                                        options={city}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} label="Tỉnh thành" placeholder="Chọn khu vực" />
                                        )}
                                    />

                                </Grid>
                                <Grid item xs={6}>

                                    <Autocomplete

                                        fullWidth
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        defaultValue={valueEditUser.name_districtVT ? { name: valueEditUser.name_districtVT } : null}
                                        onChange={async (item, value) => {

                                            if (!value) return;
                                            setValueEditUser({ ...valueEditUser, district: value.name, district_code: value.id, id_districtVT: value.id, code_districtVT: value.vtp_id, name_districtVT: value.name });
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
                                    />

                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        fullWidth
                                        limitTags={2}
                                        defaultValue={valueEditUser.name_wardsVT ? { name: valueEditUser.name_wardsVT } : null}
                                        id="multiple-limit-tags"
                                        onChange={async (item, value) => {
                                            if (!value) return;
                                            setValueEditUser({ ...valueEditUser, id_wardsVT: value.id, code_wardsVT: value.vtp_id, name_wardsVT: value.name });

                                        }}
                                        options={listWards}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} label="Khu vực" placeholder="Chọn khu vực" />
                                        )}
                                    />

                                </Grid>





                                <Grid item xs={6}>

                                    <Autocomplete
                                        fullWidth
                                        limitTags={2}
                                        defaultValue={valueEditUser.name_store ? { name: valueEditUser.name_store } : null}
                                        id="multiple-limit-tags"
                                        onChange={async (item, value) => {
                                            if (!value) return;
                                            setValueEditUser({ ...valueEditUser, id_store: value.id, code_: value.code, name_store: value.name });

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
                                    <TextField className='mb-1' fullWidth label="Địa chỉ giao hàng" variant="outlined" onChange={e => { setValueEditUser({ ...valueEditUser, address: e.target.value }) }} value={valueEditUser.address} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField className='mb-1' fullWidth label="Mô tả" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, description: e.target.value })} value={valueEditUser.description} />
                                </Grid>
                            </Grid>
                        </>}
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={(e) => handleEditUser()} variant="contained" style={{ background: "#EE0232" }}>Lưu thay đổi</Button>
                        </div>
                        <Button onClick={handleCloseEditUser} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>



            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
        )
    }
}

export default EditUser