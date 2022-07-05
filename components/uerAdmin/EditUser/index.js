import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { userService } from '../../../services/user.service';

import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux'
import { loadListUser } from '../../../Store/actions'



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const EditUser = (userChoose) => {
    const [openEditUser, setOpenEditUser] = useState(false);

    const [valueEditUser, setValueEditUser] = useState(null);
    const [city, setCIty] = useState([]);

    const [listStore, setListStore] = useState([]);

    const [listdisStrict, setListDisStrict] = useState([]);
    const [listWards, setLisWards] = useState([]);
    console.log(userChoose);
    console.log(valueEditUser)


    useEffect(() => {
        async function fetchData() {
            let data = await userService.getCitiDistrict({ key: "city" });
            if (data.status != 200) return;

            setCIty(data.city);
            setListStore(data.store.stores)
            // setDisStrict(data.district)

        }
        fetchData();
    }, []);



    const handleCloseEditUser = () => {
        setOpenEditUser(false);
    };
    const dispatch = useDispatch();


    const handleEditUser = async () => {

        if(valueEditUser.name=="")return  toast.error("chưa nhập họ và tên");
        if(valueEditUser.password=="")return  toast.error("chưa nhập  mật khẩu");
        const data = await userService.updateUser(valueEditUser);
        if (data.status == 200) {
            toast.success("Sửa thành công");
            dispatch(loadListUser(34));

            setOpenEditUser(false);
        } else {
            toast.error(data.message);
        }
    };

    useEffect(() => {
        setValueEditUser(userChoose);
    }, [userChoose])

    return {
        setOpenEditUser,
        renderEditUser: (<>
            <Dialog
                open={openEditUser}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEditUser}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Sửa thông tin thành viên</div>
                    <div className='form-editUser'>
                        {valueEditUser && <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField className='mb-1' fullWidth label="Họ và tên" variant="outlined"
                                        onChange={(e) => setValueEditUser({ ...valueEditUser, name: e.target.value })}
                                        value={valueEditUser.name}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className='mb-1' fullWidth label="Số điện thoại" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, phone: e.target.value })} disabled value={valueEditUser.phone} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className='mb-1' fullWidth label="Id thành viên" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, id_khataco: e.target.value })} value={valueEditUser.id_khataco} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className='mb-1' fullWidth label="Điểm thưởng" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, score: e.target.value })} value={valueEditUser.score} />
                                </Grid>

                                <Grid item xs={6}>

                                    <Autocomplete

                                        fullWidth
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        value={userChoose ? { name: userChoose.name_cityVT } : null}
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
                                            <TextField fullWidth {...params} label="Tỉnh thành" placeholder="Chọn Tỉnh thành phố" />
                                        )}
                                    // sx={{ width: '500px' }}
                                    />

                                </Grid>
                                <Grid item xs={6}>

                                    <Autocomplete

                                        fullWidth
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        value={userChoose ? { name: userChoose.name_districtVT } : null}
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
                                            <TextField fullWidth {...params} label="Quận huyện" placeholder="Chọn quận huyện" />
                                        )}
                                    // sx={{ width: '500px' }}
                                    />

                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        fullWidth
                                        limitTags={2}
                                        value={userChoose ? { name: userChoose.name_wardsVT } : null}
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
                                    // sx={{ width: '500px' }}
                                    />
                                </Grid>

                                <Grid item xs={6}>

                                    <Autocomplete
                                        fullWidth
                                        limitTags={2}
                                        value={userChoose.name_store ? { name: userChoose.name_store } : null}
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
                            <Button className='mr-2' onClick={(e) => handleEditUser()} variant="contained" style={{ background: "#EE0232" }}>Lưu thay đổi</Button>
                        </div>
                        <Button onClick={handleCloseEditUser} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default EditUser