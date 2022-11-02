import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Button,

} from '@mui/material';
import axios from "axios";

export default function UpdateSP(props) {

  const ip = "http://localhost:8080"

  const [NameSPFix, setNameSPFix] = useState(props.NameSP)
  const [GiaGocSPFix, setGiaGocSPFix] = useState(props.GiaGocSP)
  const [GiaBanSPFix, setGiaBanSPFix] = useState(props.GiaBanSP)
  const [SoLuongSPFix, setSoLuongSPFix] = useState(props.SoLuongSP)
  const [DateNhapSPFix, setDateNhapSPFix] = useState(props.DateNhapSP)
  const [SaleSPFix, setSaleSPFix] = useState(props.SaleSP)
  const [TrangThaiSPFix, setTrangThaiSPFix] = useState(props.TrangThaiSP)
  const [LoaiSPFix, setLoaiSPFix] = useState(props.LoaiSP)
  const [ChiTietSPFix, setChiTietSPFix] = useState(props.ChiTietSP)


  const btnUpdate_Product = () => {
    axios.put(ip + `/UpdateSP/${props._id}`, {
      NameSP: NameSPFix,
      GiaGocSP: GiaGocSPFix,
      GiaBanSP: GiaBanSPFix,
      SoLuongSP: SoLuongSPFix,
      DateNhapSP: DateNhapSPFix,
      SaleSP: SaleSPFix,
      TrangThaiSP: TrangThaiSPFix,
      LoaiSP: LoaiSPFix,
      ChiTietSP: ChiTietSPFix,
    })
    console.log(props._id);
  }

  const handleClose = () => {
    props.setOpen(false);
  };


  var format = new Date(props.DateNhapSP);
  var day = format.getDate();
  var month = format.getMonth() + 1;
  var year = format.getFullYear();

  var date = day + "/" + month + "/" + year;

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
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Sửa thông tin sản phẩm</h2>
          <div className="form_text_ipt_lefft">
            này để ảnh
          </div>
          <div className="form_text_ipt_right">
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Tên áo"
                onChange={(e) => setNameSPFix(e.target.value)}
                defaultValue={props.NameSP}
              />
              <label className="form__label">Tên SP</label>
            </div>
            <div className="form_gia">
              <div className="form_giaGoc">
                <input type="text" className="form__input" placeholder=" " name="Giá gốc"
                  onChange={(e) => setGiaGocSPFix(e.target.value)}
                  defaultValue={props.GiaGocSP}
                />
                <label className="form__label">Giá gốc</label>
              </div>
              <div className="form_giaGoc">
                <input type="text" className="form__input" placeholder=" " name="Giá bán"
                  onChange={(e) => setGiaBanSPFix(e.target.value)}
                  defaultValue={props.GiaBanSP}
                />
                <label className="form__label">Giá bán</label>
              </div>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Số lượng"
                onChange={(e) => setSoLuongSPFix(e.target.value)}
                defaultValue={props.SoLuongSP}
              />

              <label className="form__label">Số lượng</label>
            </div>

            <div className="form-date">
              <div className="form_nhap">
                <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                  onChange={(e) => setDateNhapSPFix(e.target.value)} defaultValue={date}
                />
                <label className="form__label">Ngày Nhập</label>
              </div>
              <div className="form_sale">
                <select defaultValue={SaleSPFix} onChange={(e) => setSaleSPFix(e.target.value)}>
                  <option value="10">10%</option>
                  <option value="20">20%</option>
                </select>
              </div>
              <div className="form_trangthai">
                <select defaultValue={TrangThaiSPFix} onChange={(e) => setTrangThaiSPFix(e.target.value)}>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Không hoạt động">Không hoạt động </option>
                </select>
              </div>
            </div>
            <div className="form-loaiSP">
              <select defaultValue={LoaiSPFix} onChange={(e) => setLoaiSPFix(e.target.value)}>
                <option value="Chai lọ mĩ phẫm">Chai lọ mĩ phẫm</option>
                <option value="Chai lọ thực phẩm">Chai lọ thực phẩm</option>
                <option value="Chai lọ dược phẩm">Chai lọ dược phẩm</option>
                <option value="Chai lọ hóa chất">Chai lọ hóa chất</option>
              </select>
            </div>
            <div className="form_mota">
              <textarea onChange={(e) => setChiTietSPFix(e.target.value)}
                defaultValue={props.ChiTietSP}
                title=""
                placeholder="Mô tả" name="thông tin" className="mota_txtArea" rows="10"></textarea>
            </div>
          </div>

        </div>
      </DialogContent>
      <DialogActions className="btn-dialog">
        <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnUpdate_Product}>
          Sửa
        </Button>
      </DialogActions>
    </Dialog>
  )
}