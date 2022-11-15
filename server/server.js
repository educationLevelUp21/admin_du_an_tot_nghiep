const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const multer = require('multer');




const app = express();


app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const JWT_SECREST = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe"



const db = require("./config/key").mongoURI;

mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})
    .then(() => console.log("MongodB Connected...."))
    .catch((err) => console.log(err));


const PORT = process.env.PORT || 8080;



app.post("/post", async (req, res) => {
    console.log(req.body);
    const { data } = req.body;
    try {
        if (data == "adarsh") {
            res.send({ status: "ok" });
        } else {
            res.send({ status: "User Not found" });

        }
    } catch (error) {
        res.send({ status: "Something went wrong try again" });
    }
});

// ------------------------gọi điều hướng------------------------------------

require("./useDetails");


const UserAdmin = mongoose.model("UserInfoAdmin");

const Product_sp = mongoose.model("Product_SP");

const LoaiSP = mongoose.model("LoaiSP");

const SaleSP = mongoose.model("SaleSP");

const Blog = mongoose.model("Blog");

const FileImage = mongoose.model("FileImage");

// ------------------------Register Admin------------------------------------

app.post("/register-admin", async (req, res) => {

    const { uname, taikhoan, pass } = req.body;

    const encryptedPassword = await bcrypt.hash(pass, 2)

    try {

        const oldUserAdmin = await UserAdmin.findOne({ taikhoan });

        if (oldUserAdmin && res.status(201)) {
            return res.json({ error: "Trùng tài khoản" });
        }

        await UserAdmin.create({
            uname: uname,
            taikhoan: taikhoan,
            pass: encryptedPassword,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

// ------------------------Login Admin------------------------------------

app.post("/login-admin", async (req, res) => {

    const { taikhoan, pass } = req.body;

    const userAdmin = await UserAdmin.findOne({ taikhoan });
    if (res.status(201)) {
    if (!userAdmin) {
        return res.json({ error: "Tài khoản không tồn tại" });
    }
    if (await bcrypt.compare(pass, userAdmin.pass)) {
        const token = jwt.sign({ taikhoan: userAdmin.taikhoan }, JWT_SECREST);

        if (res.status(201)) {
            return res.json({ status: "oke", data: token });
        } else {
            return res.json({ error: "error" })
        }
    }

    return res.json({ status: "error", error: "Mật khẩu sai" })
    }
})

// ------------------------get login------------------------------------

app.post("/UserAdmin-data", async (req, res) => {

    const { token } = req.body;

    try {

        const user = jwt.verify(token, JWT_SECREST);
        const userTK = user.taikhoan;
        UserAdmin.findOne({ taikhoan: userTK })
            .then((data => {
                res.send({ status: "oke", data: data })
            }))

    } catch (error) {
        res.send({ status: "error", data: error })
    }
})


// --------------------------Upload img--------------------------------------

// Xác định file chứa hình ảnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
let linkimg = null;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, linkimg =  new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

//phần này là check đuôi hình ảnh
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}
const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}
const upload = multer({storage: storage, fileFilter: filefilter});

// up nhiều hình lên
app.post('/multipleFiles', upload.array('files'), async (req, res, next) => {
    try{
        let filesArray = [];
            req.files.forEach(element => {
                const file = {
                    fileName: element.originalname,
                    filePath: element.path,
                    fileType: element.mimetype,
                    fileSize: fileSizeFormatter(element.size, 2)
                }
                filesArray.push(file);
            });

        await FileImage.create({
            idImg: req.body.idImg,
            files: filesArray 
        });
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
})

// update 1 hinh`
app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file);
     if (!file) {
       const error = new Error('No File')
       error.httpStatusCode = 400
       return next(error)
     }
   })


// --------------------------add --------------------------------------


app.post("/add_Product", async (req, res) => {

    const {idImg,NameSP, GiaGocSP, GiaBanSP,SoLuongSP
        ,DateNhapSP,SaleSP,TrangThaiSP,LoaiSP,ChiTietSP } = req.body;

    try {

        await Product_sp.create({
            idImg:idImg,
            NameSP: NameSP,
            GiaGocSP: GiaGocSP,
            GiaBanSP: GiaBanSP,
            SoLuongSP: SoLuongSP,
            DateNhapSP: DateNhapSP,
            SaleSP: SaleSP,
            TrangThaiSP: TrangThaiSP,
            LoaiSP: LoaiSP,
            ChiTietSP: ChiTietSP,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});



//loaisp
app.post("/add_LoaiSP", async (req, res) => {

    const {NameLoaiSP,MotaLoaiSP,TrangThaiLoaiSP } = req.body;

    try {

        await LoaiSP.create({
            ImageLoaiSP: linkimg,
            NameLoaiSP: NameLoaiSP,
            MotaLoaiSP: MotaLoaiSP,
            TrangThaiLoaiSP: TrangThaiLoaiSP,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

//Sale Sp
app.post("/add_SaleSP", async (req, res) => {

    const {NameSaleSP,PhanTramGiamGia
        ,NgayTaoSale,NgayEndSale,TrangThaiSale } = req.body;

    try {

        await SaleSP.create({
            NameSaleSP: NameSaleSP,
            PhanTramGiamGia: PhanTramGiamGia,
            NgayTaoSale: NgayTaoSale,
            NgayEndSale: NgayEndSale,
            TrangThaiSale: TrangThaiSale,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

app.post("/add_Blog", async (req, res) => {

    const {DateBlog
        ,TenBlog,LikeBlog,CmtBlog,ShareBlog } = req.body;

    try {

        await Blog.create({
            ImageBlog: linkimg,
            DateBlog: DateBlog,
            TenBlog: TenBlog,
            LikeBlog: LikeBlog,
            CmtBlog: CmtBlog,
            ShareBlog: ShareBlog,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});





// ----------------------------- update dulieu--------------------------------

// sp
app.put("/UpdateSP/:_id",(req,res) => {
    let SP={
        NameSP: req.body.NameSP,
        GiaGocSP: req.body.GiaGocSP,
        GiaBanSP: req.body.GiaBanSP,
        SoLuongSP: req.body.SoLuongSP,   
        DateNhapSP: req.body.DateNhapSP,
        SaleSP: req.body.SaleSP,
        TrangThaiSP: req.body.TrangThaiSP,
        LoaiSP: req.body.LoaiSP,
        ChiTietSP: req.body.ChiTietSP,
    }

    Product_sp.updateOne(
            {_id: req.params._id},
            {$set:SP},
            (err,result) => {
            if(err) throw err
            res.send(SP);
        })
})


// Loai SP
app.put("/UpdateLoaiSP/:_id",(req,res) => {

    if (linkimg == null) {
        linkimg = req.body.linkhinhanhsua;
    } 

    let putSP={
        ImageLoaiSP : linkimg,
        NameLoaiSP: req.body.NameLoaiSP,
        MotaLoaiSP: req.body.MotaLoaiSP,
        TrangThaiLoaiSP: req.body.TrangThaiLoaiSP,     
    }

    LoaiSP.updateOne(
        {_id: req.params._id},
        {$set:putSP},
        (err,result) => {
        if(err) throw err
        res.send(putSP);
    })
})

// Sale SP
app.put("/UpdateSaleSP/:_id",(req,res) => {


    let putSale={
        NameSaleSP: req.body.NameSaleSP,
        PhanTramGiamGia: req.body.PhanTramGiamGia,
        NgayTaoSale: req.body.NgayTaoSale,     
        NgayEndSale: req.body.NgayEndSale,   
        TrangThaiSale: req.body.TrangThaiSale,   
    }

    SaleSP.updateOne(
        {_id: req.params._id},
        {$set:putSale},
        (err,result) => {
        if(err) throw err
        res.send(putSale);
    })
})

// Blog
app.put("/UpdateBlog/:_id",(req,res) => {
    if (linkimg == null) {
        linkimg = req.body.linkhinhanhsua;
    } 


    let putBlog={
        ImageBlog: linkimg,
        DateBlog: req.body.DateBlog,
        TenBlog: req.body.TenBlog,     
        LikeBlog: req.body.LikeBlog,   
        CmtBlog: req.body.CmtBlog,
        ShareBlog: req.body.ShareBlog,      
    }

    Blog.updateOne(
        {_id: req.params._id},
        {$set:putBlog},
        (err,result) => {
        if(err) throw err
        res.send(putBlog);
    })
})

// -----------------------------delete dulieu ------------------------------

// sp
app.delete("/DeleteSP/:idImg",(req,res) =>{
    Product_sp.deleteOne(
        {idImg : req.params.idImg},
        (err,result) =>{
            if(err) throw err
            res.send("Delete thanh cong")
        })
})

// img

app.delete("/DeleteImg/:idImg",(req,res) =>{
    FileImage.deleteOne(
        {idImg : req.params.idImg},
        (err,result) =>{
            if(err) throw err
            res.send("Delete thanh cong")
        })
})


// Loai SP

app.delete("/DeleteLoaiSP/:_id",(req,res) =>{
    LoaiSP.deleteOne(
        {_id : req.params._id},
        (err,result) =>{
            if(err) throw err
            res.send("Delete thanh cong")
        })
})

// Sale SP

app.delete("/DeleteSoaiSP/:_id",(req,res) =>{
    SaleSP.deleteOne(
        {_id : req.params._id},
        (err,result) =>{
            if(err) throw err
            res.send("Delete thanh cong")
        })
})



// ----------------------------- get du lieu--------------------------------

// sp
app.get("/getData", async(req,res) =>{
    Product_sp.find((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})


// Loai sp
app.get("/getDataLoaiSP", async(req,res) =>{
    LoaiSP.find((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

// Sale sp
app.get("/getDataSaleSP", async(req,res) =>{
    SaleSP.find((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

// Blog 
app.get("/getDataBlog", async(req,res) =>{
    Blog.find((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

// lấy nhiều hình về
app.get('/getMultipleFiles', async (req, res, next) => {
    try{
        const files = await FileImage.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
});
app.get("/getImg/:idImg", async (req,res) => {
    FileImage.find({idImg: parseInt(req.params.idImg)},(err,result)=>{
        if(err) throw err
        res.send(result)
    }) 
})





app.listen(PORT, console.log(`server run with port ${PORT}`))

