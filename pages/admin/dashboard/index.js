import React, { useState} from 'react'
import AdminLayout from "../../../layouts/Admin";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Link from 'next/link'

export default function Dashboard() {
  const [dataDashboard, setDataDashboard] = useState({
    user: 150,
  })

  return (<>
    <div className='home-top mb-10 grid grid-cols-3 gap-8'>
        <div className='flex routing-sample-box1  rounded-lg bg-white shadow-sm p-5'>
          <div className='home-top--icon'><GroupOutlinedIcon/></div>
          <div className='home-top--icon'><p>Thành viên</p><h3>{dataDashboard.user}</h3></div>
          <div className='home-top--link cursor-pointer underline'>
            <Link href="home/user"><a>Chi tiết</a></Link>
          </div> 
        </div>

        



    </div>
  </>)
}

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
