import { filter } from 'lodash';
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
  Paper,

} from '@mui/material';

//axios
import axios from "axios";

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';


// trang
import Add_product from '../dialog/Add_product';
import ItemListSP from '../Item/ItemListSP';

// css
import '../css/add_product.css';
import '../css/dialog.css';

const TABLE_HEAD = [
  { id: 'image1', label: '', alignRight: false },
  { id: 'name', label: 'Tên sản phẩm', alignRight: false },
  { id: 'priceGoc', label: 'Giá gốc', alignRight: false },
  { id: 'priceBan', label: 'Giá bán', alignRight: false },
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

export default function EcommerceShop() {


  const ip = "http://localhost:8080"



  const [danhsachSP, setdanhsachSP] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    axios.get(ip + '/getData')
      .then((response) => {
        setdanhsachSP(response.data);
      })

    // console.log(filterName);
  },)

  // dialog add
  const [openAdd, setOpenAdd] = useState(false);
  const handleClickItemAdd = () => {
    setOpenAdd(true)
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

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

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
    <>
      <Add_product
        open={openAdd}
        setOpen={setOpenAdd}
      // danhsachSP={danhsachSP}
      // setdanhsachSP={setdanhsachSP}
      />
      <Page title="Dashboard: Products">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Kho hàng
            </Typography>
            <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleClickItemAdd}>
              Thêm sản phẩm
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
                    {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const isItemSelected = selected.indexOf(name) !== -1; */}

                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val) => {
                      const isItemSelected = selected.indexOf(val.NameSP) !== -1;

                      return (

                        <ItemListSP
                          key={val._id}
                          _id={val._id}
                          NameSP={val.NameSP}
                          GiaGocSP={val.GiaGocSP}
                          GiaBanSP={val.GiaBanSP}
                          SoLuongSP={val.SoLuongSP}
                          DateNhapSP={val.DateNhapSP}
                          SaleSP={val.SaleSP}
                          TrangThaiSP={val.TrangThaiSP}
                          LoaiSP={val.LoaiSP}
                          ChiTietSP={val.ChiTietSP}
                          danhsachSP={danhsachSP}
                          setdanhsachSP={setdanhsachSP}
                          isItemSelected={isItemSelected}
                          selected={selected}
                          setSelected={setSelected}
                        />

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
                          {/* <SearchNotFound searchQuery={filterName} /> */}
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
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
    </>
  );
}
