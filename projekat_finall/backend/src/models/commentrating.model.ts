

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentRating = new Schema({
    _id : {
        type : Schema.Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId
    },
    book : {
        type : Schema.Types.ObjectId
    },
    comment : {
        type : String
    },
    rating :  {
        type : Number
    },
    date : {
        type : String
    },
    edited : {
        type : String
    },

    
},{ versionKey: false })

module.exports = mongoose.model('CommentRating', CommentRating, 'commentrating');