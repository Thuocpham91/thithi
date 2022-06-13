import React, {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';
import ImageAspectRatioIcon from '@mui/icons-material/ImageAspectRatio';

const SideBarAdmin = () => {
  const router = useRouter();
  const listMenu =[
      {name:"Bảng điều khiển",link:'/admin/dashboard',icon:<DashboardCustomizeOutlinedIcon />},
      {name:"Thành viên",link:'/admin/user',icon:<GroupOutlinedIcon />},
      {name:"Danh mục sản phẩm",link:'/admin/category',icon:<ImageAspectRatioIcon />},
  ]

  const handleActive = (link) =>{
    if(router.pathname == link){
      return 'active'
    }
  }


  return (<>
    <div className='side-bar'>
      <div className='side-bar--header'>
        <Image
          src="/images/logo.png"
          alt="Picture of the author"
          width={120}
          height={30}
        />
      </div>
      <div className='side-bar--body'>
        <ul>
          {listMenu.map(function(d,idx){
            return(
              <li key={idx} className={handleActive(d.link)}>
                <Link href={d.link}>
                  <a>{d.icon}<span>{d.name}</span></a>
                </Link>
              </li>
            )
          })}


        </ul>
      </div>
    </div>
  </>)
}

export default SideBarAdmin