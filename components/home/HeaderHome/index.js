import React,{useState, useEffect} from 'react'
import Image from 'next/image'

const HeaderHome = () => {
    const listCate = [
        {id:1,title:'White horse',image:'/images/list-cate/wh.png',},
        {id:2,title:'CAMEL',image:'/images/list-cate/CAMEL.png'},
        {id:3,title:'CRAVEN',image:'/images/list-cate/CRAVEN.png'},
        {id:4,title:'Marlboro',image:'/images/list-cate/Marlboro.png'},
        {id:5,title:'White horse',image:'/images/list-cate/wh.png'},
        {id:6,title:'CAMEL',image:'/images/list-cate/CAMEL.png'},
        {id:7,title:'CRAVEN',image:'/images/list-cate/CRAVEN.png'},
        {id:8,title:'Marlboro',image:'/images/list-cate/Marlboro.png'},
        {id:9,title:'White horse',image:'/images/list-cate/wh.png'},
        {id:10,title:'CAMEL',image:'/images/list-cate/CAMEL.png'},
        {id:11,title:'CRAVEN',image:'/images/list-cate/CRAVEN.png'},
        {id:12,title:'Marlboro',image:'/images/list-cate/Marlboro.png'},
        {id:13,title:'White horse',image:'/images/list-cate/wh.png'},
        {id:14,title:'CAMEL',image:'/images/list-cate/CAMEL.png'},
        {id:15,title:'CRAVEN',image:'/images/list-cate/CRAVEN.png'},
        {id:16,title:'Marlboro',image:'/images/list-cate/Marlboro.png'},
    ];
    const [activeCate, setActiveCate] = useState(listCate[0].id);

    const handleChangeActiveCate = (id) =>{
        setActiveCate(id);
    }

    useEffect(() => {
        // console.log('111212');
      },[]);

  return (
    <div className="flex justify-start align-middle list-cate">
        {listCate.map(function(d, idx){
         return (
            <div key={idx} className={activeCate == d.id ? 'cate-item active' : 'cate-item'} onClick={e => handleChangeActiveCate(d.id)}>
                <div className='cate-item__img'>
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
                <p>{d.title}</p>
            </div>
         )
       })}
    </div>
  )
}

export default HeaderHome