import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';


export default function HeaderAdmin() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const router = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    localStorage.removeItem('user');

    router.push('/login');

  }


  const [init, setInit] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    if (!data) return;
    setInit(data.data);
    if (data.data.id_role != 1) {

      toast.error("Quý đại lý không có quền truy cập", {
        position: 'top-center',
        duration: 1000,
      });
      router.push('/');
    }
  }, [])
  


  return (<div className='header-admin flex justify-end'>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Tooltip title="Thông tin tài khoản">

        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >{init.name &&<>
          <Avatar sx={{ width: 32, height: 32 }}> {init.name.substring(0, 1)}</Avatar>
        </>}

        </IconButton>
      </Tooltip>
    </Box>
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <Avatar /> {init.account}
      </MenuItem>
      <Divider />

      <MenuItem onClick={e => handleLogout()}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  </div>);
}
