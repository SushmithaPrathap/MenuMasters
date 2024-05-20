import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieSession from 'cookie-session';
// import {keys} from './config/dev/keys.js'
import { Strategy } from 'passport-google-oauth20';
import User from './model/User.js'
import  { MongoClient, ServerApiVersion } from 'mongodb';
import multer from 'multer';
import path from "path";
import {fileURLToPath} from 'url';

import route from './route/index.js';


//Initialize the express app
const app = express();

//Set the cookie session
app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [process.env.cookieKey]
}))

//Initialize the passport package
app.use(passport.initialize())
app.use(passport.session())

// mongoose.connect('mongodb://127.0.0.1:27017/todoapp')

// mongoose.connect('mongodb+srv://Aditya:hello@cluster0.cy9tkrp.mongodb.net/?retryWrites=true&w=majority')


//Connect to he mongodb databse
mongoose.connect('mongodb://127.0.0.1:27017/todoapp')

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id)
        .then(user=>{
            done(null,user )
        })
})

//Set the google passport strategy
passport.use(new Strategy({ 
    clientID : process.env.clientID, 
    clientSecret: process.env.secretID, 
    callbackURL: '/auth/google/callback',
    scope: ['profile','email']
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ token: profile.id}).then( existingUser => {
        if(existingUser){
            done(null , existingUser);
        }else{
            new User({"token":profile.id, "name":profile['_json']['name'], "email":profile['_json']['email']}).save()
                .then(user => done(null, user))
        }
    })
    console.log('access token', accessToken)

}))

//Multer is used for image storage
const storage = multer.diskStorage({
    destination:(req,file,cb) => {cb(null,"./images")},
    filename:(req,file,cb) => {
        cb(null,req.body.name);

    },
});

const upload = multer({storage: storage});
app.post("/upload", upload.single("file"), (req,res)=> {
    res.status(200).json("File has been uploaded");
})

//Use CORS for the app, to enable cross origin requests
app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname,"./images")))
app.use(express.urlencoded());

//Set the routes for the app
route(app);

//Get the port from keys config
const PORT = process.env.port;

app.listen(PORT,()=>{
    console.log('Server is ruinning at port ',PORT)
});
