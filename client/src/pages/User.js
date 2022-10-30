
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,

} from '@mui/material';

// avatar
import Avatar from '@mui/material/Avatar';
import hinhanh from '../assets/Img_login.png';


// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';

import axios from "axios";
import { VpnLockSharp } from '@mui/icons-material';
import Switch from '@mui/material/Switch';

import ChiTietSPPage from '../dialog/ChiTietSp.js'


import DialogActions from '@mui/material/DialogActions';

// css
import '../css/add_product.css';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'image1', label: '', alignRight: false },
  { id: 'name', label: 'Tên sản phẩm', alignRight: false },
  { id: 'price', label: 'Giá gốc', alignRight: false },
  { id: 'price', label: 'Giá bán', alignRight: false },
  { id: 'number', label: 'Số lượng', alignRight: false },
  { id: 'discount', label: 'Giảm giá', alignRight: false },
  { id: 'TrangThaiSP', label: 'Trạng thái', alignRight: false },
  { id: 'Type&Details', label: 'Loại & chi tiết', alignRight: false },
  { id: '' },

];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {

  const ip = "http://localhost:8080"

  const [SWTrangThaiSP, setSWTrangThaiSP] = useState(true)

  const [danhsachSP, setdanhsachSP] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  // useEffect(() => {
  //   axios.get(ip + '/getData')
  //     .then((response) => {
  //       setdanhsachSP(response.data);
  //     })

  // },)

  // dialog
  const [open, setOpen] = useState(false);
  const handleClickItem = () => {
    setOpen(true)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = danhsachSP.map((n) => n.NameSP);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - danhsachSP.length) : 0;

  const filteredUsers = applySortFilter(danhsachSP, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={danhsachSP.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody >
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vl) => {
                    const { _id, NameSP, GiaGocSP, GiaBanSP, SoLuongSP
                      , DateNhapSP, SaleSP, TrangThaiSP, LoaiSP, ChiTietSP } = vl;
                    const isItemSelected = selected.indexOf(NameSP) !== -1;

                    return (
                      <>
                        {/* <ChiTietSPPage
                          open={open}
                          setOpen={setOpen}
                          LoaiSP={LoaiSP}
                          ChiTietSP={ChiTietSP}
                        /> */}
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, NameSP)} />
                          </TableCell>
                          {/* --------------- Ảnh ----------------- */}
                          <TableCell className='image_sp' component="th" scope="row"  >
                            {/* <Avatar alt={NameSP} src={Avatar} /> */}
                            <Avatar sx={{ minWidth: 80, minHeight: 80 }} variant="square">
                              <img className='img' src={hinhanh} alt="login" width={'100%'} />
                            </Avatar>
                          </TableCell>
                          {/* --------------- tên sản phẩm ----------------- */}
                          <TableCell className='name_sp' component="th" scope="row"  >
                            {/* <Stack direction="row" alignItems="center" spacing={2}> */}
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography align='left' variant="subtitle2" wordWrap="break-word" >
                              {NameSP}
                            </Typography>
                          </TableCell>
                          {/* --------------- giá gốc & giá bán sản phẩm ----------------- */}
                          <TableCell className='giaGoc_giaBan'>
                            <Typography align='left' variant="subtitle2" wordWrap="break-word" >
                              {GiaGocSP}VND
                            </Typography>
                          </TableCell>
                          <TableCell className='giaGoc_giaBan'>
                            <Typography align='left' variant="subtitle2" wordWrap="break-word" >
                              {GiaBanSP}VND
                            </Typography>
                          </TableCell>
                          {/* --------------- số lượng ----------------- */}
                          <TableCell className='so_luong' component="th" scope="row"  >
                            <Typography align='left' variant="subtitle2" >
                              {SoLuongSP}
                            </Typography>
                          </TableCell>
                          {/* --------------- giảm giá sale----------------- */}
                          <TableCell className='giam_gia' component="th" scope="row" >
                            <Typography align='left' variant="subtitle2" >
                              {SaleSP}%
                            </Typography>
                          </TableCell>
                          {/* ---------------  ngày nhập----------------- */}

                          {/* --------------- trạng thái----------------- */}
                          <TableCell className='trang_thai' component="th" scope="row" >
                            <Typography align='left' variant="subtitle2"  >
                              {/* {TrangThaiSP} */}
                              <label class="switch">
                                <input type="checkbox" defaultChecked={SWTrangThaiSP} onChange={(e) => setSWTrangThaiSP(!SWTrangThaiSP)} />
                                <span class="slider round"></span>
                              </label>
                              {/* <Label color={(TrangThaiSP === 'Không hoạt động' && 'error') || 'success'}>{sentenceCase(TrangThaiSP)}</Label> */}
                            </Typography>
                          </TableCell>
                          {/* --------------- loại & chi tiết sản phẩm ----------------- */}
                          <TableCell className='loai_chiTiet' >
                            <Typography align='left' variant="subtitle2" wordWrap="break-word" >
                              {/* <Button className='btn_xemThem' variant="outlined" onClick={() => handleClickItem()}> Xem thêm</Button> */}
                            </Typography>
                          </TableCell>
                          {/* ---------------------------------------------- */}
                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>

                      </>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={danhsachSP.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page >
  );
}
