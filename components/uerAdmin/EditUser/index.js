import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { userService } from '../../../services/user.service';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const EditUser = (userChoose) => {
    const [openEditUser, setOpenEditUser] = useState(false);

    const [valueEditUser, setValueEditUser] = useState(null);
    const [city, setCIty] = useState([]);

    const [disStrict, setDisStrict] = useState([]);

    const [listdisStrict, setListDisStrict] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let data = await userService.getCitiDistrict();
            if (data.status != 200) return;

            setCIty(data.citi);
            setDisStrict(data.district)

        }
        fetchData();
    }, []);



    const handleCloseEditUser = () => {
        setOpenEditUser(false);
    };


    const handleEditUser = async() => {
        console.log(valueEditUser);
        const data=await userService.updateUser(valueEditUser);
        console.log(data)
        setOpenEditUser(false);
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
                                    <TextField className='mb-1' fullWidth label="Id thành viên" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, idUser: e.target.value })} disabled value={valueEditUser.id_khataco} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className='mb-1' fullWidth label="Điểm thưởng" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, point: e.target.value })} value={valueEditUser.score} />
                                </Grid>

                                <Grid item xs={6}>

                                    <Autocomplete

                                        fullWidth
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        defaultValue={ city.find(item =>{return item.matp==valueEditUser.city_id})||null}
                                        onChange={(item, value) => {
                                            setValueEditUser({ ...valueEditUser, city: value.name, city_id: value.matp })
                                            const ds = disStrict.filter(item => { return value.matp == item.matp });
                                            setListDisStrict(ds);
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
                                        defaultValue={disStrict.find(item =>{return item.name==valueEditUser.name_district})|| null}
                                        onChange={(item, value) => {
                                            setValueEditUser({ ...valueEditUser, district: value.name, district_id: value.maqh })

                                        }}
                                        options={listdisStrict}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} label="Quận huyện" placeholder="Chọn khu vực" />
                                        )}
                                    // sx={{ width: '500px' }}
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField className='mb-1' fullWidth label="Mô tả" variant="outlined" onChange={(e) => setValueEditUser({ ...valueEditUser, description: e.target.value })} value={valueEditUser.description} />
                                </Grid>
                            </Grid>
                        </>}
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <Button className='mr-2' onClick={(e) => handleEditUser()} variant="contained" style={{ background: "#EE0232" }}>Lưu thay đổi</Button>
                        <Button onClick={handleCloseEditUser} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default EditUser