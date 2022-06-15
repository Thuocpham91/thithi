import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Image from 'next/image'

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';

import toast from "react-hot-toast";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const EditExchangePoints = (chooseItem) => {
    
    const [openEditExchangePoints, setOpenEditExchangePoints] = useState(false);
    const [value, setValue] = useState({
        id:'',
        name:'',
        poit:'',
        image:''
    });

    useEffect(() => {
        if(chooseItem != null){
            setValue(chooseItem);
        }
    },[chooseItem]);


    const handleCloseEditExchangePoints = () => {
        setOpenEditExchangePoints(false);
    };

    const handleChangeImg = (file) => {
        setValue({ 
            ...value,
            image:URL.createObjectURL(file[0])
        })
      }

    

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
                                <TextField className='mb-1' fullWidth label="Điểm cần đạt" variant="outlined" onChange={e => { setValue({ ...value, poit: e.target.value }) }} value={value.poit} />
                            </Grid>
                            <Grid item xs={12}>
                                <div className='form-file'>
                                    <div className='form-file__icon'><CloudUploadIcon sx={{ fontSize: 40 }} /><span>Upload hình ảnh</span></div>
                                    <div className='form-file__img mt-4'>
                                        {value.image && <>
                                        <Image
                                            src={value.image}
                                            width="100px"
                                            height="100px"
                                            quality={100}
                                        />
                                        </>}
                                    </div>
                                    <input type="file" accept="image/*"  onChange={e => handleChangeImg(e.target.files)} />
                                </div>

                            </Grid>
                        </Grid>
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <Button className='mr-2' onClick={handleCloseEditExchangePoints} variant="contained" style={{ background: "#EE0232" }}>Thêm mới</Button>
                        <Button onClick={handleCloseEditExchangePoints} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>)
    }
}

export default EditExchangePoints