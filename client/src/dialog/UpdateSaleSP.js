import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    Button,

} from '@mui/material';
import axios from "axios";

export default function UpdateSaleSP(props) {

    const ip = "http://localhost:8080"

    const [NameSaleSPFix, setNameSaleSPFix] = useState(props.NameSaleSP)
    const [PhanTramGiamGiaFix, setPhanTramGiamGiaFix] = useState(props.PhanTramGiamGia)
    const [NgayTaoSaleFix, setNgayTaoSaleFix] = useState(props.NgayTaoSale)
    const [NgayEndSaleFix, setNgayEndSaleFix] = useState(props.NgayEndSale)
    const [TrangThaiSaleFix, setTrangThaiSaleFix] = useState(props.TrangThaiSale)



    const btnUpdate_SaleSP = () => {
        axios.put(ip + `/UpdateSaleSP/${props._id}`, {
            NameSaleSP: NameSaleSPFix,
            PhanTramGiamGia: PhanTramGiamGiaFix,
            NgayTaoSale: NgayTaoSaleFix,
            NgayEndSale: NgayEndSaleFix,
            TrangThaiSale: TrangThaiSaleFix,
        })
    }

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
            <DialogContent>
            <div className="container-up" >
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm thông tin loại sản phẩm</h2>
          <div className="form_text_ipt_right">
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Tên áo"
                onChange={(e) => setNameSaleSPFix(e.target.value)}
                defaultValue={props.NameSaleSP}
              />
              <label className="form__label">Tên Giam gia</label>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Tên áo"
                onChange={(e) => setPhanTramGiamGiaFix(e.target.value)}
                defaultValue={props.PhanTramGiamGia}
              />
              <label className="form__label">PhanTramGiamGia</label>
            </div>
            <div style={{display:"flex"}}>
              <div className="form_nhap">
                <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                  onChange={(e) => setNgayTaoSaleFix(e.target.value)}
                />
                <label className="form__label">Ngày tạo</label>
              </div>

              <div className="form_nhap">
                <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                  onChange={(e) => setNgayEndSaleFix(e.target.value)}
                />
                <label className="form__label">Ngày kết thúc</label>
              </div>

            <div className="form_trangthai">
              <select defaultValue={props.TrangThaiSale} onChange={(e) => setTrangThaiSaleFix(e.target.value)}>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Không hoạt động">Không hoạt động </option>
              </select>
            </div>
            </div>
          </div>

        </div>
            </DialogContent>
            <DialogActions className="btn-dialog">
                <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>Hủy</Button>
                <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnUpdate_SaleSP}>
                    Sửa
                </Button>
            </DialogActions>
        </Dialog>
    )
}