import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    userId:{
        type: String,
        required: 'The user field is required',
    },
    recipes:{
        type: Array
    }
})

const model = mongoose.model('favRecipe',schema);
export default model;
