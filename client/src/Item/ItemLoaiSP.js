
import { useEffect, useState } from 'react';


// material
import {
    Button,
    Checkbox,
    TableRow,
    TableCell,
    Typography,

} from '@mui/material';
// avatar
import Avatar from '@mui/material/Avatar';
// components
import LoaiSPMoreMenu from '../sections/@dashboard/user/LoaiSPMoreMenu';

import axios from "axios";


export default function ItemLoaiSP(props) {

    const ip = "http://localhost:8080"

    const [color, setColor] = useState("");

    useEffect(() => {
        if (props.TrangThaiLoaiSP == "Hoạt động") {
            setColor("rgba(84, 214, 44, 0.16)")
        } else if (props.TrangThaiLoaiSP == "Không hoạt động") {
            setColor("rgba(255, 72, 66, 0.16)")
        }
    },)


    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        props.setSelected(newSelected);
    };

    let selected = props.selected

    return (

        <TableRow
            hover
            key={props._id}
            tabIndex={-1}
            role="checkbox"
            selected={props.isItemSelected}
            aria-checked={props.isItemSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox checked={props.isItemSelected} onChange={(event) => handleClick(event, props._id)} />
            </TableCell>
            {/* --------------- Ảnh ----------------- */}
            <TableCell className='image_sp' component="th" scope="row">
                {/* <Avatar alt={NameSP} src={Avatar} /> */}
                <Avatar sx={{ minWidth: 130, minHeight: 170 }} variant="square">
                    <img className='img' src={ip + '/uploads/' + props.ImageLoaiSP} alt="login" width={'100%'} />
                </Avatar>
            </TableCell>
            {/* --------------- tên sản phẩm ----------------- */}
            <TableCell className='name_sp' component="th" scope="row"  >
                {/* <Stack direction="row" alignItems="center" spacing={2}> */}
                {/* <Avatar alt={name} src={avatarUrl} /> */}
                <Typography align='left' variant="subtitle2"  >
                    {props.NameLoaiSP}
                </Typography>
            </TableCell>
            {/* --------------- mô tả sản phẩm ----------------- */}
            <TableCell className='moTa_LSP' >
                <Typography align='left' variant="subtitle2" >
                    {props.MotaLoaiSP}
                </Typography>
            </TableCell>
            {/* --------------- trạng thái----------------- */}
            <TableCell className='trang_thai' component="th" scope="row" >
                <Typography className='trang_thai_2' align='center' style={{ background: color, }} variant="subtitle2"  >
                    {props.TrangThaiLoaiSP}
                </Typography>
            </TableCell>

            {/* ---------------------------------------------- */}
            <TableCell align="right">
                <LoaiSPMoreMenu
                    key={props._id}
                    _id={props._id}
                    ImageLoaiSP={props.ImageLoaiSP}
                    NameLoaiSP={props.NameLoaiSP}
                    MotaLoaiSP={props.MotaLoaiSP}
                    TrangThaiLoaiSP={props.TrangThaiLoaiSP}
                    danhsachSP={props.danhsachSP}
                    setdanhsachSP={props.setdanhsachSP}

                />
            </TableCell>
        </TableRow>


    )
}