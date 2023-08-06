"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const User = new Schema({
    _id: {
        type: Schema.Types.ObjectId
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
    type: {
        type: String
    },
    picture: {
        type: String
    },
    active: {
        type: String
    },
    blocked: {
        type: String
    }
}, { versionKey: false });
module.exports = mongoose_1.default.model('User', User, 'user');
//# sourceMappingURL=user.model.js.map