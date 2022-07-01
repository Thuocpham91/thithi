import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Footer from '../../components/footer'
import { compareAsc, format } from 'date-fns'

import { userService } from '../../services';
import parseISO from 'date-fns/parseISO';

const Notification = () => {
  const [dataNotification, setDataNofi] = useState([]);
  useEffect(() => {
    async function getCategory() {
      const data = await userService.getNotification();
      if (data.status != 200) return;
      setDataNofi(data.data)
    }
    getCategory();

  }, []);

  return (
    <div className='main-body body-f2f2f2'>
      <Head>
        <title>Thông báo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Thông báo" />
        <meta property="og:description" content="Conng ty Khatoco" />
        <meta property="og:site_name" content="Khatoco" />
      </Head>
      {/* <div className='title-page'>
        Thông báo
      </div> */}
      <div className='list-noti'>

        {dataNotification.map((item, idx) => {
          return (
            < div key={idx} className='noti-item' >
              <div className='text-right noti-item__header flex justify-between items-center'>
                <span className={item.status==0?"chua-xem":""} ></span>
                {format(parseISO(item.created_at), 'dd-MM-yyyy')}
                </div>
              <div className='noti-item__body'>
                <h3>{item.tile}</h3>
                <p>{item.message}</p>
              </div>
            </div>

          )

        })}

      </div >
      <Footer />
    </div >

  )
}

export default Notification