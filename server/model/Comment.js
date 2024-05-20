import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    content:{
        type: String,
    },
    date :{
        type: Date,
        default: Date.now()
    },
    user:{
        type: String
    }
})

const model = mongoose.model('comment',schema);
export default model;
