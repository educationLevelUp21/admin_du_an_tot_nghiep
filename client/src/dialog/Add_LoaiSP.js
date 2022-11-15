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
      maxWidth="lg"
    >
      <DialogContent>
        <div className="container-up" >
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm thông tin loại sản phẩm</h2>
          <div className="form_text_ipt_lefft">
            <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label>Select Multiple Files</label>
                        <input type="file"  onChange={(e)=> handleInputChange(e)} className="form-control" multiple />
                      </div>
                      <div className="form-row-img">
                        {userInfo.filepreview !== null ?
                          <img className="previewimg" width="100" height="100" src={userInfo.filepreview} alt="UploadImage" />
                          : null}
                      </div>
                    </div>
                  </div>
            </div>
          </div>
          <div className="form_text_ipt_right">
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Tên áo"
                onChange={(e) => setNameLoaiSP(e.target.value)}
              />
              <label className="form__label">Tên SP</label>
            </div>
              <div className="form_trangthai">
                <select defaultValue={TrangThaiLoaiSP} onChange={(e) => setTrangThaiLoaiSP(e.target.value)}>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Không hoạt động">Không hoạt động </option>
                </select>
              </div>
            <div className="form_mota">
              <textarea onChange={(e) => setMotaLoaiSP(e.target.value)} title="" placeholder="Mô tả" name="thông tin" className="mota_txtArea" rows="10"></textarea>
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