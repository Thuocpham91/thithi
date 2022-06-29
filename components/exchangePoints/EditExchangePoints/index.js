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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const EditExchangePoints = (chooseItem) => {

    const [imagesUpload, setImagesUpload] = useState(null);

    const [image, setImage] = useState(null);

    const [openEditExchangePoints, setOpenEditExchangePoints] = useState(false);
    const [value, setValue] = useState({
        id: '',
        name: '',
        score: '',
        url: ''
    });


    useEffect(() => {
        if (chooseItem != null) {
            setValue(chooseItem);
        }
    }, [chooseItem]);


    const handleCloseEditExchangePoints = () => {
        setOpenEditExchangePoints(false);
    };




    const [city, setCIty] = useState([]);
    const [rowUser, setRowUser] = useState([]);


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
    const handleEditExchangePoints = async () => {


        const body = new FormData();
        body.append("file", image);

        if (image != null) {
            const sdsd = await productService.upaloadFile(body);
            value.url = sdsd.url;
        }

        if(byID)value.area=[];
        if(!byID)value.users=[];


        const sdsdkkj = await productService.updateGift(value);

        if (sdsdkkj.status == 200) {
            toast.success("Sửa thành công");
            setOpenEditExchangePoints(false);
        } else {
            toast.error("Có lỗi ở đây!");
        }


    };

    const handleChangeImg = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);

            setImagesUpload(URL.createObjectURL(i))
        }

    }
    const [byID, setById] = useState(false);

    const handleChangeById = () => {
        setById(!byID);
      
    };

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


    return {
        setOpenEditExchangePoints,
        renderEditExchangePoints: (<>
            <Dialog
                open={openEditExchangePoints}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEditExchangePoints}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Thêm đổi điểm</div>
                    <div className='form-EditExchangePoints'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Tên chiến dịch" variant="outlined" onChange={e => { setValue({ ...value, name: e.target.value }) }} value={value.name} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Điểm cần đạt" variant="outlined" onChange={e => { setValue({ ...value, score: e.target.value }) }} value={value.score} />
                            </Grid>

                            {!byID && <>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        value={checkJson(value.area)?JSON.parse(value.area): [] }
                                        onChange={(e, newValue) => {
                                            setValue({ ...value, area: newValue })
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
                                        multiple
                                        fullWidth
                                        value={value.users}
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        options={rowUser}
                                        onChange={(event, value) => setValue({ ...value, users: value })}
                                        getOptionLabel={(option) => option.id_khataco}
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} label="ID người dùng" placeholder="Chọn id người dùng" />
                                        )}
                                        sx={{ width: '500px' }}
                                    />


                                </Grid>
                            </>}
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
                                    <input type="file" accept="image/*" onChange={e => handleChangeImg(e)} />
                                </div>

                            </Grid>
                        </Grid>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={e => handleEditExchangePoints()} variant="contained" style={{ background: "#EE0232" }}>Sửa</Button>
                        </div>
                        <Button onClick={handleCloseEditExchangePoints} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>)
    }
}

export default EditExchangePoints