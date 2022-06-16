import React,{useState, useEffect} from 'react'
import Image from 'next/image'
import { productService } from '../../../services/product.service';

const HeaderHome = () => {
 

    const [listCa, setListCate] = useState([]);
    const [activeCate, setActiveCate] = useState(0);

    const handleChangeActiveCate = (id) =>{
        setActiveCate(id);
    }

    useEffect(() => {
   
        ////
        async function getCategory() {
          let data = await productService.getCategory();
          if (data.status != 200) return;
  
          setListCate(data.data);
          setActiveCate(data.data[0]?data.data[0].id:0)
        }
    
        getCategory();
    
      }, []);
    
  return (
    <div className="flex justify-start align-middle list-cate">
        {listCa.map(function(d, idx){
         return (
            <div key={idx} className={activeCate == d.id ? 'cate-item active' : 'cate-item'} onClick={e => handleChangeActiveCate(d.id)}>
                <div className='cate-item__img'>
                    <span>
                        <Image
                            alt={d.title}
                            src={d.url?d.url:'/images/list-cate/Marlboro.png'}
                            layout='fill'
                            objectFit='contain'
                            quality={100}
                        />
                    </span>
                </div> 
                <p>{d.name}</p>
            </div>
         )
       })}
    </div>
  )
}

export default HeaderHome