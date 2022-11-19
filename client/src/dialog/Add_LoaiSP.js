import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Button,
} from '@mui/material';


import axios from "axios";

export default function Add_LoaiSP(props) {

  const ip = "http://localhost:8080"

  // const [,set] = useState("")
  const [NameLoaiSP, setNameLoaiSP] = useState("")
  const [MotaLoaiSP, setMotaLoaiSP] = useState("")
  const [TrangThaiLoaiSP, setTrangThaiLoaiSP] = useState("Hoạt động")


  // ten loai san pham
  const [colorLSP, setColorLSP] = useState("#d8dde1");
  const [lspCheck, setLSPCheck] = useState(true);
  const [errorLSP, setErrorLSP] = useState("");
  const validateTenLSP = (se) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(se) == false) {
      setLSPCheck(true);
      setColorLSP("#d8dde1");
      setErrorLSP("");

    } else {
      setLSPCheck(false);
      setColorLSP("red");
      setErrorLSP("Vui lòng không điền kí tự đặt biệt");
    }

    // if (se.length > 50) {
    //   setLSPCheck(false);
    //   setColorLSP("red");
    //   setErrorLSP("Tài khoản dài quá 50 kí tự nef");
    // }
    if (se.length < 5 && se.length > 0) {
      setLSPCheck(false);
      setColorLSP("red");
      setErrorLSP("Độ dài tên loại sản phẩm lớn hơn 5 kí tự");
    }
    if (se.length == 0) {
      setLSPCheck(false);
      setColorLSP("red");
      setErrorLSP("Tên loại sản phẩm không được để trống");
    }
  }
  function ErrorLoaiSP(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorLoaiSP}
      </div>
    )
  }

  // mo ta
  const [colorMota, setColorMota] = useState("#fff");
  const [MotaCheck, setMotaCheck] = useState(true);
  const [errorMota, setErrorMoTa] = useState("");
  const validateMota = (se) => {
    // const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    // if (format.test(se) == false) {
    //   setMotaCheck(true);
    //   setColorMota("#fff");
    //   setErrorMoTa("");

    // } else {
    //   setMotaCheck(false);
    //   setColorMota("red");
    //   setErrorMoTa("Vui lòng không điền kí tự đặt biệt nef");
    // }

    // if (se.length > 50) {
    //   setMotaCheck(false);
    //   setColorMota("red");
    //   setErrorMoTa("Tài khoản dài quá 50 kí tự nef");
    // }
    if (se.length < 5 && se.length > 0) {
      setMotaCheck(false);
      setColorMota("red");
      setErrorMoTa("Độ dài mô tả lớn hơn 5 kí tự");
    } else {
      setMotaCheck(true);
      setColorMota("#fff");
      setErrorMoTa("");
    }
    if (se.length == 0) {
      setMotaCheck(false);
      setColorMota("red");
      setErrorMoTa("Mô tả không được để trống");
    }
  }
  function ErrorMota(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorMota}
      </div>
    )
  }
  //   // ---------------------------------------upload img--------------------------------
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    })
    const data = new FormData();
    data.append('file', event.target.files[0]);
    console.log(data);

    axios.post(ip + "/uploadFileAPI", data)
      .then(res => { // then print response status
        console.log(res.data);
      });
  }

  const btnAdd_LoaiSP = () => {
    axios.post(ip + "/add_LoaiSP", {
      NameLoaiSP: NameLoaiSP,
      MotaLoaiSP: MotaLoaiSP,
      TrangThaiLoaiSP: TrangThaiLoaiSP,
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
      maxWidth="md"
    >
      <DialogContent style={{ height: 'auto' }}>
        <div className="container-up" >
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm thông tin loại sản phẩm</h2>
          <div className="frames_loaiSp">
            <div className="loaiSP_left">
              <div className="form_img_image">
                {userInfo.filepreview !== null ?
                  <img style={{ borderRadius: '5px' }} width="100%" height="248" src={userInfo.filepreview} alt="UploadImage" />
                  : null}
              </div>
              <div className="form_img_click">
                {/* <button type="file" onChange={(e) => handleInputChange(e)} multiple>fghrtyrtteryrtytry</button> */}
                <input type="file" onChange={(e) => handleInputChange(e)} className="form-control" multiple />
              </div>
            </div>
            <div className="loaiSP_right">
              <div className="form_top">
                <div className="form_top_left">
                  <div className="form">
                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                      onChange={(e) => setNameLoaiSP(e.target.value)}
                      style={{ borderColor: colorLSP }}
                      onBlur={(e) => validateTenLSP(e.target.value)}
                      required
                    />
                    <label className="form__label">Tên loại sản phẩm</label>

                  </div>
                  <ErrorLoaiSP
                    isHidden={lspCheck}
                    ErrorLoaiSP={errorLSP} />
                </div>
                <div className="form_top_right">
                  <div className="form_trangthai">
                    <select defaultValue={TrangThaiLoaiSP} onChange={(e) => setTrangThaiLoaiSP(e.target.value)}>
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Không hoạt động">Không hoạt động </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form_mota_LSP">
                <textarea onChange={(e) => setMotaLoaiSP(e.target.value)} title=""
                  placeholder="Mô tả" name="thông tin" className="mota_txtArea" rows="9"
                  style={{ borderColor: colorMota, }}
                  onBlur={(e) => validateMota(e.target.value)}
                  required
                />
                <ErrorMota
                  isHidden={MotaCheck}
                  ErrorMota={errorMota} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="btn-dialog">
        <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnAdd_LoaiSP}>Thêm</Button>
      </DialogActions>
    </Dialog>
  )
}