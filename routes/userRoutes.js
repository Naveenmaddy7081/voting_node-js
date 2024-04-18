const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware, generatToken} = require('./../jwt.js');


// post route add a prson
router.post('/signup',async (req, res) =>{
    try{
        const data = req.body // asuming req body contain prson data

        //create a new prson dcumt
        const newUser =new User(data);
        // newPerson.name = data.name;

        //save the new prson 
        const response = await newUser.save();
        console.log('data saved');

        const payload ={
            id: response.id,
            // username: response.username
        }

        console.log(JSON.stringify(payload));
        
        const token= generatToken(payload);
        console.log("token is:", token);

        res.status(200).json({response: response, token: token});

        // res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});

    }
})

//login route
router.post('/login', async(req,res) =>{
    try{
        // extract username pssd reqst body
        const {aadharCardNumber, password} =req.body;

        //find the user by username
        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        //if user dos not exit or psd not mtch rtn errer
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'invalid username or paswd'});
        }

        //genretae token
        const payload={
            id: user.id,
            // username: user.username
        }
        const token = generatToken(payload);

        //retn token rspns
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'internal server error'});
    }
});


//profile route
router.get('/profile',jwtAuthMiddleware, async (req, res)=>{
    try{
        const userData = req.user;
        // console.log('user data:',userData);

        const userID = userData.id;
        const user = await User.findById(userID);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({error: "internal server error"});
    }
})







//update method
router.put('/profile/password',jwtAuthMiddleware,async (req, res)=>{
    try{
        const userID = req.user;
        const {currentPassword, newPassword} =req.body;

        const user = await User.findById({userID});

        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error: 'invalid username or paswd'});
        }

        user.password =newPassword;
        await user.save();

        
        

        console.log('password updated');
        res.status(200).json({message: "password update"});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});


    }
})




module.exports = router;