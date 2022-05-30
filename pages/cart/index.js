import React,{useState} from 'react'
import FooterCart from '../../components/footerCart'
import Moment from 'react-moment';
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cart = () => {
  const today = new Date();
  const [listProduct, setListProduct] = useState([
    {id:1,title:'Ngựa lớn',image:'/images/prd1.png',numberPackage:3,numberTobacco:4,numberBarrel:1},
    {id:2,title:'Ngựa nhỏ',image:'/images/prd1.png',numberPackage:1},
    {id:3,title:'Ngựa lớn',image:'/images/prd1.png',numberPackage:5,numberTobacco:2,numberBarrel:1},
    {id:4,title:'Ngựa nhỏ',image:'/images/prd1.png',numberPackage:1},
    {id:5,title:'Ngựa lớn',image:'/images/prd1.png',numberPackage:7,numberTobacco:3,numberBarrel:9},
    {id:6,title:'Ngựa nhỏ',image:'/images/prd1.png',numberPackage:6},
    
  ]);

  const minusNumber = (data,type) =>{
    const newArray = minusFunc(listProduct, data, type );
    setListProduct(newArray);
  }

  const plusNumber = (data,type) =>{
      const newArray = plusFunc(listProduct, data, type );
      setListProduct(newArray);
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

  const delteItem = (id,type) =>{
    const newArray = [];
    listProduct.map(function(item, idx){
      let it=item;
      if(item.id===id){
          if(type=="package"){
              it={...it,numberPackage:0};                
          }
          if(type=="tobacco"){
              it={...it,numberTobacco:0};                
          }
          if(type=="barrel"){
              it={...it,numberBarrel:0};                
          }
      }
      newArray.push(it)
    })
    setListProduct(newArray);
  }




  return (<>
    <div className='main-body body-f2f2f2'>
        <div className='title-page'>
          <Link href="/"><a><ArrowBackIcon /></a></Link>
          Chi tiết đơn hàng
        </div>
        <div className='sub-title-page'>
            <div><strong>Ngày đặt:</strong> <Moment format="DD.MM.YYYY">{today}</Moment></div>
        </div> 
        <div className='list-cart'>
          
            { listProduct.map(function(d,idx){
              return (<>
                  {d.numberPackage?Number(d.numberPackage )> 0 ?
                  <div className='item-cart'>
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
                            <div className='product-item--title'>
                                <h3>{d.title}</h3>
                                <p>gói</p>
                            </div>
                          </div>
                          <div className='product-item--number flex justify-center items-center'>
                            <div className='product-item--number__delete'><CloseIcon onClick={e => delteItem(d.id,'package')}/></div>
                              <button onClick={e => minusNumber(d,'package')}>-</button>
                              <div className={d.numberPackage > 0 ? 'red':''}>
                                  {d.numberPackage||0}
                              </div>
                              <button onClick={e => plusNumber(d,'package')}>+</button>
                          </div>
                      </div>
                    </div>  :"":""
                  }
                  {d.numberTobacco?Number(d.numberTobacco )> 0 ?
                    <div className='item-cart'>
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
                          <div className='product-item--title'>
                              <h3>{d.title}</h3>
                              <p>Cây</p>
                          </div>
                          </div>
                          <div className='product-item--number flex justify-center items-center'>
                            <div className='product-item--number__delete'><CloseIcon onClick={e => delteItem(d.id,'tobacco')}/></div>
                              <button onClick={e => minusNumber(d,'tobacco')}>-</button>
                              <div className={d.numberTobacco > 0 ? 'red':''}>
                                  {d.numberTobacco||0}
                              </div>
                              <button onClick={e => plusNumber(d,'tobacco')}>+</button>
                          </div>
                      </div>

                    </div>:"":""
                  }
                  {d.numberBarrel?Number(d.numberBarrel )> 0 ?
                    <div className='item-cart'>
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
                            <div className='product-item--title'>
                                <h3>{d.title}</h3>
                                <p>Thùng</p>
                            </div>
                          </div>
                          <div className='product-item--number flex justify-center items-center'>
                            <div className='product-item--number__delete'><CloseIcon onClick={e => delteItem(d.id,'barrel')}/></div>
                              <button onClick={e => minusNumber(d,'barrel')}>-</button>
                              <div className={d.numberBarrel > 0 ? 'red':''}>
                                  {d.numberBarrel||0}
                              </div>
                              <button onClick={e => plusNumber(d,'barrel')}>+</button>
                          </div>
                      </div>
                    </div>:"":""
                  }
              </>
              )})
            }
        </div>
        <FooterCart />
      </div>
    </>)
}

export default Cart