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

  // ten giam gia
  const [colorSale, setColorSale] = useState("#d8dde1");
  const [saleCheck, setLSaleCheck] = useState(true);
  const [errorSale, setErrorSale] = useState("");
  const validateNameSale = (se) => {
    if (se.length < 5 && se.length > 0) {
      setLSaleCheck(false);
      setColorSale("red");
      setErrorSale("Độ dài tên loại sản phẩm lớn hơn 5 kí tự");
    } else {
      setLSaleCheck(true);
      setColorSale("#d8dde1");
      setErrorSale("");
    }
    if (se.length == 0) {
      setLSaleCheck(false);
      setColorSale("red");
      setErrorSale("Tên giảm giá không được để trống");

    }
  }
  function ErrorNameSale(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorNameSale}
      </div>
    )
  }


  // % giam gia
  const [colorPercent, setColorPercent] = useState("#d8dde1");
  const [percentCheck, setLPercentCheck] = useState(true);
  const [errorPercent, setErrorPercent] = useState("");
  const validatePercentSale = (se) => {


    if (se.length == 0) {
      setLPercentCheck(false);
      setColorPercent("red");
      setErrorPercent("Phần trăm giảm giá không được để trống");
    } else {
      setLPercentCheck(true);
      setColorPercent("#d8dde1");
      setErrorPercent("");
    }
  }
  function ErrorPercentSale(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorNameSale}
      </div>
    )
  }

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
      maxWidth="md"
    >
      <DialogContent>
        <div className="container-up" >
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm thông tin mã giảm giá</h2>
          <div className="frames_sale">
            <div className="sale_left">
              <div className="sale_left_top">
                <div className="form">
                  <input type="text" className="form__input" placeholder=" "
                    onChange={(e) => setNameSaleSP(e.target.value)}
                    style={{ borderColor: colorSale }}
                    onBlur={(e) => validateNameSale(e.target.value)}
                    required
                  />
                  <label className="form__label">Tên giảm giá</label>
                </div>
                <ErrorNameSale
                  isHidden={saleCheck}
                  ErrorNameSale={errorSale} />
              </div>
              <div className="sale_left_top">
                <div className="form">
                  <input type="text" className="form__input" placeholder=" "
                    onChange={(e) => setPhanTramGiamGia(e.target.value)}
                    style={{ borderColor: colorPercent }}
                    onBlur={(e) => validatePercentSale(e.target.value)}
                    required
                  />
                  <label className="form__label">Phần trăm giảm giá</label>
                </div>
                <ErrorPercentSale
                  isHidden={percentCheck}
                  ErrorNameSale={errorPercent} />
              </div>
            </div>
            <div className="sale_right">
              <div className="sale_right_top">
                <div className="form_dateGG">
                  <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                    onChange={(e) => setNgayTaoSale(e.target.value)}
                  />
                  <label className="form__label">Ngày tạo</label>
                </div>
              </div>
              <div className="sale_right_top">
                <div className="form_dateGG">
                  <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                    onChange={(e) => setNgayEndSale(e.target.value)}
                  />
                  <label className="form__label">Ngày kết thúc</label>
                </div>
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
      </DialogContent >
      <DialogActions className="btn-dialog">
        <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnAdd_SaleSP}>Thêm</Button>
      </DialogActions>
    </Dialog >
  )
}