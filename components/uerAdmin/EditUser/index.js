import React, {useState,useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';


import TextField from '@mui/material/TextField';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const EditUser = (userChoose) => {
    const [openeditUser, setOpenEditUser] = useState(false);

    const [valueEditUser, setValueEditUser] = useState(null);

    const handleChangeEditUser = (prop) => (event) => {
        setValueEditUser({ ...valueEditUser, [prop]: event.target.value });
    };

    const handleCloseEditUser = () => {
        setOpenEditUser(false);
    };

    useEffect(() => {
        setValueEditUser(userChoose);
    }, [userChoose])

    return {
    setOpenEditUser,
    renderEditUser:(<>
            <Dialog
            open={openeditUser}
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
                            <TextField className='mb-1' fullWidth label="Họ và tên" variant="outlined" onChange={handleChangeEditUser('name')} value={valueEditUser.name}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Số điện thoại" variant="outlined" onChange={handleChangeEditUser('phoneNumber')} disabled value={valueEditUser.phoneNumber}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Id thành viên" variant="outlined" onChange={handleChangeEditUser('idUser')} disabled value={valueEditUser.idUser}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Điểm thưởng" variant="outlined" onChange={handleChangeEditUser('point')} value={valueEditUser.point}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className='mb-1' fullWidth label="Mô tả" variant="outlined" onChange={handleChangeEditUser('desc')} value={valueEditUser.desc}/>
                        </Grid>
                    </Grid>
                </>}
                </div>
                <div className='flex justify-center mt-8 mb-3'>
                <Button className='mr-2' onClick={handleCloseEditUser} variant="contained" style={{background:"#EE0232"}}>Lưu thay đổi</Button>
                <Button onClick={handleCloseEditUser} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy bỏ</Button>
                </div>
            </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default EditUser