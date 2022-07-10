import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

import { userService } from '../../services';

import { useSelector, useDispatch } from 'react-redux'
import { CountMessage } from '../../Store/actions'


export default function Footer() {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const count = useSelector((state) => state.countMessage);
  const dispatch = useDispatch();


  const handleLink = (link) => {
    router.push(link);
  }
  const handleActive = () => {
    if (router.pathname == '/user') {
      setValue(3);
    }
    if (router.pathname == '/cart') {
      setValue(1);
    }
    if (router.pathname == '/notification') {
      setValue(2);
    }

  }
  useEffect(() => {
    handleActive();
  }, []);



  useEffect(() => {
    async function getCategory() {
      const data = await userService.getCountNotification();
      if (data.status != 200) return;

      dispatch(CountMessage( data.data[0].number))
    }

    getCategory();

  }, []);

  // dispatch(setNotification(value));

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
        <BottomNavigationAction onClick={e => handleLink('/notification')} label="Thông báo" icon={<NotificationsIcon />} style={{ content: '2' }} />
        <BottomNavigationAction onClick={e => handleLink('/user')} label="Cá nhân" icon={<PersonIcon />} />
      </BottomNavigation>

      {count <= 0 ? "" : <style jsx global>{`
        .footer .MuiBottomNavigation-root button:nth-child(3){
          position: relative;
        }
        .footer .MuiBottomNavigation-root button:nth-child(3):after{
          content: '${count}';
          position: absolute;
          padding: 5px;
          background: #EE0232;
          height: 17px;
          width: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: #fff;
          font-weight: bold;
          top: 3px;
          right: 50%;
          transform: translateX(20px);
        }
      `}</style>
      }

    </Box>
  );
}