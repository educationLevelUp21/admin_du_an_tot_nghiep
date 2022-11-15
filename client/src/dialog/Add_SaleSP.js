import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Button,
} from '@mui/material';


import axios from "axios";

export default function Add_SaleSP(props) {

  const ip = "http://localhost:8080"

  // const [,set] = useState("")
  const [NameSaleSP, setNameSaleSP] = useState("")
  const [PhanTramGiamGia, setPhanTramGiamGia] = useState(0)
  const [NgayTaoSale, setNgayTaoSale] = useState(new Date())
  const [NgayEndSale, setNgayEndSale] = useState(new Date())
  const [TrangThaiSale, setTrangThaiSale] = useState("Hoạt động")


  const btnAdd_SaleSP = () => {
    axios.post(ip + "/add_SaleSP", {
      NameSaleSP: NameSaleSP,
      PhanTramGiamGia: PhanTramGiamGia,
      NgayTaoSale: NgayTaoSale,
      NgayEndSale: NgayEndSale,
      TrangThaiSale: TrangThaiSale,
    })
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  // var format = new Date(props.NgayNhapSP);
  // var day = format.getDate();
  // var month = format.getMonth() + 1;
  // var year = format.getFullYear();

  // var date = day + "/" + month + "/" + year;

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
                onChange={(e) => setNameSaleSP(e.target.value)}
              />
              <label className="form__label">Tên Giam gia</label>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Tên áo"
                onChange={(e) => setPhanTramGiamGia(e.target.value)}
              />
              <label className="form__label">PhanTramGiamGia</label>
            </div>
            <div style={{display:"flex"}}>
              <div className="form_nhap">
                <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                  onChange={(e) => setNgayTaoSale(e.target.value)}
                />
                <label className="form__label">Ngày tạo</label>
              </div>

              <div className="form_nhap">
                <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                  onChange={(e) => setNgayEndSale(e.target.value)}
                />
                <label className="form__label">Ngày kết thúc</label>
              </div>

            <div className="form_trangthai">
              <select defaultValue={TrangThaiSale} onChange={(e) => setTrangThaiSale(e.target.value)}>
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
        <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnAdd_SaleSP}>Thêm</Button>
      </DialogActions>
    </Dialog>
  )
}