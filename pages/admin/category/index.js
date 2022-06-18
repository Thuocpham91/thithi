
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


import Slide from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { productService } from '../../../services/product.service';


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




  useEffect(() => {
    async function fetchData() {
      const finterData = [];
      let data = await productService.getProduct();
      if (data.status != 200) return;
      // setListProduct(data.data.variants);
      const dt = data.data.variants;
      dt.map(iten => {
        const ob = finterData.find(kk => { return kk.code == iten.variants[0].category.code });
        if (!ob) finterData.push(iten.variants[0].category);

      })
      const respont = await productService.updateCatogory({ data: finterData });
    }
    fetchData();


  }, []);



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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const Category = () => {

  const [listCate, seListCate] = useState([
    // { id: 1, name: 'White horse', image: '', },
    // { id: 2, name: 'CAMEL', image: '/images/list-cate/CAMEL.png' },
    // { id: 3, name: 'CRAVEN', image: '/images/list-cate/CRAVEN.png' },
    // { id: 4, name: 'Marlboro', image: '/images/list-cate/Marlboro.png' },
    // { id: 5, name: 'White horse', image: '' },
    // { id: 6, name: 'CAMEL', image: '/images/list-cate/CAMEL.png' },
    // { id: 7, name: 'CRAVEN', image: '/images/list-cate/CRAVEN.png' },
    // { id: 8, name: 'Marlboro', image: '/images/list-cate/Marlboro.png' },
    // { id: 9, name: 'White horse', image: '' },
    // { id: 10, name: 'CAMEL', image: '/images/list-cate/CAMEL.png' },
    // { id: 11, name: 'CRAVEN', image: '/images/list-cate/CRAVEN.png' },
    // { id: 12, name: 'Marlboro', image: '/images/list-cate/Marlboro.png' },
    // { id: 13, name: 'White horse', image: '' },
    // { id: 14, name: 'CAMEL', image: '/images/list-cate/CAMEL.png' },
    // { id: 15, name: 'CRAVEN', image: '/images/list-cate/CRAVEN.png' },
    // { id: 16, name: 'Marlboro', image: '/images/list-cate/Marlboro.png' },
  ]);




  
  useEffect(() => {
   
    ////
    async function getCategory() {
      let data = await productService.getCategory();
      if (data.status != 200) return;
      // setListProduct(data.data.variants);
      console.log(data.data)
      seListCate(data.data);
    }

    getCategory();

  }, []);



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listCate.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   edit category

  const [cateChoose, setCateChoose] = useState(null);
  const [openEditCate, setOpenEditCate] = useState(false);

  const handleOpenEditCate = (cate) => {
    setOpenEditCate(true);
    setCateChoose(cate);
    setImagesUpload(null)
  };

  const handleCloseEditCate = () => {
    setOpenEditCate(false);
  };

  const handleEditCate =async () => {
    const body = new FormData();
    body.append("file", image);
   

    const sdsd = await productService.upaloadFile(body);
    cateChoose.url=sdsd.url;
    const upda= await productService.updateCatogory({...cateChoose,key:3});


    setOpenEditCate(false);
  };


  const [imagesUpload, setImagesUpload] = useState(null);

  const [image, setImage] = useState(null);



  const handleChangeFile = (event) => {


    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setImagesUpload(URL.createObjectURL(i))
    }


    
  }

  return (<>
    <div className='body-user bg-white rounded-lg'>
      <div className='header-user flex justify-between px-4 py-5 items-center'>
        <h3>Danh mục sản phẩm</h3>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? listCate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : listCate
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell >
                  {row.name}
                </TableCell>
                <TableCell >
                  {row.code}
                </TableCell>
                <TableCell  >
                  {row.url && <>
                    <Image
                      alt={row.name}
                      src={row.url?row.url:'/images/list-cate/Marlboro.png'}
                      width="50px"
                      height="50px"
                      quality={100}
                    />
                  </>}
                </TableCell>
                <TableCell style={{ width: 100 }} align="right">
                  <Tooltip title="Thêm/Sửa hình ảnh">
                    <IconButton
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar onClick={e => handleOpenEditCate(row)} sx={{ bgcolor: "#EE0232", width: 30, height: 30, padding: '10px' }}>
                        <EditIcon sx={{ fontSize: 18 }} />
                      </Avatar>

                    </IconButton>
                  </Tooltip>

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
                count={listCate.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Hàng trên bảng',
                  },
                  native: true,
                }}
                onPageChange={e=>handleChangePage()}
                onRowsPerPageChange={e=>handleChangeRowsPerPage()}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>


    <Dialog
      open={openEditCate}
      TransitionComponent={Transition}
      keepMounted
      onClose={e=>handleCloseEditCate()}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className='text-center'>
        <div className="header-title-popup p-4 font-bold">Thêm/Sửa hình ảnh</div>
        <div className='form-file'>
          <div className='form-file__icon'><CloudUploadIcon sx={{ fontSize: 40 }} /><span>Upload hình ảnh</span></div>
          <div className='form-file__img mt-4'>
            {imagesUpload && <>
              <Image
                src={imagesUpload}
                width="100px"
                height="100px"
                quality={100}
              />
            </>}
          </div>
          <input type="file" accept="image/*" onChange={e => handleChangeFile(e)} />
        </div>
        <div className='flex justify-center mt-8 mb-3'>
          <Button className='mr-2' onClick={e=>handleEditCate()} variant="contained" style={{ background: "#EE0232" }}>Lưu lại</Button>
          <Button onClick={e=>handleCloseEditCate()} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
        </div>
      </DialogContent>
    </Dialog>



  </>)
}

export default Category

Category.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
