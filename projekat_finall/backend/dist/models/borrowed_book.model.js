"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BorrowedBook = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId
    },
    book: {
        type: Schema.Types.ObjectId
    },
    dateBorrowed: {
        type: String
    },
    dateToReturn: {
        type: String
    },
    dateReturned: {
        type: String
    },
    active: {
        type: String
    },
    read: {
        type: String
    },
    retry: {
        type: String
    }
}, { versionKey: false });
module.exports = mongoose_1.default.model('BorrowedBook', BorrowedBook, 'borrowed_book');
//# sourceMappingURL=borrowed_book.model.js.map