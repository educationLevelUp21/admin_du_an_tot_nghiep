import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// dialog
import axios from "axios";
import UpdateBlog from '../../../dialog/UpdateBlog';

// ----------------------------------------------------------------------

export default function BlogMoreMenu(props) {

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


  return (
    <>
        <UpdateBlog
        open={openFix}
        setOpen={setOpenFix}
         key = {props._id}
         _id={props._id}
         ImageBlog={props.ImageBlog}
         DateBlog={props.DateBlog}
         TenBlog={props.TenBlog}
         LikeBlog={props.LikeBlog}
         CmtBlog={props.CmtBlog}
         ShareBlog={props.ShareBlog}
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
