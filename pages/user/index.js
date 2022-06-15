import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image'
import Button from '@mui/material/Button';
import Head from 'next/head'





import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from '../../styles/Login.module.scss'
import CloseIcon from '@mui/icons-material/Close';

import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


const drawerBleeding = 0;
const Root = styled('div')(({ theme }) => ({
  height: '100%',
  borderRadius: '8px 8px 0 0',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));







const User = (props) => {

  const listGift = [
    { id: 1, name: 'Nồi cơm điện Mutosi MR-16R', poit: 200000, image: '/images/gift-1.png' },
    { id: 2, name: 'Lò vi sóng Sharp R-G225VN-BK', poit: 300000, image: '/images/gift-2.png' },
    { id: 3, name: 'Nồi cơm điện Mutosi MR-16R', poit: 200000, image: '/images/gift-1.png' },
    { id: 4, name: 'Lò vi sóng Sharp R-G225VN-BK', poit: 300000, image: '/images/gift-2.png' },
    { id: 5, name: 'Nồi cơm điện Mutosi MR-16R', poit: 200000, image: '/images/gift-1.png' },
    { id: 6, name: 'Lò vi sóng Sharp R-G225VN-BK', poit: 300000, image: '/images/gift-2.png' },
  ]
  const [init, setInit] = useState({});


  useEffect(() => {

    const data = JSON.parse(localStorage.getItem('user'));
    if (!data) return;
    setInit(data.data);



  })




  const { window } = props;
  const [openRules, setOpenRules] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const toggleDrawer = (newOpen) => () => {
    setOpenRules(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;






  return (<>
    <Head>
      <title>Thông tin</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="robots" content="noindex" />
      <meta property="og:title" content="Khatoco" />
      <meta property="og:description" content="Conng ty Khatoco" />
      <meta property="og:site_name" content="Khatoco" />
    </Head>
    <Root>
      <div className='main-body body-f2f2f2'>
        <div className='title-page'>
          Thông tin cá nhân
        </div>
        <div className='body-user'>
          <div>
            <p><span>Tên đại lý:</span> <i>{init.name}</i></p>
            <p><span>Mã ID đại lý:</span> <i>{init.id_khataco}</i></p>
            <p><span>Số điện thoại:</span> <i>{init.phone}</i></p>

            
            <p><span>Địa chỉ giao hàng:</span> <i>{init.address}</i></p>
          </div>
        </div>
        <div className='text-center m-4'>
          <Button onClick={toggleDrawer(true)} variant="contained" style={{ background: "#EE0232" }} >Đổi điểm</Button>
        </div>



        <Footer />

        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(100% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />

        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={openRules}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className='user-promotion' style={{ height: '100% !important' }}>
            <div className="coupon-form--title">Tích điểm đổi quà <CloseIcon onClick={toggleDrawer(false)} /></div>
            <div className="coupon-form--content body-f2f2f2">
              <div className='main-user text-center'  >
                <div>
                  <h5><i>Kính chào</i> anh Phước</h5>
                  <p>Điểm tích lũy:</p>
                  <p><h2>12.000</h2> điểm</p>
                </div>
              </div>
              <div className='list-gift grid  grid-cols-2 md:grid-cols-3 gap-4'>
                {listGift.map(function (d, idx) {
                  return (
                    <div key={idx} className="item-gift">
                      <span>
                        <Image
                          alt={d.title}
                          src={d.image}
                          layout='fill'
                          objectFit='contain'
                          quality={100}
                        />
                      </span>
                      <h3>{d.poit.toLocaleString()} điểm</h3>
                      <p>{d.name}</p>
                      <Button variant="outlined" style={{ border: '1px solid', color: '#23432E', textTransform: 'initial', fontWeight: 'bold' }} >Đổi điểm</Button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </SwipeableDrawer>
      </div>
    </Root>
  </>)
}

export default User