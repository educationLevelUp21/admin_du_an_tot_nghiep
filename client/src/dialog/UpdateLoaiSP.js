import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    Button,

} from '@mui/material';
import axios from "axios";

export default function UpdateLoaiSP(props) {

    const ip = "http://localhost:8080"

    const [isSucces, setSuccess] = useState(null);
    const [NameLoaiSPFix, setNameLoaiSPFix] = useState(props.NameLoaiSP)
    const [MotaLoaiSPFix, setMotaLoaiSPFix] = useState(props.MotaLoaiSP)
    const [TrangThaiLoaiSPFix, setTrangThaiLoaiSPFix] = useState(props.TrangThaiLoaiSP)


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

    const btnUpdate_LoaiSP = () => {
        axios.put(ip + `/UpdateLoaiSP/${props._id}`, {
            NameLoaiSP: NameLoaiSPFix,
            MotaLoaiSP: MotaLoaiSPFix,
            TrangThaiLoaiSP: TrangThaiLoaiSPFix,
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
                    <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Sửa thông tin loại sản phẩm</h2>
                    <div className="form_text_ipt_lefft">
                        <div className="formdesign-up">

                            <div className="old-image-up">
                                <p>Ảnh cũ:</p>
                            </div>
                            <div className="new-image-up">
                                <input type="file" name="upload_file" onChange={handleInputChange} />
                            </div>
                            <div className="form-row-up-img">
                                {/* <label className="text-white">Select Image :</label> */}
                                <img src={ip + '/uploads/' + props.ImageLoaiSP}></img>
                                {isSucces !== null ? <h4> {isSucces} </h4> : null}
                            </div>

                            <div className="form-row-up-img">

                                {userInfo.filepreview !== null ?
                                    <img className="img-update" src={userInfo.filepreview} alt="UploadImage" />
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className="form_text_ipt_right">
                        <div className="form">
                            <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                onChange={(e) => setNameLoaiSPFix(e.target.value)}
                                defaultValue={props.NameLoaiSP}
                            />
                            <label className="form__label">Tên SP</label>
                        </div>
                        <div className="form_trangthai">
                            <select defaultValue={props.TrangThaiLoaiSP} onChange={(e) => setTrangThaiLoaiSPFix(e.target.value)}>
                                <option value="Hoạt động">Hoạt động</option>
                                <option value="Không hoạt động">Không hoạt động </option>
                            </select>
                        </div>
                        <div className="form_mota">
                            <textarea onChange={(e) => setMotaLoaiSPFix(e.target.value)} title=""
                                placeholder="Mô tả" name="thông tin" className="mota_txtArea" rows="10"
                                defaultValue={props.MotaLoaiSP}
                            ></textarea>
                        </div>
                    </div>

                </div>
            </DialogContent>
            <DialogActions className="btn-dialog">
                <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>Hủy</Button>
                <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnUpdate_LoaiSP}>
                    Sửa
                </Button>
            </DialogActions>
        </Dialog>
    )
}