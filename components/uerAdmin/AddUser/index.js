import React, {useState} from 'react'
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



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const AddUser = () => {
    const [openAddUser, setOpenAddUser] = useState(false);
    const [valueAddUser, setValueAddUser] = useState({
    name:'',
    password:'',
    idUser:'',
    desc:'',
    phoneNumber:'',
    showPassword: false
    });

    const handleClickOpenAdduser = () => {
        setOpenAddUser(true);
    };

    const handleClickCloseAddUser = () => {
        setOpenAddUser(false);
    };


    const handleChangeAddUser = (prop) => (event) => {
    setValueAddUser({ ...valueAddUser, [prop]: event.target.value });
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
    renderAddUser:(<>
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
                        <TextField className='mb-1' fullWidth label="Họ và tên" variant="outlined" onChange={handleChangeAddUser('name')} value={valueAddUser.name}/>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className='mb-1' sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={valueAddUser.showPassword ? 'text' : 'password'}
                            value={valueAddUser.password}
                            onChange={handleChangeAddUser('password')}
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
                    <TextField className='mb-1' fullWidth label="Số điện thoại" variant="outlined" onChange={handleChangeAddUser('phoneNumber')} value={valueAddUser.phoneNumber}/>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField className='mb-1' fullWidth label="Id thành viên" variant="outlined" onChange={handleChangeAddUser('idUser')} value={valueAddUser.idUser}/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField className='mb-1' fullWidth label="Mô tả" variant="outlined" onChange={handleChangeAddUser('desc')} value={valueAddUser.desc}/>
                    </Grid>
                </Grid>
                </div>
                <div className='flex justify-center mt-8 mb-3'>
                <Button className='mr-2' onClick={handleClickCloseAddUser} variant="contained" style={{background:"#EE0232"}}>Thêm mới</Button>
                <Button onClick={handleClickCloseAddUser} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy bỏ</Button>
                </div>
            </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default AddUser