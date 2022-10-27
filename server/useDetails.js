const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
    {
        uname: String,
        taikhoan: {type: String, unique: true },
        pass: String,
    },
    {
        collection: "UserInfoAdmin",
    }
);

mongoose.model("UserInfoAdmin", UserDetailsScehma);

const Add_product_sp = new mongoose.Schema(
    {
        NameSP: String,
        GiaGocSP: Number,
        GiaBanSP: Number,
        SoLuongSP: Number,
        DateNhapSP: Date,
        SaleSP: Number,
        TrangThaiSP: String,
        LoaiSP: String,
        ChiTietSP: String,
    },
    {
        collection: "Product_SP",
    }
);

mongoose.model("Product_SP", Add_product_sp);
