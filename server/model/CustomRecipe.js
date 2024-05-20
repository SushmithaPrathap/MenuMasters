import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    userId:{
        type: String
    },
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
    }
})

const model = mongoose.model('CustomRecipe',schema);
export default model;
