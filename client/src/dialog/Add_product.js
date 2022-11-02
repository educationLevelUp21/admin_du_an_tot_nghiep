import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Button,

} from '@mui/material';
import axios from "axios";

export default function Add_product(props) {

  const ip = "http://localhost:8080"

  // const [,set] = useState("")
  const [NameSP, setNameSP] = useState("")
  const [GiaGocSP, setGiaGocSP] = useState(0)
  const [GiaBanSP, setGiaBanSP] = useState(0)
  const [SoLuongSP, setSoLuongSP] = useState(0)
  const [DateNhapSP, setDateNhapSP] = useState(new Date())
  const [SaleSP, setSaleSP] = useState(0)
  const [TrangThaiSP, setTrangThaiSP] = useState("Hoạt động")
  const [LoaiSP, setLoaiSP] = useState("Chai lọ mĩ phẫm")
  const [ChiTietSP, setChiTietSP] = useState("")



  const btnAdd_Product = () => {
    axios.post(ip + "/add_Product", {
      NameSP: NameSP,
      GiaGocSP: GiaGocSP,
      GiaBanSP: GiaBanSP,
      SoLuongSP: SoLuongSP,
      DateNhapSP: DateNhapSP,
      SaleSP: SaleSP,
      TrangThaiSP: TrangThaiSP,
      LoaiSP: LoaiSP,
      ChiTietSP: ChiTietSP,
    })
  }

  const handleClose = () => {
    props.setOpen(false);
  };


  // var format = new Date(DateNhapSP);
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
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm thông tin sản phẩm</h2>
          <div className="form_text_ipt_lefft">
            này để ảnh
          </div>
          <div className="form_text_ipt_right">
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Tên áo"
                onChange={(e) => setNameSP(e.target.value)}
              />
              <label className="form__label">Tên SP</label>
            </div>
            <div className="form_gia">
              <div className="form_giaGoc">
                <input type="text" className="form__input" placeholder=" " name="Giá gốc"
                  onChange={(e) => setGiaGocSP(e.target.value)}
                />
                <label className="form__label">Giá gốc</label>
              </div>
              <div className="form_giaGoc">
                <input type="text" className="form__input" placeholder=" " name="Giá bán"
                  onChange={(e) => setGiaBanSP(e.target.value)}
                />
                <label className="form__label">Giá bán</label>
              </div>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Số lượng"
                onChange={(e) => setSoLuongSP(e.target.value)}
              />

              <label className="form__label">Số lượng</label>
            </div>

            <div className="form-date">
              <div className="form_nhap">
                <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                  onChange={(e) => setDateNhapSP(e.target.value)}
                />
                <label className="form__label">Ngày Nhập</label>
              </div>
              <div className="form_sale">
                <select defaultValue={SaleSP} onChange={(e) => setSaleSP(e.target.value)}>
                  <option value="10">10%</option>
                  <option value="20">20%</option>
                </select>
              </div>
              <div className="form_trangthai">
                <select defaultValue={TrangThaiSP} onChange={(e) => setTrangThaiSP(e.target.value)}>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Không hoạt động">Không hoạt động </option>
                </select>
              </div>
            </div>
            <div className="form-loaiSP">
              <select defaultValue={LoaiSP} onChange={(e) => setLoaiSP(e.target.value)}>
                <option value="Chai lọ mĩ phẫm">Chai lọ mĩ phẫm</option>
                <option value="Chai lọ thực phẩm">Chai lọ thực phẩm</option>
                <option value="Chai lọ dược phẩm">Chai lọ dược phẩm</option>
                <option value="Chai lọ hóa chất">Chai lọ hóa chất</option>
              </select>
            </div>
            <div className="form_mota">
              <textarea onChange={(e) => setChiTietSP(e.target.value)} title="" placeholder="Mô tả" name="thông tin" className="mota_txtArea" rows="10"></textarea>
            </div>
          </div>

        </div>
      </DialogContent>
      <DialogActions className="btn-dialog">
        <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnAdd_Product}>Thêm</Button>
      </DialogActions>
    </Dialog>
  )
}