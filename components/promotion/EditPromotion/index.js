import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const EditPromotion = (promotionChoose) => {
    console.log("EditPromotion")
    const [openEditPromotion, setOpenEditPromotion] = useState(false);
    const [valueEditPromotion, setValueEditPromotion] = useState({});

    const handleCloseEditPromotion = () => {
        setOpenEditPromotion(false);
    };


    const handleChangeEditPromotion = (prop) => (event) => {
        setValueEditPromotion({ ...valueEditPromotion, [prop]: event.target.value });
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

    const productItems = [
        {id: '01', label: 'NHA TRANG MỀM'},
        {id: '01', label: 'NHA TRANG HỘP'},
        {id: '02', label: 'CÒ THE'},
        {id: '03', label: 'YETT XANH'},
        {id: '04', label: 'YETT TRẮNG'},
        {id: '05', label: 'PRINCE ĐIẾU DÀI'},
        {id: '06', label: 'PRINCE KTC'},
        {id: '07', label: 'NGỰA NÂU'}
    ];

    useEffect(() => {
        if(promotionChoose != null){
            setValueEditPromotion({promotionChoose});
        }
    }, [promotionChoose])



    return {
    setOpenEditPromotion,
    renderEditPromotion:(<>
        {promotionChoose&& <>
            <Dialog
                open={openEditPromotion}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEditPromotion}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Sửa khuyến mại</div>
                    <div className='form-EditPromotion'>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Tiêu đề" variant="outlined" onChange={handleChangeEditPromotion('title')} value={valueEditPromotion.title}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Mã code" variant="outlined" onChange={handleChangeEditPromotion('code')} value={valueEditPromotion.code}/>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider className="w-full" dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    fullWidth
                                    className="w-full"
                                    label="Thời gian bắt đầu"
                                    value={valueEditPromotion.startDate}
                                    onChange={(newValue) => {
                                        setValueEditPromotion({ ...valueEditPromotion, startDate: newValue })
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
                                    value={valueEditPromotion.endDate}
                                    onChange={(newValue) => {
                                        setValueEditPromotion({ ...valueEditPromotion, endDate: newValue })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Lần dùng" variant="outlined" onChange={handleChangeEditPromotion('numberOfUses')} value={valueEditPromotion.numberOfUses}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={productItems}
                                renderInput={(params) => <TextField {...params} label="Sản phẩm" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Số lượng mua" variant="outlined" onChange={setValueEditPromotion('quantityPurchased')} value={valueEditPromotion.quantityPurchased}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Số lượng khuyến mại" variant="outlined" onChange={setValueEditPromotion('promotionalQuantity')} value={valueEditPromotion.promotionalQuantity}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                value={valueEditPromotion.area}
                                onChange={(e, newValue) => {
                                    setValueEditPromotion({ ...valueEditPromotion, area: newValue })
                                }}
                                multiple
                                fullWidth
                                limitTags={2}
                                id="multiple-limit-tags"
                                options={areaTT}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => (
                                <TextField fullWidth {...params} label="Tỉnh thành" placeholder="Chọn khu vực" />
                                )}
                            />

                        </Grid>
                    </Grid>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={handleCloseEditPromotion} variant="contained" style={{background:"#EE0232"}}>Thêm mới</Button>
                        </div>
                        <Button onClick={handleCloseEditPromotion} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>}
        </>
        )
    }
}

export default EditPromotion