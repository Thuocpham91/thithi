import React from 'react'
import Footer from '../../components/Footer'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image'
import Button from '@mui/material/Button';

const User = () => {
  const listGift = [
    {id:1,name:'Nồi cơm điện Mutosi MR-16R',poit:200000,image:'/images/gift-1.png'},
    {id:2,name:'Lò vi sóng Sharp R-G225VN-BK',poit:300000,image:'/images/gift-2.png'},
    {id:3,name:'Nồi cơm điện Mutosi MR-16R',poit:200000,image:'/images/gift-1.png'},
    {id:4,name:'Lò vi sóng Sharp R-G225VN-BK',poit:300000,image:'/images/gift-2.png'},
    {id:5,name:'Nồi cơm điện Mutosi MR-16R',poit:200000,image:'/images/gift-1.png'},
    {id:6,name:'Lò vi sóng Sharp R-G225VN-BK',poit:300000,image:'/images/gift-2.png'},
  ]
  return (<>
    <div className='main-body body-f2f2f2'>
      <div className='title-page'>
        <Link href="/"><a><ArrowBackIcon /></a></Link>
        Tích điểm đổi quà
      </div>
      <div className='main-user text-center'>
        <div>
          <h5><i>Kính chào</i> anh Phước</h5>
          <p>Điểm tích lũy:</p>
          <p><h2>12.000</h2> điểm</p>
        </div>
      </div>
      <div className='list-gift grid  grid-cols-2 md:grid-cols-3 gap-4'>
        {listGift.map(function(d,idx){
          return(
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
              <Button variant="outlined" style={{border:'1px solid',color:'#23432E',textTransform:'initial',fontWeight:'bold'}} >Đổi quà</Button>
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
    </>)
}

export default User