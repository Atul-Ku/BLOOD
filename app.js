// jshint esversion:6

const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const states = require("./public/select")

mongoose.connect("mongodb://127.0.0.1:27017/Bloodhub", {
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
    },
}, 
    { timestamps: true}
);

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
});

const Request = new mongoose.model("bloodType", requestSchema);

const BloodBankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    contactPerson: {
        type: String,
        required: true
    }
});

const BloodBank= new mongoose.model("bloodBank",BloodBankSchema);

const DonorLogin = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
    },
    phone: {
        type: Number,
        unique: true,
        required: 'Phone number is required'
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
    },
    BloodGroup: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }
});

const Donor = new mongoose.model("Donor", DonorLogin);

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
    res.render("AddBloodBank",{stateDistricts:states.stateDistricts})
});

app.get("/index", function (req, res) {
    res.render("index")
})

app.get("/contactform", function (req, res) {
    res.render("contactform")
});

app.get("/Donation", function (req, res) {
    res.render("Donation")
});

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
});

app.post("/AddBloodBank",function(req,res){
    const name=req.body.BloodBank;
    const state=req.body.state;
    const district=req.body.district;
    const city=req.body.city;
    const phone=req.body.phone;
    const email=req.body.Email;
    const website=req.body.Website;
    const hospitalname=req.body.Parent;
    const contactPerson=req.body.person;
    const category=req.body.Category;

    const found = async () => {
        const result = await BloodBank.find({ contact : phone });
        if (result.length == 0) {
            try {
                const bank = new BloodBank({
                    name: name.toLowerCase(),
                    state: state,
                    district: district,
                    city: city,
                    contact: phone,
                    email: email,
                    website: website,
                    hospital: hospitalname,
                    contactPerson: contactPerson,
                    category: category
                })
                bank.save();
                console.log(name.toLowerCase());
                res.redirect("/");
            } 
            catch (err) {
                console.log(err);
            }
        }
        else {
            res.redirect("/");
        }
    }
    found();
});

app.get("/donor",function(req,res){
    res.render("Donor");
});

app.post("/donor",function(req,res){
    const name=req.body.name;
    const phone=req.body.phone;
    const email=req.body.Email;
    const bloodgroup=req.body.Blood;
    const city=req.body.city;
    const state=req.body.state;
    const pincode=req.body.pincode;
    const found = async () => {
        const result = await Donor.find({ phone : phone });
        if (result.length == 0) {
            try {
                const donor = new Donor({
                    name: name.toLowerCase(),
                    phone: phone,
                    email: email,
                    BloodGroup: bloodgroup,
                    city: city,
                    state: state,
                    pincode: pincode
                });
                donor.save();
                console.log(name.toLowerCase());
                res.redirect("/");
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            res.redirect("/");
        }
    }
    found();
});

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