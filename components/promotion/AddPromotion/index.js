import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { userService } from '../../../services/user.service';
import { productService } from '../../../services/product.service';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import toast from "react-hot-toast";

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AddPromotion = (FetchDataLoad) => {
    const [openAddPromotion, setOpenAddPromotion] = useState(false);
    const [valueAddPromotion, setValueAddPromotion] = useState({});

    const handleCloseAddPromotion = () => {
        setOpenAddPromotion(false);
    };

    const [loading, setLoading] = useState(false);


    const handleAddNotification = async () => {
        console.log(valueAddPromotion)
        if (!valueAddPromotion.title) return toast.error("Bạn chưa nhập title");
        if (!valueAddPromotion.message) return toast.error("Bạn chưa nhập message");
        if(!valueAddPromotion.app_key&&valueAddPromotion.app_key&& valueAddPromotion.app_key.length <0){

            return toast.error("bạn chưa chọn app key");
        }
      
      

        console.log(valueAddPromotion)
        

        setLoading(true)

        const data = await userService.addNotification(valueAddPromotion);
        console.log(data)
        setLoading(false)

        if (data.status == 200) {
            toast.success("Thêm  khuyến mại thành công");
            FetchDataLoad();
            setOpenAddPromotion(false);
        } else {
            toast.error(data ? data.message : "có lỗi sảnh ra ở đây");
        }
    };


    const [listAppKey, setListAppKey] = useState([]);


    const CallBack = (value) => {
        setValueAddPromotion({ ...valueAddPromotion, users: value });
    };


    useEffect(() => {

        async function fetchData() {
            let data = await productService.getAppKey();
            console.log(data)
            if (data.status != 200) return;
            setListAppKey(data.data);
          
        }
        fetchData();
    }, []);

  


    return {
        setOpenAddPromotion,
        renderAddPromotion: (<>
            <Dialog
                open={openAddPromotion}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAddPromotion}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Tạo Notification</div>
                    <div className='form-AddPromotion'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Tiêu đề" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, title: e.target.value })} value={valueAddPromotion.title} />
                            </Grid>
                          
                            <Grid item xs={12}>
                                <TextField className='mb-1' fullWidth label="Nội dung" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, message: e.target.value })} value={valueAddPromotion.message} />
                            </Grid>
                          
                           
                         
                            {/* <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Số lượng khuyến mại" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, promotionalQuantity: e.target.value })} value={valueAddPromotion.promotionalQuantity} />
                            </Grid> */}

                            <Grid item xs={12}>
                                <Autocomplete
                                    value={valueAddPromotion.app_key}
                                    onChange={(e, newValue) => {
                                        setValueAddPromotion({ ...valueAddPromotion, app_key: newValue.map(item => item.key) })
                                    }}
                                    multiple
                                    fullWidth
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    options={listAppKey}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} label="APP KEY" placeholder="Chọn APP KEY" />
                                    )}
                                />

                            </Grid>
                          

                        </Grid>
           
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={e => handleAddNotification()} variant="contained" style={{ background: "#EE0232" }}>Thêm mới</Button>
                        </div>
                        <Button onClick={handleCloseAddPromotion} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100000000000 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </>
        )
    }
}

export default AddPromotion