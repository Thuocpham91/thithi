import React, {useState} from 'react'


import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';







const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Promotion = (checkChangePoint,dChoose) => {

    const [openPromotion, setOpenPromotion] = useState(false);

    const handleClickClosePromotion = () => {
      setOpenPromotion(false);
    };

    const handlAgree = () => {
      setOpenPromotion(false);
      checkChangePoint.checkChangePoint(dChoose);
    };

    return {
        setOpenPromotion,
        renderPromotion:(<>
            <Dialog
                open={openPromotion}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickClosePromotion}
                fullWidth
                maxWidth="sm"
                >
                <DialogContent className='text-center'>
                    <div className="modal-delete--warning"><div className="modal-delete--warning__content">!</div></div>
                    <div><h2 className="text-warning mb-2">Bạn có chắc chắn?</h2></div>
                    <div className="mb-5">Bạn có chắc chắn muốn đổi điểm ?</div>
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={handlAgree} variant="contained" style={{background:"#EE0232"}}>Đồng ý</Button>
                        </div>
                        <Button onClick={handleClickClosePromotion} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy</Button>
                    </div>
                    
                </DialogContent>

                </Dialog>
                
        </>)
    }
}

export default Promotion