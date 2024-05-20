import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type: String,
        required: 'The type field is required',
        
    },
    userId:{
        type: String
    },
    createdDate:{
        type:Date,
        default: Date.now
    }
},{versionKey: false})

//Create a model from the schema
const model = mongoose.model('groceryList',schema);

export default model;