
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,

} from '@mui/material';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, LoaiSPListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';

import axios from "axios";

// gọi trang
import Add_LoaiSP from '../dialog/Add_LoaiSP';
import ItemLoaiSP from '../Item/ItemLoaiSP';

// css
import '../css/add_product.css';
// ----------------------------------------------------------------------



export default function LoaiSP() {

  const ip = "http://localhost:8080"


  const [danhsachSP, setdanhsachSP] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const TABLE_HEAD = [
    { id: 'ImageLoaiSP', label: '', alignRight: false },
    { id: 'NameLoaiSP', label: 'Tên loại sản phẩm', alignRight: false },
    { id: 'MotaLoaiSP', label: 'Mô tả sản phẩm', alignRight: false },
    { id: 'TrangThaiLoaiSP', label: 'Trạng thái', alignRight: false },
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
      return filter(array, (array) => array.NameLoaiSP.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const Loading = () => {
    getDataLoaiSP();
    setSelected([]);
  }

  const getDataLoaiSP = () => {
    axios.get(ip + '/getDataLoaiSP')
      .then((response) => {
        setdanhsachSP(response.data);
      })
  }

  useEffect(() => {
    getDataLoaiSP();
  }, [])

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
    if (event.target.checked == true) {
      const newSelecteds = danhsachSP.map((n) => n._id);
      setSelected(newSelecteds);
    }
    if (event.target.checked == false) {
      setSelected([]);
    }
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
    <>
      <Add_LoaiSP
        open={open}
        setOpen={setOpen}
      />
      <Page title="Dashboard: LoaiSP">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Loại Sản Phẩm
              <button onClick={Loading}>dsadas</button>
            </Typography>
            <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleClickItem}>
              Thêm Loại Sản Phẩm
            </Button>
          </Stack>

          <Card>
            <LoaiSPListToolbar selected={selected} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val) => {
                      const isItemSelected = selected.indexOf(val._id) !== -1;

                      return (
                        <ItemLoaiSP
                          key={val._id}
                          _id={val._id}
                          ImageLoaiSP={val.ImageLoaiSP}
                          NameLoaiSP={val.NameLoaiSP}
                          MotaLoaiSP={val.MotaLoaiSP}
                          TrangThaiLoaiSP={val.TrangThaiLoaiSP}
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
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
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
