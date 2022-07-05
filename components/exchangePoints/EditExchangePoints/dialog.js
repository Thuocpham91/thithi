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

const EditExchangePointsDia = ({ open, closeDialog,data }) => {

    const [imagesUpload, setImagesUpload] = useState(null);

    const [image, setImage] = useState(null);
    const [value, setValue] = useState(null);


    const handleCloseEditExchangePoints = () => {
        closeDialog(false);
    };

   
console.log(data)

    const [city, setCIty] = useState([]);
    const [rowUser, setRowUser] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setValue(data);
  
        }
        fetchData();
    }, [data]);

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
            console.log(sdsd)
            if(sdsd.status==200)  value.url = sdsd.url;
          
        }



        const sdsdkkj = await productService.updateGift(value);

        if (sdsdkkj.status == 200) {
            toast.success("Sửa thành công");
            closeDialog(false);
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



    return (

        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={e => closeDialog(false)}
            fullWidth
            maxWidth="sm"
        >
            <DialogContent className='text-center'>
                <div className="header-title-popup p-4 font-bold">Sửa đổi điểm</div>
                <div className='form-EditExchangePoints'>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Tên chiến dịch" variant="outlined" onChange={e => { setValue({ ...value, name: e.target.value }) }} value={value ? value.name : ""} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className='mb-1' fullWidth label="Điểm cần đạt" variant="outlined" onChange={e => { setValue({ ...value, score: e.target.value }) }} value={value ? value.score : ""} />
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                value={value ? value.area : []}
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


                        <Grid item xs={12}>

                            <Autocomplete
                                multiple
                                fullWidth
                                // defaultValue={value ? checkJson(value.id_khataco) ? JSON.parse(value.id_khataco) : [] : []}
                                value={value ? value.users : []}

                                limitTags={2}
                                id="multiple-limit-tags"
                                options={rowUser}
                                onChange={(event, newvalue) =>  {setValue({ ...value, users: newvalue })}}
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
    )
}

export default EditExchangePointsDia