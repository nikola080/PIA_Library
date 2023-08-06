"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CommentRating = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId
    },
    book: {
        type: Schema.Types.ObjectId
    },
    comment: {
        type: String
    },
    rating: {
        type: Number
    },
    date: {
        type: String
    },
    edited: {
        type: String
    },
}, { versionKey: false });
module.exports = mongoose_1.default.model('CommentRating', CommentRating, 'commentrating');
//# sourceMappingURL=commentrating.model.js.map