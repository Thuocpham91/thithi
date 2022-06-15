import React, {useState} from 'react'
import Button from '@mui/material/Button';


import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';







const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteExchangePoints = (chooseItem) => {

    const [openDeleteExchangePoints, setOpenDeleteExchangePoints] = useState(false);

  
    const handleClickCloseDeleteExchangePoints = () => {
      setOpenDeleteExchangePoints(false);
    };
  


    return {
        setOpenDeleteExchangePoints,
        renderDeleteExchangePoints:(<>
            <Dialog
                open={openDeleteExchangePoints}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickCloseDeleteExchangePoints}
                fullWidth
                maxWidth="sm"
                >
                <DialogContent className='text-center'>


                    <div className="modal-delete--warning"><div className="modal-delete--warning__content">!</div></div>
                    <div><h2 className="text-warning mb-2">Bạn có chắc chắn?</h2></div>
                    {chooseItem&& <>
                    <div className="mb-5">Bạn có chắc chắn muốn xoá chiến dịch <strong>{chooseItem.name}</strong> ?</div>
                    </>}
                    <div className='flex justify-center mt-8 mb-3'>
                    <Button className='mr-2' onClick={handleClickCloseDeleteExchangePoints} variant="contained" style={{background:"#EE0232"}}>Đồng ý</Button>
                    <Button onClick={handleClickCloseDeleteExchangePoints} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy</Button>
                    </div>
                    
                </DialogContent>

                </Dialog>
                
        </>)
    }
}

export default DeleteExchangePoints