import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton';


import Button from '@mui/material/Button';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';



import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { userService } from '../../../services/user.service';
import toast from 'react-hot-toast';


import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function showToastSuccess(pos, message) {
  toast.success(message, {
    position: pos,
    duration: 1000,
  });
}
function showToastEro(pos, message) {
  toast.error(message, {
    position: pos,
    duration: 1000,
  });
}

const ChangePass = (value) => {

  const [openChangePass, setOpenChangePass] = useState(false);

  const handleCloseChangePass = () => {
    setOpenChangePass(false);
    setValuesChangePass({
      newPassword: '',
      reNewPassword: '',
      showPassword: false,
    })
  };

  const [loading, setLoading] = useState(false);


  const handleChangePass = async () => {
    valuesChangePass.id = value.id;
    setLoading(true)

    if (valuesChangePass.newPassword != valuesChangePass.reNewPassword) return showToastEro('bottom-right', "Mật khẩu không khớp");


    const data = await userService.changePassAdmin(valuesChangePass);
    setLoading(false);


    if (data.status == "200") {
      showToastSuccess('bottom-right', "Thay đổi mật khẩu thành công");
      setOpenChangePass(false);

    } else {
      showToastEro('bottom-right', "Không thay đổi dk mật khẩu")
    }


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

  const handleClickShowPassword = () => {
    setValuesChangePass({
      ...valuesChangePass,
      showPassword: !valuesChangePass.showPassword,
    });
  };

  const handleChangeValueForm = (prop) => (event) => {
    setValuesChangePass({ ...valuesChangePass, [prop]: event.target.value });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return {
    setOpenChangePass,
    renderChangePass: (<>
      <Dialog
        open={openChangePass}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseChangePass}
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
                    onClick={handleClickShowPassword}
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
                    onClick={handleClickShowPassword}
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
        <DialogActions className='flex justify-center mb-3'>
          <div className='mr-4'>
            <Button onClick={(e) => handleChangePass()} variant="contained" style={{ background: "#EE0232" }}>Thay đổi</Button>
          </div>
          <Button onClick={handleCloseChangePass} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy</Button>
        </DialogActions>
      </Dialog>


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>)
  }
}

export default ChangePass