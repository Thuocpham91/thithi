
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
import toast from "react-hot-toast";
import Backdrop from '@mui/material/Backdrop';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircularProgress from '@mui/material/CircularProgress';
const link_Image = "http://202.92.6.221:7005";


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

  const handleDelete = async (id) => {


    const data = await productService.deleteAll({ id: id, code: 2 });

    if (data.status == 200) {
      toast.success("Sửa thành công");
      setOpenEditCate(false);
    } else {
      toast.error("Có lỗi ở đây!");
    }

  }


  // useEffect(() => {
  //   async function fetchData() {
  //     const finterData = [];
  //     let data = await productService.getProduct();
  //     if (data.status != 200) return;
  //     // setListProduct(data.data.variants);
  //     const lk = JSON.parse(data.data);

  //     const dt = lk.variants;
  //     console.log(dt);

  //     dt.map(iten => {
  //       const ob = finterData.find(kk => { return kk.code == iten.variants[0].category.code });
  //       if (!ob) finterData.push(iten.variants[0].category);

  //     })
  //     const respont = await productService.updateCatogory({ data: finterData });
  //     console.log(respont);

  //   }
  //   fetchData();


  // }, []);



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


const loadImg = ({ src, width }) => {
  return `http://202.92.6.221:3000/${src}?w=${width}}`
}

const Category = () => {

  const [listCate, seListCate] = useState([

  ]);





  useEffect(() => {

    ////
    async function getCategory() {
      let data = await productService.getCategory();
      if (data.status != 200) return;
      // setListProduct(data.data.variants);
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
  const [openDeleteCate, setOpenDeleteCate] = useState(false);

  const handleOpenEditCate = (cate) => {
    setOpenEditCate(true);
    setCateChoose(cate);
    setImagesUpload(null)
  };

  const handleCloseEditCate = () => {
    setOpenEditCate(false);
  };

  const handleEditCate = async () => {

    const body = new FormData();
    body.append("file", image);
    body.append("key", "mabimatidsoadjoassd");


    if (image != null) {
      const dataurl = await productService.upaloadFile(body);
      if (dataurl.status == 200) cateChoose.url = dataurl.url;
    }

    const upda = await productService.updateCatogory({ ...cateChoose, key: 3 });

    if (upda.status == 200) {
      toast.success("Sửa thành công");
      setOpenEditCate(false);
    } else {
      toast.error("Có lỗi ở đây!");
    }

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

  const handleCloseDeleteCate = () => {
    setOpenDeleteCate(false);
  };


  const handleOpenDeleteCate = (cate) => {
    setOpenDeleteCate(true);
    setCateChoose(cate);
  };


  const handleDeleteCate = async (id) => {
    setLoading(true)
    const data = await productService.deleteAll({ id: id, code: 2 });
    if (data.status == 200) {
      setLoading(false);
      toast.success("Sửa thành công");
      setOpenEditCate(false);
    } else {
      setLoading(false);
      toast.error("Có lỗi ở đây!");
    }
  }

  const [loading, setLoading] = useState(false);


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
                      // loader={row.url}
                      unoptimized
                      loader={loadImg}
                      alt={row.name}
                      src={row.url ? (link_Image + row.url) : '/images/list-cate/Marlboro.png'}

                      width="50px"
                      height="50px"
                      quality={100}
                    />
                  </>}
                </TableCell>
                <TableCell style={{ width: 100 }} align="right">
                  <div className='flex'>
                    <div className='mr-1'>
                      <Tooltip title="Thêm/Sửa hình ảnh">
                        <IconButton
                          size="small"
                          aria-controls={open ? 'account-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                        >
                          <Avatar onClick={e => handleOpenEditCate(row)} style={{background: "#fff", color: "#EE0232",border:"1px solid #EE0232", width: 30, height: 30, padding: '10px' }}>
                            <EditIcon sx={{ fontSize: 18 }} />
                          </Avatar>

                        </IconButton>
                      </Tooltip>
                    </div> 
                    <Tooltip title="Xóa danh mục">
                      <IconButton
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar onClick={e => handleOpenDeleteCate(row)} sx={{ bgcolor: "#EE0232", width: 30, height: 30, padding: '10px' }}>
                          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                        </Avatar>

                      </IconButton>
                    </Tooltip>
                  </div>

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
                labelRowsPerPage="Hàng trên bảng"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
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
      onClose={e => handleCloseEditCate()}
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
          <div className='mr-4'>
            <Button onClick={e => handleEditCate()} variant="contained" style={{ background: "#EE0232" }}>Lưu lại</Button>
          </div>
          <Button onClick={e => handleCloseEditCate()} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy bỏ</Button>
        </div>
      </DialogContent>
    </Dialog>


    <Dialog
      open={openDeleteCate}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDeleteCate}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className='text-center'>
          <div className="modal-delete--warning"><div className="modal-delete--warning__content">!</div></div>
          <div><h2 className="text-warning mb-2">Bạn có chắc chắn?</h2></div>
          {cateChoose && <>
              <div className="mb-5">Bạn có chắc chắn muốn xoá danh mục <strong>{cateChoose.name}</strong> ?</div>
          </>}
          <div className='flex justify-center mt-8 mb-3'>
              <div className='mr-4'>
                  <Button onClick={handleDeleteCate} variant="contained" style={{ background: "#EE0232" }}>Đồng ý</Button>
              </div>
              <Button onClick={handleCloseDeleteCate} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }}>Hủy</Button>
          </div>

      </DialogContent>



    </Dialog>
    
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>



  </>)
}

export default Category

Category.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
