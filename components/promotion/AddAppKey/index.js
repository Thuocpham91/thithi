import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { productService } from '../../../services/product.service';
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AddPromotion = () => {
    const [renderAppKey, setRenderAppKey] = useState(false);
    const [valueAddPromotion, setValueAddPromotion] = useState({
        name:undefined,
        key:undefined
  
    });

    const handleCloseAddPromotion = () => {
        setValueAddPromotion({
            name:"",
            key:""
      
        })
        setRenderAppKey(false);
    };

    const [loading, setLoading] = useState(false);


    const handleAddPromotion = async () => {
        if (!valueAddPromotion.name) return toast.error("Bạn chưa nhập tên");
        if (!valueAddPromotion.key) return toast.error("Bạn chưa nhập Key");
    
        setLoading(true)
        const data = await productService.addAppKey(valueAddPromotion);
        setLoading(false)

        if (data.status == 200) {
            setValueAddPromotion({
                name:"",
                key:""
          
            })
            toast.success("Thêm  APP KEY thành công");
            setRenderAppKey(false);
        } else {
            toast.error(data ? data.message : "có lỗi sảnh ra ở đây");
        }
    };

    useEffect(() => {

        async function fetchData() {
           
        }
        fetchData();
    }, []);


    return {
        setRenderAppKey,
        renderAppKey: (<>
            <Dialog
                open={renderAppKey}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAddPromotion}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Tạo App Key</div>
                    <div className='form-AddPromotion'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Name" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, name: e.target.value })} value={valueAddPromotion.name} />
                            </Grid>
                          
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Key" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, key: e.target.value })} value={valueAddPromotion.key} />
                            </Grid>



                        </Grid>
           
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={e => handleAddPromotion()} variant="contained" style={{ background: "#EE0232" }}>Thêm mới</Button>
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