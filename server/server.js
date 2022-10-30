const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECREST = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe"



const db = require("./config/key").mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
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


// --------------------------add procduct sp--------------------------------------




// sp
app.post("/add_Product", async (req, res) => {

    const {idSP, NameSP, GiaGocSP, GiaBanSP,SoLuongSP
        ,DateNhapSP,SaleSP,TrangThaiSP,LoaiSP,ChiTietSP } = req.body;

    try {
        await Product_sp.create({

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

// app.post("/add_Product", async (req, res) => {
//     let demId = Product_sp.find({}).sort({idSP: -1}).limit(1)
//     demId.forEach(obj => {
//         if(obj){
//             let dsSP = {
//                 idSP : obj.idSP +1,
//                 NameSP: req.body.NameSP,
//                 GiaGocSP: req.body.GiaGocSP,
//                 GiaBanSP: req.body.GiaBanSP,
//                 SoLuongSP: req.body.SoLuongSP,
//                 DateNhapSP: req.body.DateNhapSP,
//                 SaleSP: req.body.SaleSP,
//                 TrangThaiSP: req.body.TrangThaiSP,
//                 LoaiSP: req.body.LoaiSP,
//                 ChiTietSP: req.body.ChiTietSP,
//             }
//             Product_sp.insertMany(dsSP, (err,result)=>{
//                 if(err) res.status(500).send(err)
//                 res.send("add thanh cong")
//             })
//         }
//     })
// });
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

// -----------------------------delete dulieu ------------------------------

// sp
app.delete("/DeleteSP/:_id",(req,res) =>{
    Product_sp.deleteOne(
        {_id : req.params._id},
        (err,result) =>{
            if(err) throw err
            res.send("Delete thanh cong")
        })
})


// ----------------------------- get du lieu--------------------------------

app.get("/getData", async(req,res) =>{
    Product_sp.find((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

// app.get("/getData/:id", async (req,res) => {
//     Add_product_sp.find({id: parseInt(req.body.id)},(err,result)=>{
//         if(err) throw err
//         res.send(result)
//     }) 
// })


app.listen(PORT, console.log(`server run with port ${PORT}`))

