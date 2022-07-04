
import React, { useState, useEffect } from 'react'

import AdminLayout from "../../../layouts/Admin";
import Image from 'next/image'
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


import EditIcon from '@mui/icons-material/Edit';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';






import AddExchangePoints from "../../../components/exchangePoints/AddExchangePoints";
import EditExchangePoints from "../../../components/exchangePoints/EditExchangePoints";
import DeleteExchangePoints from "../../../components/exchangePoints/DeleteExchangePoints";


import { productService } from '../../../services/product.service';


const loadImg = ({ src , width }) => {
  return `http://202.92.6.221:3000/${src}?w=${width}}`
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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const ExchangePoints = () => {

  // table

  
  const [listGif, setListGif] = useState([]);



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listGif.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // end table



  const [anchorEl, setAnchorEl] = useState(null);


  useEffect(() => {

    async function fetchData() {
      let data = await productService.getGift();
      if (data.status != 200) return;

      setListGif(data.data)

    }
    fetchData();


  }, [])


  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event, row) => {
    setChooseItem(row);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [chooseItem, setChooseItem] = useState(null);


  // add  DeleteExchangePoints
  const { renderAddExchangePoints, setOpenAddExchangePoints } = AddExchangePoints();


  // Edit  
  const { renderEditExchangePoints, setOpenEditExchangePoints } = EditExchangePoints(chooseItem);

  // Delete  EditExchangePoints
  const { renderDeleteExchangePoints, setOpenDeleteExchangePoints } = DeleteExchangePoints(chooseItem,callback);



const callback=()=>{


}

  return (
    <div className='body-user bg-white rounded-lg'>
      <div className='header-user flex justify-between px-4 py-5 items-center'>
        <h3>Quản lý đổi quà</h3>
        <div>
          <Button className='mr-2' onClick={e => setOpenAddExchangePoints(true)} variant="contained" style={{ background: "#EE0232" }} startIcon={<AddIcon />} >Thêm Quà</Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Điểm đổi</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? listGif.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : listGif
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell >
                  {row.name}
                </TableCell>
                <TableCell >
                  {row.score.toLocaleString()}
                </TableCell>
                <TableCell  >
                  {row.url && <>
                    <Image 
                      loader={loadImg}
                      alt={row.name}
                      src={row.url}
                      width={50}
                      height="50px"
                      quality={100}
                    />
                  </>}
                </TableCell>
                <TableCell style={{ width: 100 }} align="right">
                  <Button
                    aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={e => handleOpenMenu(e, row)}
                    style={{ color: "#EE0232" }}
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
                colSpan={6}
                count={listGif.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Hàng trên bảng',
                  },
                  native: true,
                }}
                labelRowsPerPage = "Hàng trên bảng"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem onClick={e => setOpenEditExchangePoints(true)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Chỉnh sửa</ListItemText>
        </MenuItem>

        <MenuItem onClick={e => setOpenDeleteExchangePoints(true)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Xóa</ListItemText>
        </MenuItem>
      </Menu>

      {/* add */}
      {renderAddExchangePoints}

      {/* edit */}
      {renderEditExchangePoints}

      {/* Delete */}
      {renderDeleteExchangePoints}




    </div>
  )
}

export default ExchangePoints

ExchangePoints.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};