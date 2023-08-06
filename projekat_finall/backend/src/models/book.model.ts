
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Book = new Schema({
    _id : {
        type : Schema.Types.ObjectId
    },
    name : {
        type : String
    },
    authors : {
        type : Array
    },
    genre : {
        type : String
    },
    publisher : {
        type : String
    },
    publishingYear : {
        type : Number
    },
    language : {
        type : String
    },
    picture : {
        type : String
    },
    amount : {
        type : Number
    },
    active : {
        type : String
    },
    whoRequested : {
        type : Schema.Types.ObjectId
    }
    
},{ versionKey: false })

module.exports = mongoose.model('Book', Book, 'book');