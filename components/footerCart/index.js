import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

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

import addLocation from "../addLocation";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { showXND } from '../../Store/actions'


const drawerBleeding = 0;
const Root = styled('div')(({ theme }) => ({
  height: '100%',
  borderRadius: '8px 8px 0 0',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));


function showToast(pos, message) {
  toast.success(message, {
    position: pos,
    duration: 2000,
  });
}
function showToastEro(pos, message) {
  toast.error(message, {
    position: pos,
    duration: 2000,
  });
}

export default function FooterCart(props) {

  const dispatch = useDispatch();

  const { window } = props;
  const [openRules, setOpenRules] = useState(false);
  const [textSearch, settextSearch] = useState("");
  const [codeapp, setcodeAp] = useState({});
  const [dataUser, seDataUser] = useState({});

  const [loading, setLoading] = useState(false);

  const { renderAddLocation, setOpenEditUser } = addLocation(dataUser);


  const toggleDrawer = () => {
    // if (textSearch == "") return setListCoupon(listGoCoupon);
    // const data = listCoupon.filter(item => { return item.code == textSearch });
    // setListCoupon(data)
  };


  const checkJson = (string) => {
    let rp;
    try {
      if (string == null) return false;
      rp = JSON.parse(string);
      return true;
    } catch (erro) {
      return false;
    }

  };

  const handleAcept = async () => {
    setLoading(true);
    let lst = localStorage.getItem('listProduct');
    if (!lst) return;
    lst = JSON.parse(lst);

    const dataUser = JSON.parse(localStorage.getItem('user'));
    if (!dataUser) return setLoading(false);


    if (dataUser.data.id_store == null || dataUser.data.id_store == "" || dataUser.data.id_cityVT == null || dataUser.data.id_districtVT == null || dataUser.data.id_wardsVT == null || dataUser.data.id_cityVT == "" || dataUser.data.id_districtVT == "" || dataUser.data.id_wardsVT == "") {
      setOpenEditUser(true);
      setLoading(false);
      return;
    }

    const mns = lst.filter(item => { return item.numberPackage > 0 || item.numberTobacco > 0 || item.numberBarrel > 0 });

    if (!mns) return showToastEro('top-center', "Bạn chưa chọn hàng!");


    let dataBuy = [];
    const dataO = mns.map(item => {
      const numberPackage = item.numberPackage ? item.numberPackage : 0;
      const numberTobacco = item.numberTobacco ? item.numberTobacco : 0;
      const numberBarrel = item.numberBarrel ? item.numberBarrel : 0;
      const total = Number(numberPackage) + Number(numberTobacco) * 10 + Number(numberBarrel) * 500;

      let im = {
        id: item.variants[0].id,
        quantity: total,
        price: 0,
      }

      dataBuy.push(im);
    });

    const stringprodcut = obToStringProduct(codeapp.product_name);
    const kkk = codeapp.code + " " + stringprodcut + ":" + codeapp.title;

    console.log(codeapp)

    const order = {
      "id_code": codeapp.id ? codeapp.id : "",
      "products": dataBuy,
      "total": 0,
      "transport": {
        "id": "49801",
        "title": "string",
        "delivery_time": "string",
        "payer_type": 1
      },
      "transport_type": 2,
      "staff_note": kkk ? kkk : "String",
      "total_weight": 1,
      "total_money_product": 0,
      "total_ship": 0,
      "store_id": Number(dataUser.data.id_store),
      "payment_method": 1,
      "source": "TMĐT",
      "total_discount": 0,
      "total_money_cod": 0,
      "customer": {
        "phone": dataUser.data.phone,
        "fullName": dataUser.data.name,
        "province_id": Number(dataUser.data.code_cityVT),
        "district_id": Number(dataUser.data.code_districtVT),
        "ward_id": Number(dataUser.data.code_wardsVT),
        "address": dataUser.data.address,
        "location_type": "VIETTELPOST"
      }
    };


    const datarp = await productService.postOder(order);
    setLoading(false);
    if (datarp.status != 200) return showToastEro('top-center', "Gửi đơn lỗi!");
    if (!datarp.data) return;
    if (datarp.data.status == 1) {
      // let me = "Gửi đơn  hàng thành công id: " + datarp.data.data.order_vtsale_id;
      // showToast('top-center', me);
      props.openSuccessOrder(true);

      const datadefal = localStorage.getItem('listVariants');
      localStorage.setItem('listProduct', datadefal);
    }

  }

  const handleClickItem = async (item) => {

    setcodeAp(item);
  }
  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;


  const [listCoupon, setListCoupon] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const date = new Date();

      let stringdate = format(date, 'yyyy-MM-dd HH:mm:ss');

      let dataUser = JSON.parse(localStorage.getItem('user'));


      let data = await productService.getPromotionUser({ id_user: dataUser.data.id, id_city: dataUser.data.id_cityVT, date: stringdate });

      if (data.status != 200) return;

      setListCoupon(data.data)

    }
    fetchData();
  }, []);



  const count = useSelector((state) => state.counter);

  const showXNDK = useSelector((state) => state.showXND);


  useEffect(() => {

    async function fetchData() {
      let dkm = [];
      let dataad = localStorage.getItem('listProduct');
      dkm = JSON.parse(dataad);
      console.log(dkm)
      if (dkm == null) return;

      const check = dkm.find(item => { return item.numberPackage > 0 || item.numberTobacco > 0 || item.numberBarrel > 0 });
      if (check) dispatch(showXND(true));
      if (!check) dispatch(showXND(false));
      // setOrderList(dkm);

    }
    fetchData();
  }, [count]);

  const objectToStringProduct = (d) => {
    let s = "";
    if (d) {
      const l = JSON.parse(d).map(item => {
        return item.product_name;
      })
      s = l.join()
    }

    return (

      <>
        {s}
      </>
    )
  }

  const obToStringProduct = (d) => {
    let s = "";
    if (d) {
      const l = JSON.parse(d).map(item => {
        return item.product_name;
      })
      s = l.join()
    }

    return s;

  }

  const checkdieukien = (d) => {
    // const dataUser = JSON.parse(localStorage.getItem('user'));

    if(Number(d.Number_user)>= Number(d.numberOfUses)) return 3;
    // let check_numberuser = false;

    // if (d.number_users) {
    //   if (checkJson(d.number_users)) {
    //     const m = JSON.parse(d.number_users);
    //     m.map(item => {
    //       if (item.id == dataUser.data.id && Number(item.number_use) >= Number(d.numberOfUses)) check_numberuser = true;
    //     })
    //   }
    // }
    // if(check_numberuser)return 3;

    let dkm = [];

    let dataad = localStorage.getItem('listProduct');
    if (!checkJson(dataad)) return;

    dkm = JSON.parse(dataad);

    const check = dkm.filter(item => {
      return item.numberPackage > 0 || item.numberTobacco > 0 || item.numberBarrel;

    });

    let checkdk = 2;

    if (!checkJson(d.product_name)) return checkdk;

    if (d.product_name) {
      const l = JSON.parse(d.product_name).map(item => {
        // return item.product_name;
        check.map(ik => {
          if (ik.product_id == item.product_id) {
            const tong = Number(ik.numberPackage ? ik.numberPackage : 0) + Number(ik.numberTobacco ? ik.numberTobacco : 0) * 10 + Number(ik.numberBarrel ? ik.numberBarrel : 0) * 500;
            if (Number(d.quantityPurchased) <= tong) {
              checkdk = 1;

            }
          }
        })
      })
    }

    return checkdk;


    // if(d.number_use>=d.numberOfUses3)return 3;



  }

  return (

    <Box className='w-full footer footer-cart'>
      <div className='my-2 p-4  flex items-center justify-between cursor-pointer' onClick={e => setOpenRules(true)}>
        <div >
          <strong className='flex items-center'><svg className='mr-2' width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V5H0.893C1.889 5 2.813 5.681 2.973 6.664C3.02174 6.95104 3.00726 7.24525 2.93056 7.52612C2.85387 7.80698 2.71681 8.06772 2.52894 8.29015C2.34108 8.51258 2.10694 8.69133 1.84287 8.81393C1.57879 8.93654 1.29115 9.00004 1 9H0V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H19C19.2652 14 19.5196 13.8946 19.7071 13.7071C19.8946 13.5196 20 13.2652 20 13V9H19C18.7089 9.00004 18.4212 8.93654 18.1571 8.81393C17.8931 8.69133 17.6589 8.51258 17.4711 8.29015C17.2832 8.06772 17.1461 7.80698 17.0694 7.52612C16.9927 7.24525 16.9783 6.95104 17.027 6.664C17.187 5.681 18.111 5 19.107 5H20V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM9 12H7V10H9V12ZM9 8H7V6H9V8ZM9 4H7V2H9V4Z" fill="#C5A153" />
          </svg>
            Mã áp dụng {": "}
          </strong>
        </div>
        <p className={'color-C5A153'}>  {codeapp ? codeapp.code : 'Chọn hoặc nhập mã'} <ChevronRightIcon /></p>
      </div>

      {showXNDK ? <div className='mb-4'>
        <Button style={{ background: '#23432E', borderRadius: 8, padding: 15, margin: '0 15px', width: 'calc(100% - 30px)' }}

          onClick={e => { handleAcept() }}

          variant="contained"><span className=' text-base font-semibold'>Xác nhận đơn</span></Button>
      </div> : ""}


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
            <div className="coupon-form--title">Mã áp dụng <CloseIcon onClick={e => setOpenRules(false)} /></div>
            <div className='coupon-form flex'>
              <input type="text" value={codeapp.code} onChange={e => { settextSearch(e.target.value) }} placeholder='Nhập mã' />
              <Button onClick={e => toggleDrawer()} variant="contained">Áp dụng</Button>
            </div>
            <div className="coupon-form--content">
              {listCoupon.map(function (d, idx) {
                return (
                  // <div key={idx}>

                  <button
                    key={idx}
                    className={checkdieukien(d) != 1 ? 'btn-coupon chddk' : 'btn-coupon'}
                    data={codeapp.code == d.code ? 'active' : ''}
                    onClick={e => { handleClickItem(d) }} disabled={checkdieukien(d) == 1 ? '' : 'disabled'}
                  >

                    {/* <button key={idx} className={'btn-coupon'} onClick={e => { handleClickItem(d) }} > */}
                    <div className='btn-coupon--body'>
                      <div>
                        <div className='btn-coupon-left'>
                          <h3>{d.code}</h3>
                          <p> {objectToStringProduct(d.product_name)}</p>
                        </div>
                        <div className='btn-coupon-center'>
                          <h3>{d.title}</h3>
                          <p>Dùng được {d.numberOfUses} combo</p>

                          <span>    {"Hết hạn ngày: "}  {format(parseISO(d.endDate), 'dd-mm')}</span>
                        </div>
                        <div className='btn-coupon-right'>
                          {checkdieukien(d) == 1 && <>
                            <>
                              <p>Đã dùng</p>
                              <p><strong>{d.Number_user?d.Number_user:0}/{d.numberOfUses}</strong> combo</p>
                            </>
                          </>}
                          {checkdieukien(d) == 2 && <>
                            <div className='btn-coupon-right--noti-bot red'>Chưa đủ điều kiện</div>
                          </>}
                          {checkdieukien(d) == 3 && <>
                            <div className='btn-coupon-right--noti-bot'>Đã sử dụng hết</div>
                          </>}
                        </div>
                      </div>
                    </div>
                  </button>


                  // </div>

                )
              })}
            </div>
            <Button style={{ background: '#23432E', borderRadius: 8, padding: 15, margin: '0 15px', width: 'calc(100% - 30px)' }}

              onClick={e => setOpenRules(false)}

              variant="contained"><span className=' text-base font-semibold'>Đồng ý</span></Button>
          </div>

        </SwipeableDrawer>
      </Root>

      {renderAddLocation}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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