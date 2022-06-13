import React, {useState} from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ImportPoint = () => {
    const [openImport, setOpenImport] = useState(false);


    const handleCloseImport = () => {
        setOpenImport(false);
    };

    const [fileImport, setFileImport] = useState(null);
    const handleChangeFile = (file) => {
         setFileImport(file[0].name)
    }


    return {
    setOpenImport,
    renderImport:(<>
            <Dialog
                open={openImport}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseImport}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="header-title-popup p-4 font-bold">Import điểm thành viên</div>
                    <div className='form-file'>
                        <div className='form-file__icon'><CloudUploadIcon sx={{ fontSize: 40 }}/><span>Import file điểm thành viên</span></div>
                        <div className=' mt-4'>
                            {fileImport &&<>
                                {fileImport}
                            </>}
                        </div>
                        <input type="file"  accept=".xlsx, .xls, .csv" onChange={e => handleChangeFile(e.target.files)}/> 
                    </div>
                    <div className='flex justify-center mt-8 mb-3'>
                    <Button className='mr-2' onClick={handleCloseImport} variant="contained" style={{background:"#EE0232"}}>Import</Button>
                    <Button onClick={handleCloseImport} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
        )
    }
}

export default ImportPoint