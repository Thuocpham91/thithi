import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const AddPromotion = () => {
    const [openAddPromotion, setOpenAddPromotion] = useState(false);
    const [valueAddPromotion, setValueAddPromotion] = useState({
        title:'',
        code:'',
        numberOfUses:'',
        startDate:null,
        endDate:null,
        product:'',
        area:null,
    });

    const handleCloseAddPromotion = () => {
        setOpenAddPromotion(false);
    };


    const handleChangeAddPromotion = (prop) => (event) => {
        setValueAddPromotion({ ...valueAddPromotion, [prop]: event.target.value });
    };



    return {
    setOpenAddPromotion,
    renderAddPromotion:(<>
            <Dialog
                open={openAddPromotion}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAddPromotion}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Thêm khuyến mại</div>
                    <div className='form-AddPromotion'>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Tiêu đề" variant="outlined" onChange={handleChangeAddPromotion('title')} value={valueAddPromotion.title}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Mã code" variant="outlined" onChange={handleChangeAddPromotion('code')} value={valueAddPromotion.code}/>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider className="w-full" dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    fullWidth
                                    className="w-full"
                                    label="Thời gian bắt đầu"
                                    value={valueAddPromotion.startDate}
                                    onChange={(newValue) => {
                                        setValueAddPromotion({ ...valueAddPromotion, startDate: newValue })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider className="w-full"  dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    className="w-full"
                                    style={{width: "100%"}}
                                    fullWidth
                                    label="Thời gian kết thúc"
                                    value={valueAddPromotion.endDate}
                                    onChange={(newValue) => {
                                        setValueAddPromotion({ ...valueAddPromotion, endDate: newValue })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Lần dùng" variant="outlined" onChange={handleChangeAddPromotion('numberOfUses')} value={valueAddPromotion.numberOfUses}/>
                        </Grid>

                    </Grid>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                    <Button className='mr-2' onClick={handleCloseAddPromotion} variant="contained" style={{background:"#EE0232"}}>Thêm mới</Button>
                    <Button onClick={handleCloseAddPromotion} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default AddPromotion