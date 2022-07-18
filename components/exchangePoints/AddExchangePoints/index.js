import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Image from 'next/image'

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';

import { productService } from '../../../services/product.service';

import Autocomplete from '@mui/material/Autocomplete';
import { userService } from '../../../services/user.service';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import toast from "react-hot-toast";
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';

import { compareAsc, format } from 'date-fns'
import parseISO from 'date-fns/parseISO';
import * as XLSX from "xlsx";

import * as FileSaver from 'file-saver';

import ImportPoint from "../../notification";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AddExchangePoints = (props) => {

    const [openAddExchangePoints, setOpenAddExchangePoints] = useState(false);
    const [valueAddExchangePoints, setValueAddExchangePoints] = useState({
        id: '',
        name: '',
        score: '',
        url: '',
        listId: [],
        area: [],
        users: [],
    });



    const [imagesUpload, setImagesUpload] = useState(null);

    const [image, setImage] = useState(null);


    const handleCloseAddExchangePoints = () => {
        setOpenAddExchangePoints(false);
    };

    const handleAddExchangePoints = async () => {
        const body = new FormData();
        body.append("file", image);
        body.append("key", "mabimatidsoadjoassd");
        if (image != null) {
            const dataurl = await productService.upaloadFile(body);
            if (dataurl.status == 200) valueAddExchangePoints.url = dataurl.url;
        }

        const sdsdj = await productService.changeGift(valueAddExchangePoints);

        if (sdsdj.status == 200) {
            toast.success("Thêm đổi quà thành công");
            setOpenAddExchangePoints(false);
            props.setDataGift();
        } else {
            toast.error("Có lỗi ở đây!");
        }


    };

    const handleChangeFile = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setImagesUpload(URL.createObjectURL(i))
        }
    }

    const [city, setCIty] = useState([]);
    const [rowUser, setRowUser] = useState([]);



    const CallBack = (value) => {
        setValueAddExchangePoints({ ...valueAddExchangePoints, users: value });
    };
    const { renderImport, setOpenImport } = ImportPoint(CallBack);


    const handleExportFile = () => {

        const date = new Date();
        let dj = format(date, 'yyyy-MM-dd HH:MM:ss');
        dj = dj + "user";
        const dataexport = rowUser.map(item => {

            return {
                'Tên': item.name,
                'Số điện thoại': item.phone,
                'Mô tả': item.description,
                'id': item.id,
                'id_khataco':item.id_khataco,
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


            let data_user = await userService.getAll();
            if (data_user.status != 200) return;
            setRowUser(data_user.data);
        }
        fetchData();
    }, []);



    return {
        setOpenAddExchangePoints,
        renderAddExchangePoints: (<>
            <Dialog
                open={openAddExchangePoints}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAddExchangePoints}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Thêm đổi điểm</div>
                    <div className='form-AddExchangePoints'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Tên chiến dịch" variant="outlined" onChange={e => { setValueAddExchangePoints({ ...valueAddExchangePoints, name: e.target.value }) }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' type="number" fullWidth label="Điểm cần đạt" variant="outlined" onChange={e => { setValueAddExchangePoints({ ...valueAddExchangePoints, score: e.target.value }) }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    onChange={(e, newValue) => {
                                        setValueAddExchangePoints({ ...valueAddExchangePoints, area: newValue })
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

                            <Grid item xs={12}>

                                <Autocomplete
                                    multiple
                                    fullWidth
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    options={rowUser}
                                    onChange={(event, value) => setValueAddExchangePoints({ ...valueAddExchangePoints, users: value })}
                                    getOptionLabel={(option) => option.id_khataco}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} label="ID người dùng" placeholder="Chọn id người dùng" />
                                    )}
                                    sx={{ width: '500px' }}
                                />


                            </Grid>

                            <Grid item xs={12}>
                                <div className='form-file'>
                                    <div className='form-file__icon'><CloudUploadIcon sx={{ fontSize: 40 }} /><span>Upload hình ảnh</span></div>
                                    <div className='form-file__img mt-4'>
                                        {imagesUpload && <>
                                            <Image
                                                src={imagesUpload}
                                                width="100px"
                                                height="100px"
                                                quality={100}
                                            />
                                        </>}
                                    </div>
                                    <input type="file" accept="image/*" onChange={e => handleChangeFile(e)} />
                                </div>

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
                            <Button onClick={e => handleAddExchangePoints()} variant="contained" style={{ background: "#EE0232" }}>Thêm mới</Button>
                        </div>
                        <Button onClick={e => handleCloseAddExchangePoints()} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
            {renderImport}
        </>
        )
    }
}

export default AddExchangePoints