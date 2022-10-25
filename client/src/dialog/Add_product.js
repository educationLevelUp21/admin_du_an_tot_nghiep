import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";


export default function Add_product(props){

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

              />
              <label className="form__label">Tên áo</label>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Giá nhập" 
                
              />

              <label className="form__label">Giá nhập</label>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Giá bán" 
                
              />

              <label className="form__label">Giá bán</label>
            </div>
            <div className="form">
              <input type="text" className="form__input" placeholder=" " name="Số lượng" 
              />

              <label className="form__label">Số lượng</label>
            </div>
            <div className="form-date">
              <div className="form-cu">
                <input type="text" className="form__input" placeholder=" " name="Ngày Nhập" 
                />
                <label className="form__label">Ngày Nhập</label>
              </div>
              <div className="form-moi">
                <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update" 
                />
                <label className="form__label">Ngày Nhập Update</label>
              </div>

            </div>


            {/* <div className="form-loaiSP">
              <select defaultValue={LoaiSPFix} onChange={(e) => setLoaiSPFix(e.target.value)}>
                <option value="Áo">Áo</option>
                <option value="Quần">Quần</option>
              </select>
            </div> */}
          </div>



        </div>
      </DialogContent>
      <DialogActions className="btn-dialog">
        <div rguments className="btn-close" >
          Thoát
        </div>
        <div className="btn-delete" color="primary" >
          Xóa
        </div>
        <div className="btn-update" color="primary" >
          Cập nhật
        </div>
      </DialogActions>
    </Dialog>
      )
}