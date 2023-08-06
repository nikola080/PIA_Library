"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ReservedBook = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId
    },
    book: {
        type: Schema.Types.ObjectId
    },
    date: {
        type: String
    }
}, { versionKey: false });
module.exports = mongoose_1.default.model('ReservedBook', ReservedBook, 'reserved_book');
//# sourceMappingURL=reserved_book.model.js.map