import React, { useState } from 'react'


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';


import { userService } from '../../../services/user.service';
import { productService } from '../../../services/product.service';
import toast from "react-hot-toast";

import parseISO from 'date-fns/parseISO';
import { compareAsc, format } from 'date-fns'



import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeletePromotion = (promotionChoose, FetchDataLoad) => {

    const [openDeletePromotion, setOpenDeletePromotion] = useState(false);

    const handleClickOpenDeletePromotion = () => {
        setOpenDeletePromotion(true);
        handleCloseMenu();
    };

    const handleClickCloseDeletePromotion = () => {
        setOpenDeletePromotion(false);
    };
    const [loading, setLoading] = useState(false);

    const handleClickDeletePromotion = async () => {

        let item = promotionChoose;
        item.status = 1;
        setLoading(true);

        const data = await productService.deleteprom(item);
        setLoading(false);
        if (data.status == 200) {
            toast.success("Xóa thành công");
            setOpenDeletePromotion(false);
            FetchDataLoad();
        } else {
            toast.error(data ? data.message : "có lỗi ở đây");
        }

    };



    return {
        setOpenDeletePromotion,
        renderDeletePromotion: (<>
            <Dialog
                open={openDeletePromotion}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickCloseDeletePromotion}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="modal-delete--warning"><div className="modal-delete--warning__content">!</div></div>
                    <div><h2 className="text-warning mb-2">Bạn có chắc chắn?</h2></div>
                    {promotionChoose && <>
                        <div className="mb-5">Bạn có chắc chắn muốn xoá khuyến mại <strong>{promotionChoose.code}</strong> ?</div>
                    </>}
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={e => handleClickDeletePromotion()} variant="contained" style={{ background: "#EE0232" }}>Đồng ý</Button>
                        </div>
                        <Button onClick={e => handleClickCloseDeletePromotion()} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy</Button>
                    </div>

                </DialogContent>

            </Dialog>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10000 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </>)
    }
}

export default DeletePromotion