const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
    {
        uname: String,
        email: String,
        pass: String,
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsScehma);