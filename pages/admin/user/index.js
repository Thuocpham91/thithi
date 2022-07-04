import React, { useState, useEffect } from 'react'
import { userService } from '../../../services/user.service';

import AdminLayout from "../../../layouts/Admin";
import AddUser from "../../../components/uerAdmin/AddUser";
import DeleteUser from "../../../components/uerAdmin/DeleteUser";
import ChangePass from "../../../components/uerAdmin/ChangePass";
import EditUser from "../../../components/uerAdmin/EditUser";
import ImportPoint from "../../../components/uerAdmin/ImportPoint";

import EditIcon from '@mui/icons-material/Edit';
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

import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';

import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Autocomplete from '@mui/material/Autocomplete';
import { compareAsc, format } from 'date-fns'
import * as XLSX from "xlsx";

import * as FileSaver from 'file-saver';




function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
  ;

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
  const [rowUser, setRowUser] = useState([]);

  const count = useSelector((state) => state.updateList);
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  console.log(count)


  const fetchDataLoad = async () => {
    let data = await userService.getAll();
    if (data.status != 200) return;
    setRowUser(data.data);
  }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let data = await userService.getAll();
      setLoading(false);
      if (data.status != 200) return;
      setRowUser(data.data);

    }
    fetchData();
  }, [count]);


  const [city, setCIty] = useState([]);

  useEffect(() => {

    async function fetchData() {
      let data = await userService.getCitiDistrict({ key: "city" });
      if (data.status != 200) return;

      setCIty(data.city);
      // setDisStrict(data.district)

    }
    fetchData();
  }, []);



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowUser.length) : 0;

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
  const { renderChangePass, setOpenChangePass } = ChangePass(userChoose);

  const handleClickOpenChangePass = () => {
    handleCloseMenu();
    setOpenChangePass(true);
  };



  // deleteUser
  const { renderDeleteUser, setOpenDeleteUser } = DeleteUser(userChoose);

  const handleOpenDelte = () => {
    setOpenDeleteUser(true);
    handleCloseMenu();
  }


  // addUser
  const { renderAddUser, setOpenAddUser } = AddUser(fetchDataLoad = { fetchDataLoad });

  // editUser

  const { renderEditUser, setOpenEditUser } = EditUser(userChoose);

  const handleOpenEditUser = () => {
    setOpenEditUser(true);
    handleCloseMenu();
  }

  // ImportPoint
  const { renderImport, setOpenImport } = ImportPoint(rowUser);

  const handleExportFile = () => {

    const date = new Date();
    let dj = format(date, 'yyyy-MM-dd HH:MM:ss');
    dj = dj + "user";
    exportToCSV(rowUser, dj);
  }

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }




  return (<>
    <div className='body-user bg-white rounded-lg'>
      <div className='header-user flex justify-between px-4 py-5 items-center'>
        <h3>Quản lý thành viên</h3>
        <div className='flex'>
          <div className='mr-4'>
            <Button onClick={e => setOpenImport(true)} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }} startIcon={<ControlPointDuplicateOutlinedIcon />}>Import điểm</Button>
          </div>
          <div className='mr-4'>
            <Button onClick={e => handleExportFile()} variant="outlined" style={{ color: "#EE0232", border: "1px solid #EE0232" }} startIcon={<ControlPointDuplicateOutlinedIcon />}>Export Users</Button>
          </div>
          <Button onClick={e => setOpenAddUser(true)} variant="contained" style={{ background: "#EE0232" }} startIcon={<AddIcon />} >Thêm thành viên</Button>
        </div>


      </div>

      <div>
        <Autocomplete
          disablePortal

          limitTags={2}
          id="multiple-limit-tags"
          onChange={async (item, value) => {
            let data;
            if (!value) data = await userService.getAll();
            if (value) data = await userService.getAll(value);

            if (data.status != 200) return;

            setRowUser(data.data);
          }}
          options={city}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField fullWidth {...params} label="Tỉnh thành" autoFocus placeholder="Chọn khu vực" />
          )}
          sx={{ width: '200px' }}
        />


      </div>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell >Mã thành viên</TableCell>
              <TableCell >Họ tên</TableCell>
              <TableCell align="right">Số điện thoại</TableCell>
              <TableCell align="right">Điểm thưởng</TableCell>
              <TableCell align="right">Mô tả</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rowUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rowUser
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell style={{ width: 160 }}>
                  {row.id_khataco}
                </TableCell>
                <TableCell>
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {row.account}
                </TableCell>
                <TableCell align="right">
                  {row.score}
                </TableCell>
                <TableCell align="right">
                  {row.description}
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
                rowsPerPageOptions={[5, 20, 50, { value: -1, label: 'Tất cả' }]}
                colSpan={6}
                count={rowUser.length}
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
      <MenuItem onClick={handleOpenEditUser}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Thay đổi thông tin</ListItemText>
      </MenuItem>

      <MenuItem onClick={e => handleOpenDelte()}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Xóa</ListItemText>
      </MenuItem>
    </Menu>

    {/* change password */}
    {renderChangePass}

    {/* delete user */}
    {renderDeleteUser}

    {/* add user */}
    {renderAddUser}

    {/* Edit User */}
    {renderEditUser}

    {/* import point */}
    {renderImport}

    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>

  </>)
}

export default User

User.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
