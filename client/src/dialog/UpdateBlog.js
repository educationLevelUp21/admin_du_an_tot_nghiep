import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    Button,

} from '@mui/material';
import axios from "axios";

export default function UpdateBlog(props) {

    const ip = "http://localhost:8080"

    const [isSucces, setSuccess] = useState(null);
    const [DateBlogFix, setDateBlogFix] = useState(props.DateBlog)
    const [TenBlogFix, setTenBlogFix] = useState(props.TenBlog)
    const [LikeBlogFix, setLikeBlogFix] = useState(props.LikeBlog)
    const [CmtBlogFix, setCmtBlogFix] = useState(props.CmtBlog)
    const [ShareBlogFix, setShareBlogFix] = useState(props.ShareBlog)



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

    const btnUpdate_Blog = () => {
        axios.put(ip + `/UpdateBlog/${props._id}`, {
            DateBlog: DateBlogFix,
            TenBlog: TenBlogFix,
            LikeBlog: LikeBlogFix,
            CmtBlog: CmtBlogFix,
            ShareBlog: ShareBlogFix,
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
                    <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>S???a th??ng tin Gi???m Gi??</h2>
                    <div className="form_text_ipt_lefft">
                        <div className="formdesign-up">

                            <div className="old-image-up">
                                <p>???nh c??:</p>
                            </div>
                            <div className="new-image-up">
                                <input type="file" name="upload_file" onChange={handleInputChange} />
                            </div>
                            <div className="form-row-up-img">
                                <label className="text-white">Select Image :</label>
                                <img src={ip + '/uploads/' + props.ImageBlog}></img>
                                {isSucces !== null ? <h4> {isSucces} </h4> : null}
                            </div>

                            <div className="form-row-up-img">

                                {userInfo.filepreview !== null ?
                                    <img className="img-update" src={userInfo.filepreview} alt="UploadImage" />
                                    : null}
                            </div>
                        </div>
                        <div className="form_nhap">
                            <input type="date" className="form__input" placeholder=" " name="Ng??y Nh???p Update"
                                onChange={(e) => setDateBlogFix(e.target.value)}
                            />
                            <label className="form__label">Ng??y </label>
                        </div>
                    </div>
                    <div className="form_text_ipt_right">
                        <div className="form">
                            <input type="text" className="form__input" placeholder=" " name="T??n ??o"
                                onChange={(e) => setTenBlogFix(e.target.value)}
                                defaultValue={props.TenBlog}
                            />
                            <label className="form__label">TenBlog</label>
                        </div>
                        <div className="form">
                            <input type="text" className="form__input" placeholder=" " name="T??n ??o"
                                onChange={(e) => setLikeBlogFix(e.target.value)}
                                defaultValue={props.LikeBlog}
                            />
                            <label className="form__label">LikeBlog</label>
                        </div>
                        <div className="form">
                            <input type="text" className="form__input" placeholder=" " name="T??n ??o"
                                onChange={(e) => setCmtBlogFix(e.target.value)}
                                defaultValue={props.CmtBlog}
                            />
                            <label className="form__label">CmtBlog</label>
                        </div>
                        <div className="form">
                            <input type="text" className="form__input" placeholder=" " name="T??n ??o"
                                onChange={(e) => setShareBlogFix(e.target.value)}
                                defaultValue={props.ShareBlog}
                            />
                            <label className="form__label">ShareBlog</label>
                        </div>

                    </div>

                </div>
            </DialogContent>
            <DialogActions className="btn-dialog">
                <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>H???y</Button>
                <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnUpdate_Blog}>
                    S???a
                </Button>
            </DialogActions>
        </Dialog>
    )
}