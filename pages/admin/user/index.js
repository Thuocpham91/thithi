import React, {useState} from 'react'
import AdminLayout from "../../../layouts/Admin";


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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';



import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';





import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const User = () => {
  
  const [rowUser, setRowUser] = useState([
    {id: 15 ,name:"Nguyễn văn A",idUser:"id2712",desc:"Thông tin về khách hàng nguyễn văn A"},
    {id: 16 ,name:"Nguyễn văn B",idUser:"id2713",desc:"Thông tin về khách hàng nguyễn văn B"},
    {id: 17 ,name:"Nguyễn văn C",idUser:"id2714",desc:"Thông tin về khách hàng nguyễn văn C"},
    {id: 18 ,name:"Nguyễn văn D",idUser:"id2715",desc:"Thông tin về khách hàng nguyễn văn D"},
    {id: 19 ,name:"Nguyễn văn E",idUser:"id2716",desc:"Thông tin về khách hàng nguyễn văn E"},
  ]);



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [userChoose, setUserChoose] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event, row) => {
    setUserChoose(row)
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


// changePass
  const [openChangePass, setOpenChangePass] = useState(false);

  const handleClickOpenChangePass = () => {
    handleCloseMenu();
    setOpenChangePass(true);
  };


  const handleCloseChangePass = () => {
    setOpenChangePass(false);
    setValuesChangePass({
      newPassword: '',
      reNewPassword: '',
      showPassword: false,
    })
  };

  const [valuesChangePass, setValuesChangePass] = useState({
    newPassword: '',
    reNewPassword: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValuesChangePass({
      ...valuesChangePass,
      showPassword: !valuesChangePass.showPassword,
    });
  };

  const handleChangeValueForm = (prop) => (event) => {
    setValuesChangePass({ ...valuesChangePass, [prop]: event.target.value });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // deleteUser
  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  const handleClickOpenDeleteuser = () => {
    setOpenDeleteUser(true);
    handleCloseMenu();
  };

  const handleClickCloseDeleteUser = () => {
    setOpenDeleteUser(false);
  };


  return (<>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Họ và tên</TableCell>
            <TableCell align="right">Mã thành viên</TableCell>
            <TableCell align="right">Mô tả</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rowUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rowUser
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.idUser}
              </TableCell>
              <TableCell  align="right">
                {row.desc}
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
              rowsPerPageOptions={[8, 20, 50, { value: -1, label: 'Tất cả' }]}
              colSpan={3}
              count={rowUser.length}
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

    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={openMenu}
      onClose={handleCloseMenu}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClickOpenChangePass}>
        <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Đổi mật khẩu</ListItemText>
        </MenuItem>
      <MenuItem onClick={handleClickOpenDeleteuser}>
        <ListItemIcon>
            <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Xóa</ListItemText>
      </MenuItem>
    </Menu>


    <Dialog
        open={openChangePass}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseChangePass}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Đổi mật khẩu"}</DialogTitle>
        <DialogContent>


          <FormControl className='mb-3' sx={{ m: 1,  }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={valuesChangePass.showPassword ? 'text' : 'password'}
              value={valuesChangePass.newPassword}
              fullWidth
              onChange={handleChangeValueForm('newPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {valuesChangePass.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ m: 1, }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-repassword">Nhập lại mật khẩu</InputLabel>
            <OutlinedInput
              id="outlined-adornment-repassword"
              type={valuesChangePass.showPassword ? 'text' : 'password'}
              value={valuesChangePass.reNewPassword}
              onChange={handleChangeValueForm('reNewPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {valuesChangePass.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          
        </DialogContent>
        <DialogActions className='mb-3'>
          <Button onClick={handleCloseChangePass} variant="contained" style={{background:"#EE0232"}}>Thay đổi</Button>
          <Button onClick={handleCloseChangePass} variant="outlined" style={{color:"#EE0232",border:"1px solid #EE0232"}}>Hủy</Button>
        </DialogActions>
      </Dialog>












      <Dialog
        open={openDeleteUser}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickCloseDeleteUser}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent className='text-center'>


          <div class="modal-delete--warning"><div class="modal-delete--warning__content">!</div></div>
          <div><h2 class="text-warning mb-2">Bạn có chắc chắn?</h2></div>
          <div class="mb-5">Bạn có chắc chắn muốn xoá thành viên <strong>{userChoose.name}</strong> ?</div>
          
        </DialogContent>

      </Dialog>




    </>)
}

export default User

User.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
  };
  