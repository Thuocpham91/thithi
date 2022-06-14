import React, {useState} from 'react'
import AdminLayout from "../../../layouts/Admin";
import AddPromotion from "../../../components/promotion/AddPromotion";
import EditPromotion from "../../../components/promotion/EditPromotion";
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

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



  
  
  
  const Promotion = () => {
    
    const  [listPromotion, seListPromotion] = useState([
        {id:1,title:'3c - 5g',code:'NN6',numberOfUses:6,startDate:'16-06-2022',endDate:'22-06-2022',product:'Ngựa nhỏ 2',area:[{id:'01',name:'Hà nội'},{id:'02',name:'Hồ chí minh'}]},
        {id:2,title:'12c - 8g',code:'NN8',numberOfUses:6,startDate:'16-06-2022',endDate:'22-06-2022',product:'Ngựa nhỏ',area:[{id:'01',name:'Hà nội'},{id:'02',name:'Hồ chí minh'}]},
        {id:3,title:'3c - 5g',code:'NN6',numberOfUses:6,startDate:'16-06-2022',endDate:'22-06-2022',product:'Ngựa lớn',area:[{id:'01',name:'Hà nội'},{id:'02',name:'Hồ chí minh'}]},
        {id:4,title:'3c - 5g',code:'NN6',numberOfUses:6,startDate:'16-06-2022',endDate:'22-06-2022',product:'Ngựa nhỏ 2',area:[{id:'01',name:'Hà nội'},{id:'02',name:'Hồ chí minh'}]},
        {id:5,title:'12c - 8g',code:'NN8',numberOfUses:6,startDate:'16-06-2022',endDate:'22-06-2022',product:'Ngựa nhỏ ',area:[{id:'01',name:'Hà nội'},{id:'02',name:'Hồ chí minh'},{id:'03',name:'Nghệ an'}]},
        {id:6,title:'3c - 5g',code:'NN6',numberOfUses:6,startDate:'16-06-2022',endDate:'22-06-2022',product:'Ngựa nhỏ 2',area:[{id:'01',name:'Hà nội'},{id:'02',name:'Hồ chí minh'}]},
        {id:7,title:'12c - 8g',code:'NN8',numberOfUses:6,startDate:'16-06-2022',endDate:'22-06-2022',product:'Ngựa lớn',area:[{id:'01',name:'Hà nội'},{id:'02',name:'Hồ chí minh'}]},
        {id:8,title:'3c - 5g',code:'NN6',numberOfUses:6,startDate:'16-06-2022',endDate:'22-06-2022',product:'Ngựa nhỏ 2',area:[{id:'01',name:'Hà nội'},{id:'02',name:'Hồ chí minh'}]},
    ]);
  
  
  
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
    const [promotionChoose, setPromotionChoose] = useState(null);

    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event, row) => {
        setPromotionChoose(row)
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    


    // add Promotion
    const {renderAddPromotion, setOpenAddPromotion} = AddPromotion();

    // Edit Promotion
    const {renderEditPromotion, setOpenEditPromotion} = EditPromotion(promotionChoose);

    const handleOpenEditPromotion = () => {
        handleCloseMenu();
        setOpenEditPromotion(true)
    };

    // delete Promotion
    const {renderDeletePromotion, setOpenDeletePromotion} = DeletePromotion(promotionChoose);
    const handleOpenDeletePromotion = () => {
        handleCloseMenu();
        setOpenDeletePromotion(true)
    };


  
    return (<>
        <div className='body-user bg-white rounded-lg'>
            <div className='header-user flex justify-between px-4 py-5 items-center'>
            <h3>Danh sách khuyến mại</h3>
            <div>
                <Button className='mr-2' onClick={e => setOpenAddPromotion(true)} variant="contained" style={{background:"#EE0232"}} startIcon={<AddIcon />} >Thêm khuyến mại</Button>
            </div> 
            </div> 
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell>Mã</TableCell>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell className='text-right'>Lần dùng</TableCell>
                    <TableCell>Tỉnh/Thành áp dụng </TableCell>
                    <TableCell>Ngày bắt đầu</TableCell>
                    <TableCell>Ngày kết thúc</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {(rowsPerPage > 0
                    ? listPromotion.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : listPromotion
                ).map((row,idx) => (
                    <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell >
                        {row.title}
                    </TableCell>
                    <TableCell >
                        {row.code}
                    </TableCell>
                    <TableCell >
                        {row.product}
                    </TableCell>
                    <TableCell className='text-right'>
                        {row.numberOfUses}
                    </TableCell>
                    <TableCell style={{ width: 280 }}>
                        <div className='area-list'>
                            {
                                row.area.map( function(d,idx){
                                    return(
                                    <span key={idx}>{d.name}<i>, </i></span>    
                                    )
                                })
                            }
                        </div>
                    </TableCell>
                    <TableCell >
                        {row.startDate}
                    </TableCell>
                    <TableCell >
                        {row.endDate}
                    </TableCell>
                    <TableCell style={{ width: 100 }} align="right">
                    <Button
                        aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={ e => handleOpenMenu(e, row)}
                        style={{color:"#EE0232"}}
                        >
                        <MoreHorizIcon />
                        </Button>
    
                    </TableCell>
                    
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
    
  
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
    
            <MenuItem  onClick={ handleOpenEditPromotion} >
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Chỉnh sửa</ListItemText>
            </MenuItem>
            
            <MenuItem >
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Xóa</ListItemText>
            </MenuItem>
        </Menu>

        {/* add Promotion */}
        {renderAddPromotion}

        {/* edit Promotion */}
        {renderEditPromotion}

        {/* delete Promotion */}
        {renderDeletePromotion}
  
  
    </>)
  }
  
  export default Promotion
  
  Promotion.getLayout = function getLayout(page) {
      return <AdminLayout>{page}</AdminLayout>;
    };
    