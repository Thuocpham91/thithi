import React, { useState } from 'react'


import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import toast from "react-hot-toast";


import { userService } from '../../../services/user.service';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteUser = (userChoose) => {

    const [openDeleteUser, setOpenDeleteUser] = useState(false);

    const handleClickOpenDeleteuser = () => {
        setOpenDeleteUser(true);
        handleCloseMenu();
    };

    const handleClickCloseDeleteUser = () => {


        setOpenDeleteUser(false);
    };


    const handleDeleteUser = async () => {

        const data = await userService.deleteUser({ id: userChoose.id, code: 1 });
        if (datah.status == 200) {
            toast.success("Thêm thành viên thành công");
            setOpenAddUser(false);
        } else {
            toast.error("Có lỗi ở đây!");
        }
        setOpenDeleteUser(false);
    };


    return {
        setOpenDeleteUser,
        renderDeleteUser: (<>
            <Dialog
                open={openDeleteUser}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickCloseDeleteUser}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent className='text-center'>
                    <div className="modal-delete--warning"><div className="modal-delete--warning__content">!</div></div>
                    <div><h2 className="text-warning mb-2">Bạn có chắc chắn?</h2></div>
                    {userChoose && <>
                        <div className="mb-5">Bạn có chắc chắn muốn xoá thành viên <strong>{userChoose.name}</strong> ?</div>
                    </>}
                    <div className='flex justify-center mt-8 mb-3'>
                        <div className='mr-4'>
                            <Button onClick={e => handleDeleteUser()} variant="contained" style={{ background: "#EE0232" }}>Đồng ý</Button>
                        </div>
                        <Button onClick={handleClickCloseDeleteUser} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy</Button>
                    </div>

                </DialogContent>

            </Dialog>

        </>)
    }
}

export default DeleteUser