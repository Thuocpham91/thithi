import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from '../../styles/Login.module.scss'
import CloseIcon from '@mui/icons-material/Close';

import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { productService } from '../../services/product.service';
import { compareAsc, format } from 'date-fns'
import parseISO from 'date-fns/parseISO';

const drawerBleeding = 0;
const Root = styled('div')(({ theme }) => ({
  height: '100%',
  borderRadius: '8px 8px 0 0',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));



export default function FooterCart(props) {

  const [listGoCoupon, setGoListCoupon] = useState([]);


  const { window } = props;
  const [openRules, setOpenRules] = useState(false);
  const [textSearch, settextSearch] = useState("");
  const [codeapp, setcodeAp] = useState("");
  const toggleDrawer = () => {
    if (textSearch == "") return setListCoupon(listGoCoupon);
    const data = listCoupon.filter(item => { return item.code == textSearch });
    setListCoupon(data)


  };
  const handleAcept = async () => {

    const dataOrder = localStorage.getItem('dataCart');

    const data = await productService.postOder(dataOrder);



  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;


  const [listCoupon, setListCoupon] = useState([
    // { id: 1, key: 'NN6', name: 'Ngựa nhỏ', title: '3c - 5g', expiry: '18.04 - hết 30.04', timesOfUse: 5, timesUsed: 3, active: 1 },
    // { id: 2, key: 'NN7', name: 'Ngựa Lớn', title: '1c - 6g', expiry: '18.05 - hết 30.05', timesOfUse: 8, timesUsed: 1, active: 2 },
    // { id: 3, key: 'NN8', name: 'Ngựa nhỏ 2', title: '12c - 8g', expiry: '18.03 - hết 30.05', timesOfUse: 5, timesUsed: 3, active: 3 },
    // { id: 4, key: 'NN9', name: 'Ngựa nhỏ 2', title: '12c - 8g', expiry: '18.03 - hết 30.05', timesOfUse: 5, timesUsed: 3, active: 1 }
  ]);


  useEffect(() => {
    async function fetchData() {
      let data = await productService.getPromotion();
      if (data.status != 200) return;


      setListCoupon(data.data)
      setGoListCoupon(data.data);

    }
    fetchData();
  }, []);





  return (
    <Box className='w-full footer footer-cart'>
      <div className='my-2 p-4  flex items-center justify-between cursor-pointer' onClick={e => setOpenRules(true)}>
        <div >
          <strong className='flex items-center'><svg className='mr-2' width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V5H0.893C1.889 5 2.813 5.681 2.973 6.664C3.02174 6.95104 3.00726 7.24525 2.93056 7.52612C2.85387 7.80698 2.71681 8.06772 2.52894 8.29015C2.34108 8.51258 2.10694 8.69133 1.84287 8.81393C1.57879 8.93654 1.29115 9.00004 1 9H0V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H19C19.2652 14 19.5196 13.8946 19.7071 13.7071C19.8946 13.5196 20 13.2652 20 13V9H19C18.7089 9.00004 18.4212 8.93654 18.1571 8.81393C17.8931 8.69133 17.6589 8.51258 17.4711 8.29015C17.2832 8.06772 17.1461 7.80698 17.0694 7.52612C16.9927 7.24525 16.9783 6.95104 17.027 6.664C17.187 5.681 18.111 5 19.107 5H20V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM9 12H7V10H9V12ZM9 8H7V6H9V8ZM9 4H7V2H9V4Z" fill="#C5A153" />
          </svg>
            Mã áp dụng
          </strong>
        </div>
        <p className={'color-C5A153'}>  {'Chọn hoặc nhập mã'} <ChevronRightIcon /></p>
      </div>
      <div className='mb-4'>
        <Button style={{ background: '#23432E', borderRadius: 8, padding: 15, margin: '0 15px', width: 'calc(100% - 30px)' }}

          onClick={e => { handleAcept() }}

          variant="contained"><span className=' text-base font-semibold'>Xác nhận đơn</span></Button>
      </div>

      <Root>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(70% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />

        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={openRules}
          onClose={e => setOpenRules(false)}
          // onOpen={e=>toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={styles.rulesMain}>
            <div className="coupon-form--title">Mã áp dụng  {codeapp} <CloseIcon onClick={e => setOpenRules(false)} /></div>
            <div className='coupon-form flex'>
              <input type="text" onChange={e => { settextSearch(e.target.value) }} placeholder='Nhập mã' />
              <Button onClick={e => toggleDrawer()} variant="contained">Tìm kiếm</Button>
            </div>
            <div className="coupon-form--content">
              {listCoupon.map(function (d, idx) {
                return (
                
                  // <button key={idx} className={d.active == 2 ? 'btn-coupon chddk' : 'btn-coupon'} disabled={d.active == 1 ? '' : 'disabled'} >

                  <button key={idx} className={'btn-coupon'} onClick={e => { setcodeAp(d.title) }} >
                    <div className='btn-coupon--body'>
                      <div>
                        <div className='btn-coupon-left'>
                          <h3>{d.code}</h3>
                          <p>{d.product_name}</p>
                        </div>
                        <div className='btn-coupon-center'>
                          <h3>{d.title}</h3>
                          <p>Dùng được {d.numberOfUses} lần</p>

                       
                                  

                          <span>    { format(parseISO(d.startDate), 'dd-mm')} / { format(parseISO(d.endDate), 'dd-mm')}</span>
                        </div>
                        <div className='btn-coupon-right'>
                          {/* {d.active == 1 && <> */}
                          <>
                            <p>Đã dùng</p>
                            <p><strong>{7}/{10}</strong> lần</p>
                          </>

                          {/* </>} */}
                          {/* {d.active == 2 && <>
                            <div className='btn-coupon-right--noti-bot red'>Chưa đủ điều kiện</div>
                          </>}
                          {d.active == 3 && <>
                            <div className='btn-coupon-right--noti-bot'>Hết lần sử dụng</div>
                          </>} */}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            <Button style={{ background: '#23432E', borderRadius: 8, padding: 15, margin: '0 15px', width: 'calc(100% - 30px)' }}

              onClick={e => setOpenRules(false)}

              variant="contained"><span className=' text-base font-semibold'>Đồng ý</span></Button>
          </div>

        </SwipeableDrawer>
      </Root>


    </Box>
  );
}
FooterCart.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};