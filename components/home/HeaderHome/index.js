import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { productService } from '../../../services/product.service';



import { useSelector, useDispatch } from 'react-redux'
import { setNotification,searchProduct } from '../../../Store/actions'


const loadImg = ({ src, width }) => {
  return `http://202.92.6.221:3000/${src}?w=${width}}`
}
const HeaderHome = () => {
  const dispatch = useDispatch();


  const [listCa, setListCate] = useState([]);
  const [activeCate, setActiveCate] = useState(0);

  const handleChangeActiveCate = (d) => {
    if (d.id == activeCate) {
      dispatch(searchProduct(-1));
      setActiveCate(0);
    } else {
      dispatch(searchProduct(d));
      setActiveCate(d.id);

    }


  }




  useEffect(() => {

    ////
    async function getCategory() {
      let data = await productService.getCategory();
      if (data.status != 200) return;

      setListCate(data.data);
      // setActiveCate(data.data[0]?data.data[0].id:0)
    }

    getCategory();

  }, []);

  return (
    <div className="flex justify-start align-middle list-cate">
      {listCa.map(function (d, idx) {
        return (
          <div key={idx} className={activeCate == d.id ? 'cate-item active' : 'cate-item'} onClick={e => handleChangeActiveCate(d)}>
            <div className='cate-item__img'>
              <span>
                <Image
                  loader={loadImg}
                  alt={d.title}
                  src={d.url ? d.url : '/images/list-cate/Marlboro.png'}
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