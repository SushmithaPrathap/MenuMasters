import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: 'The name field is required',
    },
    description:{
        type: String,
        required: 'The description field is required',
    },
    duration:{
        type: Number,
    },
    items:{
        type: Array
    },
    nutrition:{
        type: String
    },
    cuisine:{
        type: String
    },
    type: {
        type:String
    },
    image:{
        type: String,
    },
    comments:{
        type: Array
    },
    likes :{
        type: Array
    }

})

const model = mongoose.model('recipe',schema);
export default model;
