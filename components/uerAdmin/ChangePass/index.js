import React, {useState} from 'react'

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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const ChangePass = () => {

    const [openChangePass, setOpenChangePass] = useState(false);

      const handleCloseChangePass = () => {
        setOpenChangePass(false);
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
        renderChangePass:(<>
            <Dialog
                open={openChangePass}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseChangePass}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Đổi mật khẩu"}</DialogTitle>
                <DialogContent>


                <FormControl className='mb-3' sx={{ m: 1,  }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-password"
                    type={valuesChangePass.showPassword ? 'text' : 'password'}
                    value={valuesChangePass.newPassword}
                    fullWidth
                    onChange={handleChangeValueForm('newPassword')}
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
                    value={valuesChangePass.reNewPassword}
                    onChange={handleChangeValueForm('reNewPassword')}
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
                <DialogActions className='mb-3'>
                <Button onClick={handleCloseChangePass} variant="contained" style={{background:"#EE0232"}}>Thay đổi</Button>
                <Button onClick={handleCloseChangePass} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy</Button>
                </DialogActions>
            </Dialog>
        </>)
    }
}

export default ChangePass