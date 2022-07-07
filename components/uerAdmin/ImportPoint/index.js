import React, { useState } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import * as XLSX from "xlsx";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import toast from "react-hot-toast";
import { userService } from '../../../services/user.service';


import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { loadListUser } from '../../../Store/actions'
import { useSelector, useDispatch } from 'react-redux'



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ImportPoint = (dataUser) => {
    const dispatch = useDispatch();

    const [openImport, setOpenImport] = useState(false);
    const [ishowproces, setIshowproces] = useState(false);

    const [dataImport, setDataImport] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleCloseImport = () => {
        setOpenImport(false);
    };

    const HandleImport = async () => {

        if (dataImport.length <= 0) return toast.error("Chưa có dữ liệu");
        setLoading(true);
        const data = await userService.importUser({listUser:dataImport});

        if (data.status == 200) {
            toast.success("Import điểm thành công");
            dispatch(loadListUser(34));
            setOpenImport(false);
            // props.fetchData();
        } else {
            toast.error("Có lỗi ở đây!");
        }
        setLoading(false);
        console.log(data);

    };


    const handleChangeFile = (e) => {
        setIshowproces(true);


        setTimeout(function () {
            const [file] = e.target.files;
            const reader = new FileReader();

            reader.onload = (evt) => {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                // const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
                const json = XLSX.utils.sheet_to_json(ws);
                const data_import = json.map(item => { return { id: item.id_user, score: item.score } });
                setDataImport(data_import);
            };
            reader.readAsBinaryString(file);

            setIshowproces(false);
        }, 2000);


    }





    return {
        setOpenImport,
        renderImport: (<>
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
                        <div className='form-file__icon'><CloudUploadIcon sx={{ fontSize: 40 }} /><span>Import file điểm thành viên</span></div>

                        <input type="file" accept=".xlsx" onChange={e => handleChangeFile(e)} />
                    </div>

                    {ishowproces ? <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box> : ""}


                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button  onClick={e => HandleImport(e)} variant="contained" style={{ background: "#EE0232" }}>Import</Button>
                        </div>
                        <Button onClick={handleCloseImport} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
        )
    }
}

export default ImportPoint