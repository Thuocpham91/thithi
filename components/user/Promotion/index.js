import React,{useState} from 'react'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image'
import Button from '@mui/material/Button';


import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Promotion = () => {
  const listGift = [
    {id:1,name:'Nồi cơm điện Mutosi MR-16R',poit:200000,image:'/images/gift-1.png'},
    {id:2,name:'Lò vi sóng Sharp R-G225VN-BK',poit:300000,image:'/images/gift-2.png'},
    {id:3,name:'Nồi cơm điện Mutosi MR-16R',poit:200000,image:'/images/gift-1.png'},
    {id:4,name:'Lò vi sóng Sharp R-G225VN-BK',poit:300000,image:'/images/gift-2.png'},
    {id:5,name:'Nồi cơm điện Mutosi MR-16R',poit:200000,image:'/images/gift-1.png'},
    {id:6,name:'Lò vi sóng Sharp R-G225VN-BK',poit:300000,image:'/images/gift-2.png'},
  ]


  const [openPromotion, setOpenPromotion] = useState(false);



  const handleClosePromotion = () => {
    setOpenPromotion(false);
  };





  
  return {
  setOpenPromotion,
  renderPromotion:(<>
          <Dialog
          fullScreen
          open={openPromotion}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
         121212
        </Dialog>
      </>
      )
  }
}

export default Promotion