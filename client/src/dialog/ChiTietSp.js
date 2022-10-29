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


export default function ChiTietSP(props) {

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
            maxWidth="lg"
        >
            <DialogContent style={{ height: '700px' }} >
                <div className="container" >
                    <h2 style={{
                        textAlign: 'center', paddingBottom: '10px',
                        color: '#2065d1'
                    }}>Thông tin xem thêm</h2>
                    <p className="dl_xemThem">Loại sản phẩm: {props.LoaiSP}</p>
                    <p className="dl_xemThem">Chi tiết sản phẩm: {props.ChiTietSP}</p>
                </div>
            </DialogContent>
            {/* <DialogActions >
                 <div className="btn-update" color="primary" >
                    Thêm Sản Phẩm
                </div> 
            </DialogActions> */}
            <DialogActions className="btn_dialog">
                <Button variant="outlined" className="btn_cancel" onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}