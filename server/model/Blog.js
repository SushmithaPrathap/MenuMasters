import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: 'The name field is required',
        unique: true
    },
    desc: {
        type: String,
        required: 'The description field is required',
    },
    photo: {
        type: String,
        required: 'false',
    },
    username :{
        type: String,
        required: true
    },
},
 {timestamps : true}
);

const model = mongoose.model('blog',schema);
export default model;
