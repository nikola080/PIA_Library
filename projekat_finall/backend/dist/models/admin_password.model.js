"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AdminPassword = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    password: {
        type: String
    },
    days: {
        type: Number
    }
}, { versionKey: false });
module.exports = mongoose_1.default.model('AdminPassword', AdminPassword, 'admin_password');
//# sourceMappingURL=admin_password.model.js.map