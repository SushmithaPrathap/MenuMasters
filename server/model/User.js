import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name field is required',
    },
    email: {
        type: String,
        required: 'The email field is required',
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    token:{
        type: String
    },
    height:{
        type: String,
    },
    weight:{
        type: String
    }
})

const model = mongoose.model('user',schema);
export default model;
