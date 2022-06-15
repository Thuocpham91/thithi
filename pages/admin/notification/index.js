import React, {useState} from 'react'
import AdminLayout from "../../../layouts/Admin";
import Button from '@mui/material/Button';


import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Notification = () => {


    const [openNoti, setOpenNoti] = useState(false);
    const [valueNoti, setValueNoti] = useState({
        title:'',
        content:'',
    });

    const handleOpenNoti = () => {
        setOpenNoti(true);
    };

    const handleCloseNoti = () => {
        setOpenNoti(false);
    };

    const handleChangeNoti = (prop) => (event) => {
        setValueNoti({ ...valueNoti, [prop]: event.target.value });
    };



    const areaTT = [
        {id: '01', title: 'Hà nội'},
        {id: '02', title: 'Hồ chí minh'},
        {id: '03', title: 'Hải phòng'},
        {id: '04', title: 'Đà nẵng'},
        {id: '05', title: 'Nghệ an'},
        {id: '06', title: 'Thanh hóa'},
        {id: '07', title: 'huế'}
    ];
     
   
  
  
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
                            <TextField className='mb-1' fullWidth label="Tiêu đề" variant="outlined" onChange={handleChangeNoti('title')} value={valueNoti.title}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className='mb-1' fullWidth label="Nội dung" variant="outlined" onChange={handleChangeNoti('content')} value={valueNoti.content}/>
                        </Grid>
                        <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            fullWidth
                            limitTags={2}
                            id="multiple-limit-tags"
                            options={areaTT}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField fullWidth {...params} label="Tỉnh thành" placeholder="Chọn khu vực" />
                            )}
                            sx={{ width: '500px' }}
                        />
                        </Grid>
                    </Grid>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                    <Button className='mr-2' onClick={handleCloseNoti} variant="contained" style={{background:"#EE0232"}}>Thêm mới</Button>
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
    