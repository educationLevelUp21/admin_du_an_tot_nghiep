const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());


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


require("./useDetails");

const User = mongoose.model("UserInfo");

app.post("/register",async(req,res)=>{

    const {uname, email, pass} = req.body;

    try {
        await User.create({
            uname: uname,
            email,
            pass:pass,
        });
        res.send({status:"Ok"});
    } catch (error) {
        res.send({status:"error"});
    }
});

app.listen(PORT, console.log(`server run with port ${PORT}`))

