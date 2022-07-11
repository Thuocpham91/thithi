import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer'

import Image from 'next/image'
import Button from '@mui/material/Button';
import Head from 'next/head'


import CloseIcon from '@mui/icons-material/Close';

import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { productService } from '../../services/product.service';
import toast from 'react-hot-toast';

import Promotion from "../../components/user/Promotion";

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


const drawerBleeding = 50;
const Root = styled('div')(({ theme }) => ({
  height: '100%',
  borderRadius: '8px 8px 0 0',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));


const loadImg = ({ src }) => {
  return `http://202.92.6.221:3000${src}`
}
const link_Image = "http://202.92.6.221:7005";

function showToast(pos, message) {
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



const User = (props) => {

  const [listGif, setListGif] = useState([

  ]);
  const [init, setInit] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    if (!data) return;
    setInit(data.data);

  }, [])

  useEffect(() => {
    async function fetchData() {
      let data = await productService.getGift();
      console.log(data)
      if (data.status != 200) return;
      setListGif(data.data);
    }
    fetchData();
  }, [])

  const { window } = props;
  const [openRules, setOpenRules] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const toggleDrawer = (newOpen) => () => {
    setOpenRules(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;
  const [loading, setLoading] = useState(false);


  const checkChangePoint = async (d) => {
    let data = JSON.parse(localStorage.getItem('user'));
    const poin = data.data.score ? data.data.score : 0;

    const scoreU = d.score ? d.score : 0;
    if (Number(scoreU) > Number(poin)) return showToastEro('bottom-center', "Quý Đại lý chưa đủ điểm");

    setLoading(true);
    const doks = await productService.changePoin(d);
    setLoading(false);
    if (doks.status == 200) {
      showToast('bottom-center', "Đổi điểm thành công");
      data.data.score = doks.user.score;
      localStorage.setItem('user', JSON.stringify(data));
      setInit(data.data);

    } else {
      showToastEro('bottom-center', doks.message);
    }


  }

  const [dChoose, setDChoose] = useState({});
  const { setOpenPromotion, renderPromotion } = Promotion(checkChangePoint = { checkChangePoint }, dChoose = { dChoose });

  const handlePromotion = (d) => {
    setOpenPromotion(true);
    setDChoose(d);
  }



  return (<>
    <Head>
      <title>Thông tin</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="robots" content="noindex" />
      <meta property="og:title" content="Khatoco" />
      <meta property="og:description" content="Conng ty Khatoco" />
      <meta property="og:site_name" content="Khatoco" />
      <meta name="zalo-platform-site-verification" content="QCVl8hRLIoDyefjzjgmoMKlIatsdea4ZC3S" />
    </Head>
    <Root>
      <div className='main-body body-f2f2f2'>
        {/* <div className='title-page'>
          Thông tin cá nhân
        </div> */}
        <div className='body-user'>
          <div>
            <p><span>Tên đại lý:</span> <i>{init.name}</i></p>
            <p><span>Mã ID đại lý:</span> <i>{init.id_khataco}</i></p>
            <p><span>Số điện thoại:</span> <i>{init.phone}</i></p>
            <p><span>Địa chỉ giao hàng:</span> <i>{init.address}</i></p>
            <p><span>Nhà phân phối:</span> <i>{init.name_store}</i></p>
            <p><span>Điểm tích lũy:</span> <i>{init.score ? init.score.toLocaleString() : 0} điểm</i></p>
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
          <div className='user-promotion' style={{ height: '90% !important' }}>
            <div className="coupon-form--title"><CloseIcon onClick={toggleDrawer(false)} /> Tích điểm </div>
            <div className="coupon-form--content body-f2f2f2">
              <div className='main-user text-center'  >
                <div>
                  <h5><i>Kính chào </i>{init.name}</h5>
                  <p>Điểm tích lũy:</p>
                  <p><strong>{init.score ? init.score.toLocaleString() : 0} </strong>&nbsp;điểm</p>
                </div>
              </div>
              <div className='list-gift grid  grid-cols-2 md:grid-cols-3 gap-4 w-full'>
                {listGif.map(function (d, idx) {
                  return (
                    <div key={idx} className="item-gift">
                      <span>
                        <Image
                          // loader={loadImg
                          unoptimized
                          loader={loadImg}
                          alt={d.title}
                          src={d.url ? (link_Image + d.url) : '/images/list-cate/Marlboro.png'}

                          layout='fill'
                          objectFit='contain'
                          quality={100}
                        />
                      </span>
                      <h3>{d.score.toLocaleString()} điểm</h3>
                      <p>{d.name}</p>
                      {/* <Button onClick={e => checkChagePoin(d)} variant="outlined" style={{ border: '1px solid', color: '#23432E', textTransform: 'initial', fontWeight: 'bold' }} >Đổi điểm</Button> */}
                      <Button onClick={e => handlePromotion(d)} variant="outlined" style={{ border: '1px solid', color: '#23432E', textTransform: 'initial', fontWeight: 'bold' }} >Đổi điểm</Button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </SwipeableDrawer>
      </div>
      {renderPromotion}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Root>
  </>)
}

export default User