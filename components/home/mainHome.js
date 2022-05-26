import React from 'react'
import Image from 'next/image'

const MainHome = () => {
    const listProduct = [
        {id:1,title:'Ngựa lớn',image:'/images/prd1.png'},
        {id:2,title:'Ngựa nhỏ',image:'/images/prd1.png'},
        {id:3,title:'Ngựa lớn 2',image:'/images/prd1.png'},
    ];
  return (
    <div className="main-home">
        <div className='list-product'>
            {listProduct.map(function(d, idx){
                return (
                    <div key={idx} className="product-main grid grid-cols-3 gap-4">
                        <div className="product-item">
                            <div className='product-item--img'>
                                <span>
                                    <Image
                                        alt={d.title}
                                        src={d.image}
                                        layout='fill'
                                        objectFit='contain'
                                        quality={100}
                                    />
                                </span>
                            </div>
                            <div className='product-item--title'>
                                <h3>{d.title}</h3>
                                <p>Gói</p>
                            </div>
                            <div className='product-item--number'>
                                
                            </div>
                        </div>
                        <div className="product-item">
                            <div className='product-item--img'>
                                <span>
                                    <Image
                                        alt={d.title}
                                        src={d.image}
                                        layout='fill'
                                        objectFit='contain'
                                        quality={100}
                                    />
                                </span>
                            </div>
                            <div className='product-item--title'>
                                <h3>{d.title}</h3>
                                <p>Cây</p>
                            </div>
                            <div className='product-item--number'>
                                
                            </div>
                        </div>
                        <div className="product-item">
                            <div className='product-item--img'>
                                <span>
                                    <Image
                                        alt={d.title}
                                        src={d.image}
                                        layout='fill'
                                        objectFit='contain'
                                        quality={100}
                                    />
                                </span>
                            </div>
                            <div className='product-item--title'>
                                <h3>{d.title}</h3>
                                <p>Thùng</p>
                            </div>
                            <div className='product-item--number'>
                                
                            </div>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MainHome