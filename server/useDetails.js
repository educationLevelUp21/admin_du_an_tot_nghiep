const mongoose = require("mongoose");

// ============================== User admin ===============================

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

// ============================== Add product SP ===============================

const Add_product_sp = new mongoose.Schema(
    {
        idImg: {type: Number, unique: true },
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
    },
);

mongoose.model("Product_SP", Add_product_sp);


// ============================= Add loai SP ===============================

const Add_LoaiSP = new mongoose.Schema(
    {
        ImageLoaiSP: String ,
        NameLoaiSP: String,
        MotaLoaiSP: String,
        TrangThaiLoaiSP: String,
    },
    {
        collection: "LoaiSP",
    },
);

mongoose.model("LoaiSP", Add_LoaiSP);

// ============================= Add Sale SP ===============================

const Add_SaleSP = new mongoose.Schema(
    {
        NameSaleSP: String,
        PhanTramGiamGia: Number,
        NgayTaoSale: Date,
        NgayEndSale: Date,
        TrangThaiSale: String,
    },
    {
        collection: "SaleSP",
    },
);

mongoose.model("SaleSP", Add_SaleSP);

// ============================= Blog ===============================

const Blog = new mongoose.Schema(
    {
        ImageBlog: String,
        DateBlog: Date,
        TenBlog: String,
        LikeBlog: String,
        CmtBlog: String,
        ShareBlog: String,
    },
    {
        collection: "Blog",
    },
);

mongoose.model("Blog", Blog);

// =============================  ===============================
const FileImage = new mongoose.Schema({
    idImg: {type: Number, unique: true },
    files: [Object]
}, {timestamps: true});

mongoose.model('FileImage', FileImage);