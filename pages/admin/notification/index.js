import React, {useState,useEffect} from 'react'
import AdminLayout from "../../../layouts/Admin";
import Button from '@mui/material/Button';

import { productService } from '../../../services/product.service';
import { userService } from '../../../services/user.service';


import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';

import toast from "react-hot-toast";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Notification = () => {

    const [openNoti, setOpenNoti] = useState(false);
    const [valueNoti, setValueNoti] = useState({
        title:'',
        content:'',
        city:[],
        users:[],
    });

    const handleOpenNoti = () => {
        setOpenNoti(true);
    };

    const handleCloseNoti = () => {
        setOpenNoti(false);
    };
    
    const handleNoti = async () => {

        const data=await productService.putNotification(valueNoti);

        if(data.status==200)  {
            toast.success("Gửi thông báo thành công");
            setOpenNoti(false);
         }else {
            toast.error(data.message);
         }
    
    };

    const [city, setCIty] = useState([]);

    const [rowUser, setRowUser] = useState([]);



    useEffect(() => {

        async function fetchData() {
            let data = await userService.getCitiDistrict({key:"city"});
            if (data.status != 200) return;

            setCIty(data.city);

            let data_user = await userService.getAll();
            if (data_user.status != 200) return;
            setRowUser(data_user.data);
            // setDisStrict(data.district)

        }
        fetchData();
    }, []);
   
  
  
    return (<>
        <div className='body-user bg-white rounded-lg'>
            <div className='header-user flex justify-between px-4 py-5 items-center'>
                <h3>Danh sách thông báo</h3>
                <div>
                    <Button className='mr-2' onClick={handleOpenNoti}  variant="contained" style={{background:"#EE0232"}} startIcon={<AddIcon />} >Thêm thông báo</Button>
                </div> 
            </div> 
        </div> 
            

        <Dialog
                open={openNoti}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseNoti}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Thêm thông báo</div>
                    <div className='form-Noti'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField className='mb-1' fullWidth label="Tiêu đề" variant="outlined" onChange={e =>setValueNoti({...valueNoti,title:e.target.value})} value={valueNoti.title}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className='mb-1' fullWidth label="Nội dung" variant="outlined" onChange={e =>setValueNoti({...valueNoti,content:e.target.value}) } value={valueNoti.content}/>
                        </Grid>
                        <Grid item xs={6}>
                        <Autocomplete
                            multiple
                            fullWidth
                            limitTags={2}
                            id="multiple-limit-tags"
                            options={rowUser}
                            onChange={(event, value) => setValueNoti({...valueNoti,users:value})} 
                            getOptionLabel={(option) => option.id_khataco}
                            renderInput={(params) => (
                                <TextField fullWidth {...params} label="ID người dùng" placeholder="Chọn id người dùng" />
                            )}
                            sx={{ width: '500px' }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            fullWidth
                            limitTags={2}
                            id="multiple-limit-tags"
                            options={city}
                            onChange={(event, value) => setValueNoti({...valueNoti,city:value})} 
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField fullWidth {...params} label="Tỉnh thành" placeholder="Chọn khu vực" />
                            )}
                            sx={{ width: '500px' }}
                        />
                        </Grid>
                    </Grid>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                    <Button className='mr-2' onClick={e=>handleNoti()} variant="contained" style={{background:"#EE0232"}}>Thêm mới</Button>
                    <Button onClick={handleCloseNoti} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
  
  
  
    </>)
  }
  
export default Notification
  
Notification.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
    