import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
    Button,

} from '@mui/material';
import axios from "axios";


// css
import "../css/dialog.css"


export default function ChiTietSp(props) {

    const ip = "http://localhost:8080"

    const handleClose = () => {
        props.setOpen(false);
    };
    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="md"
        >
            <DialogContent style={{ height: '710px' }} >
                {/* <div className="container" >
                    <h2 style={{
                        textAlign: 'center', paddingBottom: '10px',
                        color: '#2065d1'
                    }}>Thông tin xem thêm</h2> */}
                {/* <p className="dl_xemThem">Loại sản phẩm: {props.IdSP}</p> */}
                {/* <p className="dl_xemThem">Loại sản phẩm: {props.LoaiSP}</p>
                    <p className="dl_xemThem">Chi tiết sản phẩm: {props.ChiTietSP}</p>
                </div> */}


                <div className="container-up" >
                    <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Xem thêm thông tin sản phẩm</h2>
                    <div className="dialog_xemthem_left">
                        {/* 
                        {props.multipleFiles.map((element, index) =>
                            <div key={index}>
                                {element.files.map((file, index) =>
                                    <div className="col-6">
                                        <div className="card mb-2 border-0 p-0">
                                            <img src={ip + `/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )} */}
                    </div>
                    <div className="dialog_xemthem_right">
                        <div className="dl_ten">{props.NameSP}</div>
                        <div className="dl_soLuong">Số lượng: {props.SoLuongSP}</div>
                        <div className="dl_gia">Giá gốc: {props.GiaGocSP}VND</div>
                        <div className="dl_gia">Giá bán: {props.GiaBanSP}VND</div>
                        <div className="dl_loaiSP">Loại sản phẩm: {props.LoaiSP}</div>
                        <div className="dl_loaiSP">Trạng thái: {props.TrangThaiSP}</div>

                        <DialogContent className="dl_moTa">
                            <p className="mota1">Mô tả sản phẩm:</p>
                            <div className="mota2">{props.ChiTietSP}</div>
                        </DialogContent>
                    </div>
                    <div className="frames_1"></div>

                </div>
            </DialogContent>
            <DialogActions className="btn_dialog">
                <Button variant="outlined" className="btn_cancel" onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}