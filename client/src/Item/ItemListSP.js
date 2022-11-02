
import { useEffect, useState } from 'react';
import { sentenceCaseTransform } from 'change-case';

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
import hinhanh from '../assets/Img_login.png';
// components
import { UserMoreMenu } from '../sections/@dashboard/user';

import axios from "axios";

import ChiTietSp from '../dialog/ChiTietSp.js'
import Label from '../components/Label';


export default function ItemListSP(props) {


    const [SWTrangThaiSP, setSWTrangThaiSP] = useState(true)

    // dialog chi tiet
    const [openCT, setOpenCT] = useState(false);
    const handleClickItemChiTiet = () => {
        setOpenCT(true)
    }


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
        props.setSelected(newSelected);
    };

    // var format = new Date(props.DateNhapSP);
    // var day = format.getDate();
    // var month = format.getMonth() + 1;
    // var year = format.getFullYear();

    // var date = day + "/" + month + "/" + year;

    let selected = props.selected


    return (
        <>
            <ChiTietSp
                open={openCT}
                setOpen={setOpenCT}
                NameSP={props.NameSP}
                GiaGocSP={props.GiaGocSP}
                GiaBanSP={props.GiaBanSP}
                SoLuongSP={props.SoLuongSP}
                DateNhapSP={props.DateNhapSP}
                SaleSP={props.SaleSP}
                TrangThaiSP={props.TrangThaiSP}
                LoaiSP={props.LoaiSP}
                ChiTietSP={props.ChiTietSP}

            />
            <TableRow
                hover
                key={props._id}
                tabIndex={-1}
                role="checkbox"
                selected={props.isItemSelected}
                aria-checked={props.isItemSelected}
            >
                <TableCell padding="checkbox">
                    <Checkbox checked={props.isItemSelected} onChange={(event) => handleClick(event, props.NameSP)} />
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
                    <Typography align='left' variant="subtitle2"  >
                        {props.NameSP}
                    </Typography>
                </TableCell>
                {/* --------------- giá gốc & giá bán sản phẩm ----------------- */}
                <TableCell className='giaGoc_giaBan'>
                    <Typography align='left' variant="subtitle2"  >
                        {props.GiaGocSP} VND
                    </Typography>
                </TableCell>
                <TableCell className='giaGoc_giaBan'>
                    <Typography align='left' variant="subtitle2"  >
                        {props.GiaBanSP} VND
                    </Typography>
                </TableCell>
                {/* --------------- số lượng ----------------- */}
                <TableCell className='so_luong' component="th" scope="row"  >
                    <Typography align='left' variant="subtitle2" >
                        {props.SoLuongSP}
                    </Typography>
                </TableCell>
                {/* --------------- giảm giá sale----------------- */}
                <TableCell className='giam_gia' component="th" scope="row" >
                    <Typography align='left' variant="subtitle2" >
                        {props.SaleSP}%
                    </Typography>
                </TableCell>
                {/* ---------------  ngày nhập----------------- */}

                {/* --------------- trạng thái----------------- */}
                <TableCell className='trang_thai' component="th" scope="row" >
                    <Typography align='left' variant="subtitle2"  >
                        {props.TrangThaiSP}
                        {/* <label className="switch">
                          <input type="checkbox" defaultChecked={SWTrangThaiSP} onChange={(e) => setSWTrangThaiSP(!SWTrangThaiSP)} />
                          <span className="slider round"></span>
                      </label> */}
                        {/* <Label color={(TrangThaiSP === 'banned' && 'success') || 'success'}>{sentenceCaseTransform(TrangThaiSP)}</Label> */}

                    </Typography>
                </TableCell>
                {/* --------------- loại & chi tiết sản phẩm ----------------- */}
                <TableCell className='loai_chiTiet' >
                    <Typography align='left' variant="subtitle2" >
                        <Button className='btn_xemThem' variant="outlined" onClick={() => handleClickItemChiTiet()}> Xem thêm</Button>
                    </Typography>
                </TableCell>

                {/* ---------------------------------------------- */}
                <TableCell align="right">
                    <UserMoreMenu
                        key={props._id}
                        _id={props._id}
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
                    />
                </TableCell>
            </TableRow>

        </>

    )
}