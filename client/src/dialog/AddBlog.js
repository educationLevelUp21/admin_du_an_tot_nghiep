import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    Button,
} from '@mui/material';


import axios from "axios";

export default function AddBlog(props) {

    const ip = "http://localhost:8080"

    // const [,set] = useState("")
    const [DateBlog, setDateBlog] = useState(new Date())
    const [TenBlog, setTenBlog] = useState("")
    const [LikeBlog, setLikeBlog] = useState("")
    const [CmtBlog, setCmtBlog] = useState("")
    const [ShareBlog, setShareBlog] = useState("")


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

    const add = () => {
        axios.post(ip + "/add_Blog", {
            DateBlog: DateBlog,
            TenBlog: TenBlog,
            LikeBlog: LikeBlog,
            CmtBlog: CmtBlog,
            ShareBlog: ShareBlog,
        })
    };

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
                    <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Sửa thông tin Giảm Giá</h2>
                    <div className="form_text_ipt_lefft">
                        <div className="formdesign-up">

                            <div className="old-image-up">
                                <p>Ảnh cũ:</p>
                            </div>
                            <div className="new-image-up">
                                <input type="file" name="upload_file" onChange={handleInputChange} />
                            </div>

                            <div className="form-row-up-img">

                                {userInfo.filepreview !== null ?
                                    <img className="img-update" src={userInfo.filepreview} alt="UploadImage" />
                                    : null}
                            </div>
                        </div>
                        <div className="form_nhap">
                            <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                                onChange={(e) => setDateBlog(e.target.value)}
                            />
                            <label className="form__label">Ngày </label>
                        </div>
                    </div>
                    <div className="form_text_ipt_right">
                       
                        <div className="form">
                            <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                onChange={(e) => setTenBlog(e.target.value)}
                                defaultValue={props.TenBlog}
                            />
                            <label className="form__label">TenBlog</label>
                        </div>
                        <div className="form">
                            <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                onChange={(e) => setLikeBlog(e.target.value)}
                                defaultValue={props.LikeBlog}
                            />
                            <label className="form__label">LikeBlog</label>
                        </div>
                        <div className="form">
                            <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                onChange={(e) => setCmtBlog(e.target.value)}
                                defaultValue={props.CmtBlog}
                            />
                            <label className="form__label">CmtBlog</label>
                        </div>
                        <div className="form">
                            <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                onChange={(e) => setShareBlog(e.target.value)}
                                defaultValue={props.ShareBlog}
                            />
                            <label className="form__label">ShareBlog</label>
                        </div>

                    </div>

                </div>
            </DialogContent>
            <DialogActions className="btn-dialog">
                <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>Hủy</Button>
                <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={add}>Thêm</Button>
            </DialogActions>
        </Dialog>
    )
}