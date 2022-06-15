import React, {useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import AdminLayout from "../../../layouts/Admin";


import AddIcon from '@mui/icons-material/Add';

const ExchangePoints = () => {
  return (
    <div className='body-user bg-white rounded-lg'>
      <div className='header-user flex justify-between px-4 py-5 items-center'>
        <h3>Quản lý đổi quà</h3>
        <div>
          <Button className='mr-2'  variant="contained" style={{background:"#EE0232"}} startIcon={<AddIcon />} >Thêm Quà</Button>
        </div> 
      </div> 
    </div> 
  )
}

export default ExchangePoints

ExchangePoints.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};