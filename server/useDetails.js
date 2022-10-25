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