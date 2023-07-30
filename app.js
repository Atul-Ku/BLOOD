// jshint esversion:6

const express = require("express")
const app = express()
const BodyParser = require("body-parser")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Bloodhub", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to Bloodhub Database.")
}).catch((err) => {
    console.log(err);
});

app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set('view engine', 'ejs');

const signSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
    },
    password: {
        type: String,
        unique: true
    }
});

const Sign = new mongoose.model("Login", signSchema);

const requestSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true
    },
    bloodunit: {
        type: Number,
        required: true
    },
    hosp:{
        type:String,
        required:true
    }
})

const Request = new mongoose.model("bloodType", requestSchema);

const HOSPITAL=[];
var Hosname;

app.get("/", function (req, res) {
    res.render("home")
})

app.get("/terms", function (req, res) {
    res.render("terms");
})

app.get("/policy", function (req, res) {
    res.render("policy")
})

app.get("/video", function (req, res) {
    res.render("video")
})

app.get("/About", function (req, res) {
    res.render("About")
})

app.get("/accessment", function (req, res) {
    res.render("accessment")
})

app.get("/FAQ", function (req, res) {
    res.render("FAQ")
})

app.get("/contact", function (req, res) {
    res.render("contact")
})

app.get("/login", function (req, res) {
    res.render("login");
})

app.get("/signup", function (req, res) {
    res.render("signup")
})

app.get("/AddBloodBank", function (req, res) {
    res.render("AddBloodBank")
})

app.get("/index", function (req, res) {
    res.render("index")
})

app.get("/index", function (req, res) {
    res.render("index")
})

app.get("/contactform", function (req, res) {
    res.render("contactform")
})

app.post("/index", function (req, res) {
    const Hostital=req.body.Hospital;
    console.log(Hostital);
    Hosname=Hostital;
    HOSPITAL.push(Hostital);
    res.redirect("/blood")
})

app.get("/blood", function (req, res) {
    res.render("Blood",{HOSNAME:Hosname});
})

app.post("/blood", function (req, res) {
    const getcheck=req.body.check;
    const getnum=req.body.quantity;
    const getname=HOSPITAL.pop();
    const requestBlood = async () => {
        const entr = new Request({
            bloodType: getcheck,
            bloodunit: getnum,
            hosp: getname
        })
        entr.save();
        res.redirect("/contactform")
    }
    requestBlood();
})

app.get("/A1", function (req, res) {
    res.render("A1")
})

app.get("/A2", function (req, res) {
    res.render("A2")
})

app.get("/contactformB2", function (req, res) {
    res.render("B2")
})

app.get("/contactformB1", function (req, res) {
    res.render("B1")
})

app.get("/AB2", function (req, res) {
    res.render("AB2")
})

app.get("/AB1", function (req, res) {
    res.render("AB1")
})

app.get("/O2", function (req, res) {
    res.render("O2")
})

app.get("/O1", function (req, res) {
    res.render("O1")
})

app.post("/signup", function (req, res) {
    const signItem1 = req.body.Email;
    const signItem2 = req.body.pass;
    const found = async () => {
        const result = await Sign.find({ email: signItem1 });
        if (result.length == 0) {
            try {
                const sign = new Sign({
                    email: signItem1,
                    password: signItem2
                })
                sign.save();
                res.redirect("/");
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            res.redirect("/login");
        }
    }
    found();
})

app.post("/contactform", function (req, res) {
    res.redirect("/")
})

app.post("/login", function (req, res) {
    res.redirect("/")
})

app.listen(3000, function (req, res) {
    console.log("Server has started at 3000 port");
})