import bcrypt from "bcrypt";
import express from "express";
import userSchema from '../model/User.js'

const route = express.Router();

//Route for user login
route.post('/login', async(req, res)=>{

    try{
        
        const {email, password } = req.body;

        const user = await userSchema.findOne({ email:email})

        if(!user){
            res.status(400).json({msg:"User not found"})
        }

        let passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            res.status(200).json({msg:"ok", user:user})
            req.session.user = user
        }
        else{
            res.status(400).json({msg:"Incorrect credentails"})
        }
    }
    catch(err){
        console.log('Login error', err)
    }
    
})

route.post('/register',async (req, res)=>{

    try
    {
        const {name, email, password } = req.body;

        let user = await userSchema.findOne({email})
        if(user){
            console.log('The user is already present')
        } 



        bcrypt.hash(password, 7, async(err, hash) =>{
            // Store hash in your password DB.
            if(err){
                res.status.json({msg:"error while saving password"})
            }
            const newUser = new userSchema({email:email, password:hash, name:name})
            const userSaveResponse = await newUser.save()
            if(userSaveResponse){
                res.status(200).json({msg:"ok"})
            }
        });
    }
    catch(err){
        console.log('Registration error', err)
    }
    
})

route.post('/update',async (req, res)=>{

    try
    {
        const {name, email, password, height, weight } = req.body;

        let user = await userSchema.findOne({email})
        // if(user){
        //     console.log('The user is already present')
        // } 

        bcrypt.hash(password, 7, async(err, hash) =>{
            // Store hash in your password DB.
            if(err){
                res.status.json({msg:"error while saving password"})
            }
            // const newUser = new userSchema({email:user.email, password:hash, name:user.name, height:height, weight:weight})
            // const userSaveResponse = await newUser.save()

            let updatesUser = await userSchema.updateMany({email:email},{ $set: {password:hash, height:height, weight:weight}})
            if(updatesUser){
                res.status(200).json({msg:"ok"})
            }
        });
    }
    catch(err){
        console.log('Registration error', err)
    }
    
})

export default route;

