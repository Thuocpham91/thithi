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
const AddExchangePoints = () => {
    
    const [openAddExchangePoints, setOpenAddExchangePoints] = useState(false);
    const [valueAddExchangePoints, setValueAddExchangePoints] = useState({
        id:'',
        name:'',
        poit:'',
        image:''
    });


    const handleCloseAddExchangePoints = () => {
        setOpenAddExchangePoints(false);
    };

    const handleChangeImg = (file) => {
        setValueAddExchangePoints({ 
            ...valueAddExchangePoints,
            image:URL.createObjectURL(file[0])
        })
      }

    

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
                                <TextField className='mb-1' fullWidth label="Tên chiến dịch" variant="outlined" onChange={e => { setValueAddExchangePoints({ ...valueAddExchangePoints, name: e.target.value }) }} value={valueAddExchangePoints.name} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className='mb-1' fullWidth label="Điểm cần đạt" variant="outlined" onChange={e => { setValueAddExchangePoints({ ...valueAddExchangePoints, poit: e.target.value }) }} value={valueAddExchangePoints.poit} />
                            </Grid>
                            <Grid item xs={12}>
                                <div className='form-file'>
                                    <div className='form-file__icon'><CloudUploadIcon sx={{ fontSize: 40 }} /><span>Upload hình ảnh</span></div>
                                    <div className='form-file__img mt-4'>
                                        {valueAddExchangePoints.image && <>
                                        <Image
                                            src={valueAddExchangePoints.image}
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
                        <Button className='mr-2' onClick={ e=> handleClickAddExchangePoints()} variant="contained" style={{ background: "#EE0232" }}>Thêm mới</Button>
                        <Button onClick={handleCloseAddExchangePoints} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default AddExchangePoints