import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// dialog
import axios from "axios";
import UpdateLoaiSP from '../../../dialog/UpdateLoaiSP';

// ----------------------------------------------------------------------

export default function LoaiSPMoreMenu(props) {

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
    axios.delete(ip + `/DeleteLoaiSP/${id}`)
  }

  return (
    <>
      <UpdateLoaiSP
        open={openFix}
        setOpen={setOpenFix}
        key={props._id}
        _id={props._id}
        ImageLoaiSP={props.ImageLoaiSP}
        NameLoaiSP={props.NameLoaiSP}
        MotaLoaiSP={props.MotaLoaiSP}
        TrangThaiLoaiSP={props.TrangThaiLoaiSP}
        danhsachSP={props.danhsachSP}
        setdanhsachSP={props.setdanhsachSP}
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
        <MenuItem sx={{ color: '#fc7e7ed3' }}>
          <ListItemIcon>
            <Iconify sx={{ color: '#fc7e7ed3' }} icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              const checkdelete = window.confirm(
                "B???n ch???c ch???n mu???n x??a??? "
              )
              if (checkdelete == true) {
                btnDeleteDS(props._id)
              }
            }}
            primary="X??a" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: '#2065d1' }}>
          <ListItemIcon>
            <Iconify sx={{ color: '#2065d1' }} icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText onClick={() => handleClickItemFix()} primary="S???a" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
