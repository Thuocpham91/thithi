import React, { useState, useEffect } from 'react'
import AdminLayout from "../../../../layouts/Admin";

import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';



import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { userService } from '../../../../services/user.service';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const DialogChangemk = (props) => {

  useEffect(() => {
    async function fetchData() {

    }
    fetchData();



  }, []);


  // changePass



  const handleCloseDialog = () => {

    setValuesChangePass({
      newPassword: '',
      reNewPassword: '',
      showPassword: false,
    })
  };

  const [valuesChangePass, setValuesChangePass] = useState({
    newPassword: '',
    reNewPassword: '',
    showPassword: false,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseChangePass = async () => {
    console.log(props.row);
    console.log(valuesChangePass)

    const data=await userService.changePass(valuesChangePass);
    console.log(data)


  };


  return (<>


    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Đổi mật khẩu"}</DialogTitle>
      <DialogContent>


        <FormControl className='mb-3' sx={{ m: 1, }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={valuesChangePass.showPassword ? 'text' : 'password'}
            fullWidth
            onChange={(e) => {
              setValuesChangePass({ ...valuesChangePass, newPassword: e.target.value })
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {valuesChangePass.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-repassword">Nhập lại mật khẩu</InputLabel>
          <OutlinedInput
            id="outlined-adornment-repassword"
            type={valuesChangePass.showPassword ? 'text' : 'password'}
            onChange={(e) => {
              setValuesChangePass({ ...valuesChangePass, reNewPassword: e.target.value })
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={e => { }}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {valuesChangePass.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

      </DialogContent>
      <DialogActions className='mb-3'>
        <Button onClick={handleCloseChangePass} variant="contained" style={{ background: "#EE0232" }}>Thay đổi</Button>
        <Button onClick={e => { props.close(false) }} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy</Button>
      </DialogActions>
    </Dialog>




  </>)
}

export default DialogChangemk
