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
import toast from "react-hot-toast";

import parseISO from 'date-fns/parseISO';

import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';

import * as XLSX from "xlsx";

import * as FileSaver from 'file-saver';

import ImportPoint from "../../notification";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const EditPromotionD = (props) => {

    const handleCloseEditPromotion = () => {
        props.setOpen(false);
    };

    const handleEditPromotion = async () => {



        if (!valueAddPromotion.startDate) return toast.error("Bạn chưa nhập Thời gian  bắt đầu");
        if (!valueAddPromotion.endDate) return toast.error("Bạn chưa nhập Thời gian kết thúc");
        if (isNaN(Number(valueAddPromotion.numberOfUses))) return toast.error("nhập sai số");
        if (isNaN(Number(valueAddPromotion.quantityPurchased))) return toast.error("nhập sai số lượng mua");
        if (valueAddPromotion.product == "") return toast.error("Bạn chưa chọn product");


        valueAddPromotion.endDate = format(parseISO(valueAddPromotion.endDate), 'yyyy-MM-dd HH:mm:ss');
        valueAddPromotion.startDate = format(parseISO(valueAddPromotion.startDate), 'yyyy-MM-dd HH:mm:ss ');

        const data = await productService.updatePromotion(valueAddPromotion);
        if (data.status == 200) {
            toast.success("sửa thành công");
            props.setOpen(false);
            props.fetchDataLoad();
        } else {
            toast.error("Có lỗi ở đây!");
        }
    };

    const [valueAddPromotion, setValueAddPromotion] = useState();



    useEffect(() => {

        async function fetchData() {
            setValueAddPromotion(props.item);
        }
        fetchData();
    }, [props]);



    const [city, setCIty] = useState([]);
    const [rowUser, setRowUser] = useState([]);


    const CallBack = (value) => {
        console.log(value)
        setValueAddPromotion({ ...valueAddPromotion, users: value });
    };
    const { renderImport, setOpenImport } = ImportPoint(CallBack);


    const handleExportFile = () => {
        console.log(rowUser)

        const date = new Date();
        let dj = format(date, 'yyyy-MM-dd HH:MM:ss');
        dj = dj + "user";
        const dataexport = rowUser.map(item => {

            return {
                'Tên': item.name,
                'Số điện thoại': item.phone,
                'Mô tả': item.description,
                'id': item.id,
                'id_khataco': item.id_khataco,
            }
        }
        )
        exportToCSV(dataexport, dj);
    }
    const exportToCSV = (csvData, fileName) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }



    useEffect(() => {

        async function fetchData() {
            let data = await userService.getCitiDistrict({ key: "city" });
            if (data.status != 200) return;
            setCIty(data.city);
            // setDisStrict(data.district)
            let data_user = await userService.getAll();
            if (data_user.status != 200) return;
            setRowUser(data_user.data);
        }
        fetchData();
    }, []);


    const [productItems, setproductItems] = useState([]);
    useEffect(() => {
        const fda = JSON.parse(localStorage.getItem('listVariants'));
        if (fda == null) return;
        setproductItems(fda);
    }, [])




    const checkJson = (string) => {
        let rp;
        try {
            if (string == null) return false;
            rp = JSON.parse(string);
            return true;
        } catch (erro) {
            return false;
        }

    };





    return (
        <>

            {renderImport}


            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={e => props.setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Chỉnh sửa khuyến mại</div>
                    <div className='form-AddPromotion'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Tiêu đề" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, title: e.target.value })} value={valueAddPromotion ? valueAddPromotion.title : ""} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Mã code" variant="outlined" disabled onChange={e => setValueAddPromotion({ ...valueAddPromotion, code: e.target.value })} value={valueAddPromotion ? valueAddPromotion.code : ""} />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider className="w-full" dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        fullWidth
                                        className="w-full"
                                        label="Thời gian bắt đầu"
                                        value={valueAddPromotion ? valueAddPromotion.startDate : null}
                                        onChange={(newValue) => {
                                            if (newValue == "Invalid Date") return;
                                            const date = new Date(newValue);
                                            const dj = format(date, 'yyyy-MM-dd HH:MM:ss')
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
                                        minDateTime={new Date(valueAddPromotion ? valueAddPromotion.startDate : null)}
                                        value={valueAddPromotion ? valueAddPromotion.endDate : null}
                                        onChange={(newValue) => {
                                            if (newValue == "Invalid Date") return;
                                            const date = new Date(newValue);
                                            const dj = format(date, 'yyyy-MM-dd HH:MM:ss')
                                            setValueAddPromotion({ ...valueAddPromotion, endDate: dj })
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Lần dùng" variant="outlined"
                                    onChange={e => setValueAddPromotion({ ...valueAddPromotion, numberOfUses: e.target.value })}
                                    value={valueAddPromotion ? valueAddPromotion.numberOfUses : 0} />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    multiple
                                    value={valueAddPromotion ? valueAddPromotion.product_name ? valueAddPromotion.product_name : [] : []}
                                    onChange={(e, newValue) => {


                                        if (!newValue) return;
                                        setValueAddPromotion({ ...valueAddPromotion, product_name: newValue })
                                    }}
                                    options={productItems}
                                    getOptionLabel={(option) => option.product_name}
                                    renderInput={(params) => <TextField {...params} label="Sản phẩm" />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Số lượng mua" variant="outlined"
                                    onChange={e => setValueAddPromotion({ ...valueAddPromotion, quantityPurchased: e.target.value })}
                                    value={valueAddPromotion ? valueAddPromotion.quantityPurchased : 0} />
                            </Grid>
                            {/* <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Số lượng khuyến mại" variant="outlined" onChange={e => setValueAddPromotion({ ...valueAddPromotion, promotionalQuantity: e.target.value })} value={valueAddPromotion?valueAddPromotion.promotionalQuantity:""} />
                        </Grid> */}
                            <Grid item xs={12}>
                                <Autocomplete
                                    onChange={(e, newValue) => {
                                        setValueAddPromotion({ ...valueAddPromotion, city_id: newValue })
                                    }}
                                    multiple
                                    fullWidth
                                    value={valueAddPromotion ? valueAddPromotion.area ? valueAddPromotion.area : [] : []}
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    options={city}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} label="Tỉnh thành" placeholder="Chọn khu vực" />
                                    )}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    fullWidth
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    value={valueAddPromotion ? valueAddPromotion.users ? valueAddPromotion.users : [] : []}
                                    options={rowUser}
                                    onChange={(event, value) => setValueAddPromotion({ ...valueAddPromotion, users: value })}
                                    getOptionLabel={(option) => option.id_khataco}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} label="ID người dùng" placeholder="Chọn id người dùng" />
                                    )}
                                    sx={{ width: '500px' }}
                                />


                            </Grid>

                        </Grid>
                        <div className='flex justify-center' style={{ marginTop: 20 }}>
                            <div className='mr-4'>
                                <Button onClick={e => setOpenImport(true)} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }} startIcon={<ControlPointDuplicateOutlinedIcon />}>Import Users</Button>
                            </div>
                            <div className='mr-4'>
                                <Button onClick={e => handleExportFile()} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }} startIcon={<ControlPointDuplicateOutlinedIcon />}>Export Users</Button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={e => handleEditPromotion()} variant="contained" style={{ background: "#EE0232" }}>Thay đổi</Button>
                        </div>
                        <Button onClick={e => handleCloseEditPromotion()} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )


}

export default EditPromotionD
