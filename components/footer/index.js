import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
export default function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <Box className='w-full footer'>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Đặt hàng" icon={<HomeIcon />} />
        <BottomNavigationAction label="Giỏ hàng" icon={<LocalMallIcon />} />
        <BottomNavigationAction label="Thông báo" icon={<NotificationsIcon />} />
        <BottomNavigationAction label="Cá nhân" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}