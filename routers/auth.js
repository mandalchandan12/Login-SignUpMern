const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


require('../db/conn');
const User = require("../models/userSchema");
router.get('/', (req, res) => {
    console.log(req.body);
    res.json({ message: req.body })
    // res.send('Hello World From Server from Router')
});

//postman
// router.post('/register',(req, res)=>{
//     const { name, email, phone, work, password, cpassword} = req.body;
//    if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"Plz fill all info"})
//    }

//    User.findOne({email:email})
//    .then ((userExist)=>{
//         if (userExist) {
//             return res.status(422).json({error:"user already register"});
//         }
//         const user = new User({name, email, phone, work, password, cpassword})
//         user.save().then(()=>{
//             res.status(201).json({message: "registration successfully"})
//         }).catch((err)=>res.status(500).json({error:"Failed to register"}))
//    }).catch(err =>{console.log(err); });
// });

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz fill all info" })
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "user already register" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Both password is not matching"});
        } else {
            const user = new User({ name, email, phone, work, password, cpassword })
            //😍😍 Here we used hashed trick for password
            const userRegister = await user.save();
            if (userRegister) {
                res.status(201).json({ message: "registration successfully" })
            } else {
                res.status(500).json({ message: "failed to register" })
            }
        }

    } catch (err) {
        console.log(err);
    }

});


//LOGIN HERE
router.post('/signin', async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all info" })
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if(!isMatch){
                res.status(400).json({ error: "invalid details" })  
            }else{
                res.json({ error: "SignIn Successfully" })
            }
        }else{
            res.status(400).json({ error: "invalid details" }) 
        }

        
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;

