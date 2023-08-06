"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/projekat");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('Uspesna konekcija');
});
require('./models/user.model');
const router = express_1.default.Router();
const userRouter = require('./routes/user.route');
router.use('/', userRouter);
app.use('', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map