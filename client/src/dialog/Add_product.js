import React, { useEffect, useState } from "react";
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
  const [idImg, setIdImg] = useState(0)
  const [NameSP, setNameSP] = useState("")
  const [GiaGocSP, setGiaGocSP] = useState(0)
  const [GiaBanSP, setGiaBanSP] = useState(0)
  const [SoLuongSP, setSoLuongSP] = useState(0)
  const [DateNhapSP, setDateNhapSP] = useState(new Date())
  const [SaleSP, setSaleSP] = useState(0)
  const [TrangThaiSP, setTrangThaiSP] = useState("Hoạt động")
  const [LoaiSP, setLoaiSP] = useState("Chai lọ mĩ phẫm")
  const [ChiTietSP, setChiTietSP] = useState("")

  const [idImgCheck, setIdImgCheck] = useState(0);

  // ---------------------------------------upload img--------------------------------

  const [multipleFiles, setMultipleFiles] = useState('');


  const multipleFilesUpload = async (data) => {
    try {
      await axios.post(ip + '/multipleFiles', data);
    } catch (error) {
      throw error;
    }
  }
  //chọn nhiều hình ảnh giai đoạn chọn hình ảnh
  const MultipleFileChange = (e) => {
    // set dữ liệu nhiều hình ảnh lên setMultipleFiles
    setMultipleFiles(e.target.files);
  }


  // upload dữ liệu nhiều hình ảnh lên API
  const UploadMultipleFiles = async () => {
    // check validate trùng id
    if (idImg == idImgCheck) {

    } else if (idImg != idImgCheck) {
      const formData = new FormData();
      formData.append('idImg', idImg);
      for (let i = 0; i < multipleFiles.length; i++) {
        formData.append('files', multipleFiles[i]);
      }
      await multipleFilesUpload(formData);

      axios.post(ip + "/add_Product", {
        idImg: idImg,
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

    // gọi hàm lấy dữ liệu nhiều hình ảnh
    // props.getMultiple();
  }


  const handleClose = () => {
    props.setOpen(false);
  };

  useEffect(() => {
    props.danhsachSP.map((vl) => {
      setIdImgCheck(vl.idImg)
    })
  }, [])

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
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm thông tin sản phẩm</h2>
          <div className="frames_product">
            <div className="form_AddSP_Top_Left">
              <div className="form_img_product">
                {/* <img width='12px' height='12px' src={imgnhap} /> */}
                <input type="file" onChange={(e) => MultipleFileChange(e)} className="custom-file-input" multiple />
              </div>
              <div className="form_Product">
                <input type="text" className="form__input" placeholder=" "
                  onChange={(e) => setIdImg(e.target.value)}
                />
                <label className="form__label">idImg</label>
              </div>
              <div className="form_Product">
                <input type="text" className="form__input" placeholder=" "
                  onChange={(e) => setNameSP(e.target.value)}
                />
                <label className="form__label">Tên Sản phẩm</label>
              </div>
              <div className="form_Product">
                <input type="text" className="form__input" placeholder=" "
                  onChange={(e) => setGiaGocSP(e.target.value)}
                />
                <label className="form__label">Giá gốc</label>
              </div>
              <div className="form_Product">
                <input type="text" className="form__input" placeholder=" "
                  onChange={(e) => setGiaBanSP(e.target.value)}
                />
                <label className="form__label">Giá bán</label>
              </div>
              <div className="form_Product">
                <input type="text" className="form__input" placeholder=" "
                  onChange={(e) => setSoLuongSP(e.target.value)}
                />

                <label className="form__label">Số lượng</label>
              </div>
            </div>
            <div className="form_AddSP_Top_Right">
              <div className="form_Product">
                <input type="date" className="form__input" placeholder=" "
                  onChange={(e) => setDateNhapSP(e.target.value)}
                />
                <label className="form__label">Ngày Nhập</label>
              </div>
              <div className="form_trangthai_product">
                <select defaultValue={SaleSP} onChange={(e) => setSaleSP(e.target.value)}>
                  <option value='0'> Không giảm giá </option>
                  {props.dsSaleSP.map((vl, index) => {
                    if (vl.TrangThaiSale == "Hoạt động") {
                      return (
                        <option key={vl._id} value={vl.PhanTramGiamGia}> {vl.NameSaleSP} giảm {vl.PhanTramGiamGia}%</option>
                      )
                    } else if (vl.TrangThaiSale == "Không hoạt động") {

                    }
                  })}
                </select>
              </div>
              <div className="form_trangthai_product">
                <select defaultValue={TrangThaiSP} onChange={(e) => setTrangThaiSP(e.target.value)}>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Không hoạt động">Không hoạt động </option>
                </select>
              </div>
              <div className="form_trangthai_product">
                <select defaultValue={LoaiSP} onChange={(e) => setLoaiSP(e.target.value)}>
                  {props.dsLoaiSP.map((vl, index) => {
                    if (vl.TrangThaiLoaiSP == "Hoạt động") {
                      return (
                        <option key={vl._id} value={vl.NameLoaiSP}> {vl.NameLoaiSP}</option>
                      )
                    } else if (vl.TrangThaiLoaiSP == "Không hoạt động") {

                    }
                  })}
                </select>
              </div>
              <div className="form_mota_Product">
                <textarea onChange={(e) => setChiTietSP(e.target.value)} title="" placeholder="Mô tả" className="form_mota_Product" rows="10"></textarea>
              </div>
            </div>



          </div>

        </div>
      </DialogContent>
      <DialogActions className="btn-dialog">
        <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={UploadMultipleFiles}>Thêm</Button>
      </DialogActions>
    </Dialog>
  )
}