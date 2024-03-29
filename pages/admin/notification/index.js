import React, { useState, useEffect } from 'react'
import AdminLayout from "../../../layouts/Admin";
import AddPromotion from "../../../components/promotion/AddPromotion";
import AddAppKey from "../../../components/promotion/AddAppKey";

import DeletePromotion from "../../../components/promotion/DeletePromotion";

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { compareAsc, format } from 'date-fns'
import { productService } from '../../../services/product.service';

// 
import EditPromotionD from "../../../components/promotion/EditPromotion/dialog";
import parseISO from 'date-fns/parseISO';


import {  userService} from '../../../services/user.service';

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};





const checkJson = (string) => {
    let rp;
    try {
        if (string == null) return false;
        rp = JSON.parse(string);
        rp.map(item => { })
        return true;
    } catch (erro) {
        return false;
    }

};


const Promotion = () => {

    const [listPromotion, seListPromotion] = useState([]);
    const [listAppKey, setListAppKey] = useState([]);


    async function fetchData() {
        let data = await userService.getNotification();
        if (data.status != 200) return;

        seListPromotion(data.data)

    }
    useEffect(() => {


        fetchData();

        async function fetchDataAppkey() {
            let data = await productService.getAppKey();
            console.log(data)
            if (data.status != 200) return;
            setListAppKey(data.data);
          
        }
        fetchDataAppkey();
    }, []);




    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listPromotion.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };




    //   menu
    const [anchorEl, setAnchorEl] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [dialogEdit, setDialogEdit] = useState(false);

    const [promotionChose, setPromotionChose] = useState({});
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event, row) => {
        if (!row) return;

        const dataa = {
            ...row, area: checkJson(row.area) ? JSON.parse(row.area) : [],
            users: checkJson(row.users) ? JSON.parse(row.users) : [],

            citys_id: checkJson(row.citys_id) ? JSON.parse(row.citys_id) : [],
            product_name: checkJson(row.product_name) ? JSON.parse(row.product_name) : [],
            users_Id: checkJson(row.users_Id) ? JSON.parse(row.users_Id) : []
        };

        setPromotionChose(dataa)
        setAnchorEl(event.currentTarget);
        setOpenEdit(true)
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };



    const FetchDataLoad = async () => {
        fetchData();
    }


    // add Promotion
    const { renderAddPromotion, setOpenAddPromotion } = AddPromotion( FetchDataLoad );

    // add app key
    const { renderAppKey, setRenderAppKey } = AddAppKey( FetchDataLoad );

    const { renderDeletePromotion, setOpenDeletePromotion } = DeletePromotion(promotionChose,  FetchDataLoad );




    const handleOpenEditPromotion = (check, row) => {
        try {

            if (!row) return;
            const dataa = {
                ...row, area: checkJson(row.area) ? JSON.parse(row.area) : [],
                users: checkJson(row.users) ? JSON.parse(row.users) : [],

                citys_id: checkJson(row.citys_id) ? JSON.parse(row.citys_id) : [],
                product_name: checkJson(row.product_name) ? JSON.parse(row.product_name) : [],
                users_Id: checkJson(row.users_Id) ? JSON.parse(row.users_Id) : []
            };

            setPromotionChose(dataa);

            // setOpenEdit(false);
            setDialogEdit(true);




        } catch (erro) {
            console.log(erro)


        };

    };


    
    const checkNameApp =  (list,listAppkey) => {
        
        let aray=[];
        try {
            let list_=JSON.parse(list)

            for(const items of list_ ){

                let ob= listAppkey.find(item => item.key== items);

                if(ob){
    
                    aray.push(ob.name)                
                }
    
           }
            
        } catch (error) {
            aray=[]
        }
    
       return aray;
    }


    // delete Promotion
    // const { renderDeletePromotion, setOpenDeletePromotion } = DeletePromotion(promotionChoose);
    const handleOpenDeletePromotion = (heck, row) => {
        // const row={...value,status:1 };

        if (!row) return;

        const dataa = {
            ...row, area: checkJson(row.area) ? JSON.parse(row.area) : [],
            users: checkJson(row.users) ? JSON.parse(row.users) : [],

            citys_id: checkJson(row.citys_id) ? JSON.parse(row.citys_id) : [],
            product_name: checkJson(row.product_name) ? JSON.parse(row.product_name) : [],
            users_Id: checkJson(row.users_Id) ? JSON.parse(row.users_Id) : [],
            status: 1
        };


        setPromotionChose(dataa);

        setOpenEdit(false);

        setOpenDeletePromotion(true);
    };



    return (<>
        <div className='body-user bg-white rounded-lg'>
            <div className='header-user flex justify-between px-4 py-5 items-center'>
                <h3>Danh sách Notification</h3>
                <div>
                    <Button className='mr-2' onClick={e => setOpenAddPromotion(true)} variant="contained" style={{ background: "#EE0232" }} startIcon={<AddIcon />} >Tạo Notification</Button>
                </div>
                <div>
                    <Button className='mr-2' onClick={e => setRenderAppKey(true)} variant="contained" style={{ background: "#EE0232" }} startIcon={<AddIcon />} >Thêm App key</Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell> 
                            <TableCell>App Key</TableCell> 
                            <TableCell>Tên App</TableCell> 
                            
                            <TableCell>Tiêu đề</TableCell>
                            <TableCell>Nội dung</TableCell>
                        
                            <TableCell>Thời gian</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listPromotion.map((row) => (
                            <TableRow key={row.id}>
                               <TableCell  >
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                      {row.app_key}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    { checkNameApp(row.app_key,listAppKey).join(";") }
                                </TableCell>
                                <TableCell  >
                                    {row.title}
                                </TableCell>
                               
                                <TableCell >
                                    {row.message}
                                </TableCell>
                              
                              
                              
                                <TableCell  >

                                    {row.created_at ? format(parseISO(row.created_at), 'yyyy-MM-dd HH:mm') : ""}

                                </TableCell>
                   
                                {/* <TableCell style={{ width: 30 }} align="right">


                                    <MenuView
                                        openEdit={handleOpenEditPromotion}
                                        openDelete={handleOpenDeletePromotion}
                                        row={row}

                                    ></MenuView>


                                </TableCell> */}

                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 50, { value: -1, label: 'Tất cả' }]}
                                colSpan={9}
                                count={listPromotion.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                labelRowsPerPage="Hàng trên bảng"
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'Hàng trên bảng',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>





        {/* add Promotion */}
        {renderAddPromotion}
        {renderAppKey}

        {/* edit Promotion */}
        {/* {renderEditPromotion} */}

        {/* delete Promotion */}
        {renderDeletePromotion}

        <EditPromotionD
            fetchDataLoad={FetchDataLoad}
            open={dialogEdit}
            setOpen={setDialogEdit}
            item={promotionChose}
        ></EditPromotionD>



    </>)
}


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };




    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

const MenuView = ({ openEdit, openDelete, row }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        setAnchorEl(null);
    };



    return (<>
        <Button
            aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}
            style={{ color: "#EE0232" }}
        >
            <MoreHorizIcon />
        </Button>

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >

            <MenuItem onClick={e => openEdit(true, row)} >
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Chỉnh sửa</ListItemText>
            </MenuItem>

            <MenuItem onClick={e => openDelete(true, row)} >
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Xóa</ListItemText>
            </MenuItem>
        </Menu>


    </>)
}

export default Promotion

Promotion.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
