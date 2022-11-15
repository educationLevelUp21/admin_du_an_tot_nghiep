import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// dialog
import UpdateSP from '../../../dialog/UpdateSP';

import axios from "axios";

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {

  const ip = "http://localhost:8080"

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

   // dialog Update
 const [openFix, setOpenFix] = useState(false);
 const handleClickItemFix = () => {
    setOpenFix(true)
    setIsOpen(false)
    // console.log(props._id);
 }

 const btnDeleteDS = (id) => {
    axios.delete(ip + `/DeleteSP/${id}`)
    axios.delete(ip + `/DeleteImg/${id}`)
}

  return (
    <>
      <UpdateSP
         open={openFix}
         setOpen={setOpenFix}
         key={props._id}
         _id={props._id}
         idImg={props.idImg}
         NameSP={props.NameSP}
         GiaGocSP={props.GiaGocSP}
         GiaBanSP={props.GiaBanSP}
         SoLuongSP={props.SoLuongSP}
         DateNhapSP={props.DateNhapSP}
         SaleSP={props.SaleSP}
         TrangThaiSP={props.TrangThaiSP}
         LoaiSP={props.LoaiSP}
         ChiTietSP={props.ChiTietSP}
         danhsachSP={props.danhsachSP}
         setdanhsachSP={props.setdanhsachSP}
         multipleFiles={props.multipleFiles}
         dsLoaiSP={props.dsLoaiSP}
         setDsLoaiSP={props.setDsLoaiSP}
         dsSaleSP={props.dsSaleSP}
         setDsSaleSP={props.setDsSaleSP}
      />
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText onClick={() => {
            const checkdelete = window.confirm(
              "Bạn chắc chắn muốn xóa??? "
            )
            if (checkdelete == true) {
              btnDeleteDS(props.idImg)
            }
          }} primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText onClick={() => handleClickItemFix()} primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
