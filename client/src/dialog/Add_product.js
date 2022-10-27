import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import axios from "axios";

export default function Add_product(props){
  
  const ip = "http://localhost:8080"

    // const [,set] = useState("")
    const [NameSP,setNameSP] = useState("")
    const [GiaGocSP,setGiaGocSP] = useState(0)
    const [GiaBanSP,setGiaBanSP] = useState(0)
    const [SoLuongSP,setSoLuongSP] = useState(0)
    const [DateNhapSP,setDateNhapSP] = useState("")
    const [SaleSP,setSaleSP] = useState(0)
    const [TrangThaiSP,setTrangThaiSP] = useState("Hoạt động")
    const [LoaiSP,setLoaiSP] = useState("Chai lọ mĩ phẫm")
    const [ChiTietSP,setChiTietSP] = useState("")
    

    const btnAdd_Product = () =>{
        axios.post(ip+"/add_Product",{
          NameSP: NameSP,
          GiaGocSP: GiaGocSP,
          GiaBanSP: GiaBanSP,
          SoLuongSP: SoLuongSP,
          DateNhapSP: DateNhapSP,
          SaleSP: SaleSP,
          TrangThaiSP: TrangThaiSP,
          LoaiSP: LoaiSP,
          ChiTietSP:ChiTietSP,
        })
    }



    const handleClose = () => {
        props.setOpen(false);
      };

      return(
        <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="lg"
    >
      <DialogContent>
        <div className="container-up" >
          <h1 style={{ textAlign: 'center', paddingBottom: '20px' }}>Thông tin sản phẩm</h1>

          <div className="form-text-input-up">
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Tên áo" 
              onChange={(e)=>setNameSP(e.target.value)}
              />
              <label className="form__label">Tên SP</label>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Giá gốc" 
              onChange={(e)=>setGiaGocSP(e.target.value)}
             />

              <label className="form__label">Giá gốc</label>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Giá bán" 
                onChange={(e)=>setGiaBanSP(e.target.value)}
              />

              <label className="form__label">Giá bán</label>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Số lượng" 
              onChange={(e)=>setSoLuongSP(e.target.value)}
              />

              <label className="form__label">Số lượng</label>
            </div>
          
            <div className="form-date">
              <div className="form_nhap">
                <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update" 
                onChange={(e)=>setDateNhapSP(e.target.value)}
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
            <div className="form">
              <textarea onChange={(e) => setChiTietSP(e.target.value)}	title="Đây là title" name="thông tin" cols="64" rows="10"></textarea>
            </div>     
          </div>



        </div>
      </DialogContent>
      <DialogActions className="btn-dialog">
        <div className="btn-update" color="primary" onClick={btnAdd_Product}>
          Thêm Sản Phẩm
        </div>
      </DialogActions>
    </Dialog>
      )
}