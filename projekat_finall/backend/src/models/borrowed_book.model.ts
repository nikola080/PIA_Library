

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BorrowedBook = new Schema({
    _id : {
        type : Schema.Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId
    },
    book : {
        type : Schema.Types.ObjectId
    },
    dateBorrowed : {
        type : String
    },
    dateToReturn : {
        type : String
    },
    dateReturned : {
        type : String
    },
    active : {
        type : String
    },
    read : {
        type : String
    },
    retry : {
        type : String
    }
    
},{ versionKey: false })

module.exports = mongoose.model('BorrowedBook', BorrowedBook, 'borrowed_book');