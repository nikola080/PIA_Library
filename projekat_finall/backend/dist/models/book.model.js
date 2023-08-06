"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Book = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String
    },
    authors: {
        type: Array
    },
    genre: {
        type: String
    },
    publisher: {
        type: String
    },
    publishingYear: {
        type: Number
    },
    language: {
        type: String
    },
    picture: {
        type: String
    },
    amount: {
        type: Number
    },
    active: {
        type: String
    },
    whoRequested: {
        type: Schema.Types.ObjectId
    }
}, { versionKey: false });
module.exports = mongoose_1.default.model('Book', Book, 'book');
//# sourceMappingURL=book.model.js.map