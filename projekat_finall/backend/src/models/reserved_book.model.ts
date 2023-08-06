

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReservedBook = new Schema({
    _id : {
        type : Schema.Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId
    },
    book : {
        type : Schema.Types.ObjectId
    },
    date : {
        type : String
    }
    
},{ versionKey: false })

module.exports = mongoose.model('ReservedBook', ReservedBook, 'reserved_book');