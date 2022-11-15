
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
import { UserListHead,BlogListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';

import axios from "axios";

// gọi trang
import ItemBlog from '../Item/ItemBlog';

// css
import '../css/add_product.css';
import AddBlog from '../dialog/AddBlog';

// ----------------------------------------------------------------------



export default function Blog() {

  const ip = "http://localhost:8080"

  const TABLE_HEAD = [
    { id: 'ImageBlog', label: 'ImageBlog', alignRight: false },
    { id: 'DateBlog', label: 'DateBlog', alignRight: false },
    { id: 'TenBlog', label: 'TenBlog', alignRight: false },
    { id: 'LikeBlog', label: 'LikeBlog', alignRight: false },
    { id: 'CmtBlog', label: 'CmtBlog', alignRight: false },
    { id: 'ShareBlog', label: 'ShareBlog', alignRight: false },
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
      return filter(array, (array) => array.TenBlog.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const [danhsachSP, setdanhsachSP] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  const getDataBlog = () => {
    axios.get(ip + '/getDataBlog')
    .then((response) => {
      setdanhsachSP(response.data);
    })
  }

  const Loading = () =>{
    getDataBlog();
    setSelected([]);
  }

  useEffect(() => {
    getDataBlog();

  },[])

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
      const newSelecteds = danhsachSP.map((n) => n.TenBlog);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
    <AddBlog
            open={openAdd}
            setOpen={setOpenAdd}
    />
      <Page title="Dashboard: Blog">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Blog
              <button onClick={Loading}>dsadas</button>
            </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickItemAdd}>
              Thêm Blog
            </Button>
          </Stack>
          <Card>
            <BlogListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                      const isItemSelected = selected.indexOf(val.TenBlog) !== -1;
                      return (    
                         <ItemBlog
                          key = {val._id}
                          _id={val._id}
                          ImageBlog={val.ImageBlog}
                          DateBlog={val.DateBlog}
                          TenBlog={val.TenBlog}
                          LikeBlog={val.LikeBlog}
                          CmtBlog={val.CmtBlog}
                          ShareBlog={val.ShareBlog}
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
