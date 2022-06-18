import React, { useState, useEffect } from 'react'
import { compareAsc, format } from 'date-fns'
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

import { userService } from '../../../services/user.service';
import { productService } from '../../../services/product.service';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AddPromotion = () => {
    const [openAddPromotion, setOpenAddPromotion] = useState(false);
    const [valueAddPromotion, setValueAddPromotion] = useState({
        title: '',
        code: '',
        numberOfUses: '',
        quantityPurchased: '',
        promotionalQuantity: '',
        startDate: null,
        endDate: null,
        product: '',
        listId: [],
        area: [],
    });

    const handleCloseAddPromotion = () => {
        setOpenAddPromotion(false);
    };
    const handleAddPromotion = async () => {

        const data = await productService.addPromotion(valueAddPromotion);
        if(data.status!=200)return;
        setOpenAddPromotion(false);
    };




    const handleChangeAddPromotion = (prop) => (event) => {
        setValueAddPromotion({ ...valueAddPromotion, [prop]: event.target.value });
    };


    

    const [city, setCIty] = useState([]);

    const [disStrict, setDisStrict] = useState([]);

    const [listdisStrict, setListDisStrict] = useState([]);

    

    useEffect(() => {

        async function fetchData() {
            let data = await userService.getCitiDistrict();
            if (data.status != 200) return;

            setCIty(data.citi);
            setDisStrict(data.district)

        }
        fetchData();
    }, []);



    const [productItems, setproductItems] = useState([]);

    useEffect(() => {


        const fda = JSON.parse(localStorage.getItem('listVariants'));
        if (fda == null) return;

        setproductItems(fda);


    }, [])

    const [byID, setById] = useState(false);

    const handleChangeById = () => {
        setById(!byID);
    };




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
                    <div className="header-title-popup p-4 font-bold">Thêm khuyến mại</div>
                    <div className='form-AddPromotion'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Tiêu đề" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, title: e.target.value })} value={valueAddPromotion.title} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Mã code" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, code: e.target.value })} value={valueAddPromotion.code} />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider className="w-full" dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        fullWidth
                                        className="w-full"
                                        label="Thời gian bắt đầu"
                                        value={valueAddPromotion.startDate}
                                        onChange={(newValue) => {
                                            // console.log(newValue)
                                            if (newValue == "Invalid Date") return;
                                            const date = new Date(newValue);
                                            const dj = format(date, 'yyyy-MM-dd HH:MM:ss')
                                            // console.log(date.getTime())
                                            setValueAddPromotion({ ...valueAddPromotion, startDate: dj })
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider className="w-full" dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        className="w-full"
                                        style={{ width: "100%" }}
                                        fullWidth
                                        label="Thời gian kết thúc"
                                        value={valueAddPromotion.endDate}
                                        onChange={(newValue) => {

                                            if (newValue == "Invalid Date") return;

                                            console.log(newValue)

                                            const date = new Date(newValue);
                                            const dj = format(date, 'yyyy-MM-dd HH:MM:ss')
                                            setValueAddPromotion({ ...valueAddPromotion, endDate: dj })
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Lần dùng" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, numberOfUses: e.target.value })} value={valueAddPromotion.numberOfUses} />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    onChange={(e, newValue) => {
                                        setValueAddPromotion({ ...valueAddPromotion, product: newValue })
                                    }}
                                    options={productItems}
                                    getOptionLabel={(option) => option.product_name}
                                    renderInput={(params) => <TextField {...params} label="Sản phẩm" />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Số lượng mua" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, quantityPurchased: e.target.value })} value={valueAddPromotion.quantityPurchased} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Số lượng khuyến mại" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, promotionalQuantity: e.target.value })} value={valueAddPromotion.promotionalQuantity} />
                            </Grid>
                            {!byID && <>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        value={valueAddPromotion.area}
                                        onChange={(e, newValue) => {
                                            setValueAddPromotion({ ...valueAddPromotion, area: newValue })
                                        }}
                                        multiple
                                        fullWidth
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        options={city}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} label="Tỉnh thành" placeholder="Chọn khu vực" />
                                        )}
                                    />

                                </Grid>
                            </>}
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={handleChangeById} />} label="Nhập theo danh sách id" />
                                </FormGroup>
                            </Grid>
                            {byID && <>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        value={valueAddPromotion.listId}
                                        onChange={(e, newValue) => {
                                            setValueAddPromotion({ ...valueAddPromotion, listId: newValue })
                                        }}
                                        multiple
                                        fullWidth
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        options={city}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} label="Id thành viên" placeholder="Chọn id thành viên" />
                                        )}
                                    />

                                </Grid>
                            </>}

                        </Grid>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <Button className='mr-2' onClick={handleAddPromotion} variant="contained" style={{ background: "#EE0232" }}>Thêm mới</Button>
                        <Button onClick={handleCloseAddPromotion} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default AddPromotion