

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    _id : {
        type : Schema.Types.ObjectId
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    adress: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    type : {
        type : String
    },
    picture: {
        type: String
    },
    active : {
        type : String
    },
    blocked : {
        type : String
    }
    
},{ versionKey: false })

module.exports = mongoose.model('User', User, 'user');