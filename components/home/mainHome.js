import React, {useState} from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button';

const MainHome = () => {
    const [listProduct, setListProduct] = useState([
        {id:1,title:'Ngựa lớn',image:'/images/prd1.png'},
        {id:2,title:'Ngựa nhỏ',image:'/images/prd1.png'},
        {id:3,title:'Ngựa lớn 2',image:'/images/prd1.png'},
    ]);
    const [orderList, setOrderList] = useState([]);

    const minusNumber = (data,type) =>{
        const newArray = minusFunc(listProduct, data, type );
        const arrayOrder = minusFuncOrder(orderList, data, type );
        setListProduct(newArray);
        setOrderList(arrayOrder);
    }

    const plusNumber = (data,type) =>{
        const newArray = plusFunc(listProduct, data, type );
        const arrayOrder = plusFuncOrder(orderList, data, type );
        setListProduct(newArray);
        setOrderList(arrayOrder);
    }

    const minusFunc = (array,data, type) =>{
        const newArray = [];
        array.map(function(item, idx){
            let it=item;
            if(item.id===data.id){
                if(type=="package"){
                    let count=item.numberPackage|| 0;
                    if(count > 0){
                        count=Number(count)-1;
                        it={...it,numberPackage:count};                
                    }
                }
                if(type=="tobacco"){
                    let count=item.numberTobacco|| 0;
                    if(count > 0){
                        count=Number(count)-1;
                        it={...it,numberTobacco:count};                
                    }
                }
                if(type=="barrel"){
                    let count=item.numberBarrel|| 0;
                    if(count > 0){
                        count=Number(count)-1;
                        it={...it,numberBarrel:count};                
                    }
                }
            }
            newArray.push(it)
        })
        return newArray
    }

    const filterTotal =(data)=>{
        let dataPackage = data.numberPackage|| 0;
        let dataTobacco=data.numberTobacco|| 0;
        let dataBarrel=data.numberBarrel|| 0;
        if((Number(dataPackage)+Number(dataTobacco)+Number(dataBarrel))>0)return data;

    }
    
    const minusFuncOrder = (array,data, type) =>{
        const newArray = [];
        array.map(function(item, idx){
            let it=item;
            if(item.id===data.id){
                if(type=="package"){
                    let count=item.numberPackage|| 0;
                    if(count > 0){
                        count=Number(count)-1;
                        it={...it,numberPackage:count};                
                    }
                }
                if(type=="tobacco"){
                    let count=item.numberTobacco|| 0;
                    if(count > 0){
                        count=Number(count)-1;
                        it={...it,numberTobacco:count};                
                    }
                }
                if(type=="barrel"){
                    let count=item.numberBarrel|| 0;
                    if(count > 0){
                        count=Number(count)-1;
                        it={...it,numberBarrel:count};                
                    }
                }
            }

            newArray.push(it)
        })
        let dataFuncOrder = newArray.filter(filterTotal)
        return dataFuncOrder
    }

    const plusFunc = (array,data, type) =>{
        const newArray = [];
        array.map(function(item, idx){
            let it=item;
            if(item.id===data.id){
                if(type=="package"){
                    let count=item.numberPackage|| 0;
                    count=Number(count)+1;
                    it={...it,numberPackage:count};                
                }
                if(type=="tobacco"){
                    let count=item.numberTobacco|| 0;
                    count=Number(count)+1;
                    it={...it,numberTobacco:count};                
                }
                if(type=="barrel"){
                    let count=item.numberBarrel|| 0;
                    count=Number(count)+1;
                    it={...it,numberBarrel:count};                
                }
            }
            newArray.push(it)
        })
        return newArray
    }

    const plusFuncOrder = (array,data, type) =>{
        let check = false; 
        const newArray = [];
        array.map(function(item, idx){
            let it=item;
            if(item.id===data.id){
                check = true;
                if(type=="package"){
                    let count=item.numberPackage|| 0;
                    count=Number(count)+1;
                    it={...it,numberPackage:count};                
                }
                if(type=="tobacco"){
                    let count=item.numberTobacco|| 0;
                    count=Number(count)+1;
                    it={...it,numberTobacco:count};                
                }
                if(type=="barrel"){
                    let count=item.numberBarrel|| 0;
                    count=Number(count)+1;
                    it={...it,numberBarrel:count};                
                }
            }
            newArray.push(it)
        })
        if(!check){
            let fgfg=data;
            if(type=="package"){
                let count=fgfg.numberPackage|| 0;
                count=Number(count)+1;
                fgfg={...fgfg,numberPackage:count};                
            }
            if(type=="tobacco"){
                let count=fgfg.numberTobacco|| 0;
                count=Number(count)+1;
                fgfg={...fgfg,numberTobacco:count};                
            }
            if(type=="barrel"){
                let count=fgfg.numberBarrel|| 0;
                count=Number(count)+1;
                fgfg={...fgfg,numberBarrel:count};                
            }
            newArray.push(fgfg)
        }
        return newArray
    }

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
                            <div className='product-item--number flex justify-center items-center'>
                                <button onClick={e => minusNumber(d,'package')}>-</button>
                                <div className={d.numberPackage > 0 ? 'red':''}>
                                    {d.numberPackage || 0 }
                                </div>
                                <button onClick={e => plusNumber(d,'package')}>+</button>
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
                            <div className='product-item--number flex justify-center items-center'>
                                <button onClick={e => minusNumber(d,'tobacco')}>-</button>
                                <div className={d.numberTobacco > 0 ? 'red':''}>
                                    {d.numberTobacco||0}
                                </div>
                                <button onClick={e => plusNumber(d,'tobacco')}>+</button>
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
                            <div className='product-item--number flex justify-center items-center'>
                                <button onClick={e => minusNumber(d,'barrel')}>-</button>
                                <div className={d.numberBarrel > 0 ? 'red':''}>
                                    {d.numberBarrel||0}
                                </div>
                                <button onClick={e => plusNumber(d,'barrel')}>+</button>
                            </div>
                        </div>
                        
                    </div>
                )
            })}
        </div>
        {orderList.length > 0 && <>
            <div className='oder-button'><Button style={{background:'#23432E',borderRadius: 8,padding:15,margin:'0 15px',width:'calc(100% - 30px)'}} variant="contained"><span className=' text-base font-semibold'>Đặt hàng</span></Button> </div>
        </>}
    </div>
  )
}

export default MainHome