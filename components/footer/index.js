import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';




export default function Footer() {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const handleLink = (link) =>{
    router.push(link);
  }
  const handleActive = () =>{
    if(router.pathname == '/user'){
      setValue(3);
    }
    if(router.pathname == '/cart'){
      setValue(1);
    }
    
  }
  useEffect(() => {
    handleActive();
  },[]);

  return (
    <Box className='w-full footer'>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction onClick={e => handleLink('/')} label="Đặt hàng" icon={<HomeIcon />} />
        <BottomNavigationAction onClick={e => handleLink('/cart')} label="Giỏ hàng" icon={<LocalMallIcon />} />
        <BottomNavigationAction onClick={e => handleLink('/')} label="Thông báo" icon={<NotificationsIcon />} />
        <BottomNavigationAction onClick={e => handleLink('/user')} label="Cá nhân" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}