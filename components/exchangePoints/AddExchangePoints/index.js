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
const AddExchangePoints = () => {

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

        const sdsd = await productService.upaloadFile(body);
        valueAddExchangePoints.url = sdsd.url;


        if (!byID) valueAddExchangePoints.users= [];
        if (byID) valueAddExchangePoints.area= [];


        const sdsdj = await productService.changeGift(valueAddExchangePoints);

        if (sdsdj.status == 200) {
            toast.success("Thêm đổi quà thành công");
            setOpenAddExchangePoints(false);
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

    const [byID, setById] = useState(false);

    const handleChangeById = () => {
        setById(!byID);
      
    };

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
                                <TextField className='mb-1' fullWidth label="Tên chiến dịch" variant="outlined" onChange={e => { setValueAddExchangePoints({ ...valueAddExchangePoints, name: e.target.value }) }}  />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' type="number" fullWidth label="Điểm cần đạt" variant="outlined" onChange={e => { setValueAddExchangePoints({ ...valueAddExchangePoints, score: e.target.value }) }}  />
                            </Grid>
                            {!byID && <>
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
                                    <input type="file" accept="image/*" onChange={e => handleChangeFile(e)} />
                                </div>

                            </Grid>
                        </Grid>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={e => handleAddExchangePoints()} variant="contained" style={{ background: "#EE0232" }}>Thêm mới</Button>
                        </div>
                        <Button onClick={e => handleCloseAddExchangePoints()} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default AddExchangePoints