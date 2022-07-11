import React, { useEffect, useState } from 'react'
import FooterCart from '../../components/footerCart'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Head from 'next/head'
import { compareAsc, format } from 'date-fns'
import Button from '@mui/material/Button';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCount,showXND } from '../../Store/actions';


const Cart = (props) => {
  const dispatch = useDispatch();


  const today = new Date();
  const [listProduct, setListProduct] = useState([
    // { id: 1, title: 'Ngựa lớn', imagePackage: '/images/prd1.png', imageTobacco: '/images/prd2.png', imageBarrel: '/images/prd3.png', numberPackage: 3, numberTobacco: 4, numberBarrel: 1 },
    // { id: 2, title: 'Ngựa nhỏ', imagePackage: '/images/prd4.png', imageTobacco: '/images/prd5.png', imageBarrel: '/images/prd3.png', numberPackage: 1 },
    // { id: 3, title: 'Ngựa lớn', imagePackage: '/images/prd1.png', imageTobacco: '/images/prd2.png', imageBarrel: '/images/prd3.png', numberPackage: 5, numberTobacco: 2, numberBarrel: 1 },
    // { id: 4, title: 'Ngựa nhỏ', imagePackage: '/images/prd4.png', imageTobacco: '/images/prd5.png', imageBarrel: '/images/prd3.png', numberPackage: 1 },
    // { id: 5, title: 'Ngựa lớn', imagePackage: '/images/prd1.png', imageTobacco: '/images/prd2.png', imageBarrel: '/images/prd3.png', numberPackage: 7, numberTobacco: 3, numberBarrel: 9 },
    // { id: 6, title: 'Ngựa nhỏ', imagePackage: '/images/prd4.png', imageTobacco: '/images/prd5.png', imageBarrel: '/images/prd3.png', numberPackage: 6 },

  ]);



  useEffect(() => {
    const dataOrder = localStorage.getItem('listProduct');
    let dkm = JSON.parse(dataOrder);
    if (!dkm) return;

    setListProduct(dkm);

  }, []);



  const updateArray = (listOder) => {
    let dataTotal = localStorage.getItem('listProduct');
    let dkm = JSON.parse(dataTotal);

    const kFix = dkm.map(ils => {
        let im = ils;
        let kmm = listOder.find(itemsd => { return ils.product_id == itemsd.product_id });
        if (kmm) im = kmm;
        return im;
    });

    const check = kFix.find(item => { return item.numberPackage > 0 || item.numberTobacco > 0 || item.numberBarrel > 0 });
    if (check)dispatch(showXND(true));
    if (!check) dispatch(showXND(false));


    localStorage.setItem('listProduct', JSON.stringify(kFix));


}


  const minusNumber = (data, type) => {
    const newArray = minusFunc(listProduct, data, type);
    setListProduct(newArray);
    updateArray(newArray);
  }

  const plusNumber = (data, type) => {
    const newArray = plusFunc(listProduct, data, type);
  
    setListProduct(newArray);
    updateArray(newArray);
  }

  const minusFunc = (array, data, type) => {
    const newArray = [];
   array.map(function (item, idx) {
      let it = item;
      if (item.product_id === data.product_id) {
        if (type == "package") {
          let count = item.numberPackage || 0;
          if (count > 0) {
            count = Number(count) - 1;
            it = { ...it, numberPackage: count };
          }
        } else
          if (type == "tobacco") {
            let count = item.numberTobacco || 0;
            if (count > 0) {
              count = Number(count) - 1;
              it = { ...it, numberTobacco: count };
            }
          } else
            if (type == "barrel") {
              let count = item.numberBarrel || 0;
              if (count > 0) {
                count = Number(count) - 1;
                it = { ...it, numberBarrel: count };
              }
            }
      }
      newArray.push(it)
    })

    return newArray
  }

  const plusFunc = (array, data, type) => {
    const newArray = [];
    array.map(function (item, idx) {
      let it = item;
      if (item.product_id === data.product_id) {
        if (type == "package") {
          let count = item.numberPackage || 0;
          count = Number(count) + 1;
          it = { ...it, numberPackage: count };
        }
        if (type == "tobacco") {
          let count = item.numberTobacco || 0;
          count = Number(count) + 1;
          it = { ...it, numberTobacco: count };
        }
        if (type == "barrel") {
          let count = item.numberBarrel || 0;
          count = Number(count) + 1;
          it = { ...it, numberBarrel: count };
        }
      }
      newArray.push(it)
    })
    return newArray
  }

  const delteItem = (id, type) => {
    const newArray = [];
    listProduct.map(function (item, idx) {
      let it = item;
      if (item.product_id == id) {
        if (type == "package") {
          it = { ...it, numberPackage: 0 };
        }
        if (type == "tobacco") {
          it = { ...it, numberTobacco: 0 };
        }
        if (type == "barrel") {
          it = { ...it, numberBarrel: 0 };
        }
      }
      newArray.push(it)
    })
    setListProduct(newArray);
    updateArray(newArray);
  }

  const [successOdder,setSuccessOrder] =  useState(false);
  const endSuccessOdder = () => {
    setSuccessOrder(false);
    Router.push('/')

  }


  return (<>
    <Head>
      <title>Giỏ hàng</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="robots" content="noindex" />
      <meta property="og:title" content="Giỏ hàng" />
      <meta property="og:description" content="Conng ty Khatoco" />
      <meta property="og:site_name" content="Khatoco" />
    </Head>
    <div className='main-body body-f2f2f2'>
      <div id="ctdh" className='title-page'>
        <Link href="/"><a><ArrowBackIcon /></a></Link>
        Chi tiết đơn hàng
      </div>
      <div className='sub-title-page'>
        <div><strong>Ngày đặt:</strong> {format(today, 'dd-MM-yyyy')} </div>
      </div>
      <div className='list-cart'>

        {listProduct.map(function (d, idx) {
          return (<>
            {d.numberPackage ? Number(d.numberPackage) > 0 ?
              <div key={idx} className='item-cart'>
                <div className="product-item">
                  <div className='product-item--img'>
                    <span>
                      <Image
                        unoptimized
                        alt={d.title}
                        src={d.variants[0].photo.length > 0 ? d.variants[0].photo[0].url : "/images/prd1.png"}
                        layout='fill'
                        objectFit='contain'
                        quality={100}
                      />
                    </span>
                    <div className='product-item--title'>
                      <div className='product-item--title--h3'>{d.product_name}</div>
                      <p>gói</p>
                    </div>
                  </div>
                  <div className='product-item--number flex justify-center items-center'>
                    <div className='product-item--number__delete'><CloseIcon onClick={e => delteItem(d.product_id, 'package')} /></div>
                    <button onClick={e => minusNumber(d, 'package')}>-</button>
                    <div className={d.numberPackage > 0 ? 'red' : ''}>
                      {d.numberPackage || 0}
                    </div>
                    <button onClick={e => plusNumber(d, 'package')}>+</button>
                  </div>
                </div>
              </div> : "" : ""
            }
            {d.numberTobacco ? Number(d.numberTobacco) > 0 ?
              <div key={idx + "ko"} className='item-cart'>
                <div className="product-item">
                  <div className='product-item--img'>
                    <span>
                      <Image
                        unoptimized
                        alt={d.title}
                        src={d.variants[0].photo.length > 0 ? d.variants[0].photo[1].url : "/images/prd1.png"}
                        layout='fill'
                        objectFit='contain'
                        quality={100}
                      />
                    </span>
                    <div className='product-item--title'>
                      <div className='product-item--title--h3'>{d.product_name}</div>
                      <p>Cây</p>
                    </div>
                  </div>
                  <div className='product-item--number flex justify-center items-center'>
                    <div className='product-item--number__delete'><CloseIcon onClick={e => delteItem(d.product_id, 'tobacco')} /></div>
                    <button onClick={e => minusNumber(d, 'tobacco')}>-</button>
                    <div className={d.numberTobacco > 0 ? 'red' : ''}>
                      {d.numberTobacco || 0}
                    </div>
                    <button onClick={e => plusNumber(d, 'tobacco')}>+</button>
                  </div>
                </div>

              </div> : "" : ""
            }
            {d.numberBarrel ? Number(d.numberBarrel) > 0 ?
              <div key={idx + "ban"} className='item-cart'>
                <div className="product-item">
                  <div className='product-item--img'>
                    <span>
                      <Image
                        unoptimized
                        alt={d.title}
                        src={d.variants[0].photo.length > 0 ? d.variants[0].photo[2].url : "/images/prd1.png"}
                        layout='fill'
                        objectFit='contain'
                        quality={100}
                      />
                    </span>
                    <div className='product-item--title'>
                      <div className='product-item--title--h3'>{d.product_name}</div>
                      <p>Thùng</p>
                    </div>
                  </div>
                  <div className='product-item--number flex justify-center items-center'>
                    <div className='product-item--number__delete'><CloseIcon onClick={e => delteItem(d.product_id, 'barrel')} /></div>
                    <button onClick={e => minusNumber(d, 'barrel')}>-</button>
                    <div className={d.numberBarrel > 0 ? 'red' : ''}>
                      {d.numberBarrel || 0}
                    </div>
                    <button onClick={e => plusNumber(d, 'barrel')}>+</button>
                  </div>
                </div>
              </div> : "" : ""
            }
          </>
          )
        })
        }
      </div>
      <div className={successOdder? 'success-form active' : 'success-form'}>
        <div className='success-form--body text-center'>
          <Image
            unoptimized
            src="/images/success-icon.svg"
            width="60"
            height="60"
            objectFit='contain'
            quality={100}
          />
          <h2 className='mt-1 mb-4'>Đặt hàng thành công</h2>
          <Button onClick={endSuccessOdder} variant="outlined" style={{ color: "#23432E", border: "1px solid #23432E" }}>Đóng</Button>  
        </div>
      </div> 
      <FooterCart openSuccessOrder={setSuccessOrder} />
    </div>
  </>)
}

export default Cart