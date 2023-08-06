"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const fs = require('fs');
let mongoosee = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets/');
    },
    filename: function (req, file, cb) {
        if (file) {
            let extension = "." + file.originalname.split(".")[1];
            let id;
            if (req.body.tip == '0') {
                id = mongoosee.Types.ObjectId();
                req.body.picture = 'profile_' + id + extension;
                req.body._id = id;
            }
            else if (req.body.tip == '-1') {
                req.body.picture = 'profile_' + req.body._id + extension;
            }
            else if (req.body.tip == '2') {
                id = mongoosee.Types.ObjectId();
                req.body.picture = 'book_' + id + extension;
                req.body._id = id;
            }
            else {
                req.body.picture = 'book_' + req.body._id + extension;
                req.body.picture;
            }
            cb(null, req.body.picture);
        }
    },
});
const upload = multer({ storage: storage });
const userRouter = express_1.default.Router();
userRouter.route('/checkUsernameUnique').post((req, res) => {
    new user_controller_1.UserController().checkUsernameUnique(req, res);
});
userRouter.route('/checkEmailUnique').post((req, res) => {
    new user_controller_1.UserController().checkEmailUnique(req, res);
});
userRouter.route('/register').post(upload.single('profilePicture'), (req, res, next) => {
    new user_controller_1.UserController().register(req, res);
});
userRouter.route('/checkPassword').post((req, res, next) => {
    new user_controller_1.UserController().checkPassword(req, res);
});
userRouter.route('/login').post((req, res) => {
    new user_controller_1.UserController().login(req, res);
});
userRouter.route('/getBookById').post((req, res) => {
    new user_controller_1.UserController().getBookById(req, res);
});
userRouter.route('/getRandomBook').post((req, res) => {
    new user_controller_1.UserController().getRandomBook(req, res);
});
userRouter.route('/changeInputs').post(upload.single('profilePicture'), (req, res) => {
    new user_controller_1.UserController().changeInputs(req, res);
});
userRouter.route('/searchBooks').post((req, res) => {
    new user_controller_1.UserController().searchBooks(req, res);
});
userRouter.route('/getGenres').post((req, res) => {
    new user_controller_1.UserController().getGenres(req, res);
});
userRouter.route('/requestBook').post(upload.single('bookPicture'), (req, res) => {
    new user_controller_1.UserController().requestBook(req, res);
});
userRouter.route('/commentBook').post((req, res) => {
    new user_controller_1.UserController().commentBook(req, res);
});
userRouter.route('/rateBook').post((req, res) => {
    new user_controller_1.UserController().rateBook(req, res);
});
userRouter.route('/getRatingsAndCommentsFromBook').post((req, res) => {
    new user_controller_1.UserController().getRatingsAndCommentsFromBook(req, res);
});
userRouter.route('/getAverageRating').post((req, res) => {
    new user_controller_1.UserController().getAverageRating(req, res);
});
userRouter.route('/borrowBook').post((req, res) => {
    new user_controller_1.UserController().borrowBook(req, res);
});
userRouter.route('/reserveBook').post((req, res) => {
    new user_controller_1.UserController().reserveBook(req, res);
});
userRouter.route('/returnBook').post((req, res) => {
    new user_controller_1.UserController().returnBook(req, res);
});
userRouter.route('/checkIfBorrowed').post((req, res) => {
    new user_controller_1.UserController().checkIfBorrowed(req, res);
});
userRouter.route('/checkIfReserved').post((req, res) => {
    new user_controller_1.UserController().checkIfReserved(req, res);
});
userRouter.route('/getBorrowedBooks').post((req, res) => {
    new user_controller_1.UserController().getBorrowedBooks(req, res);
});
userRouter.route('/getHistoryBorrowed').post((req, res) => {
    new user_controller_1.UserController().getHistoryBorrowed(req, res);
});
userRouter.route('/addNewBook').post(upload.single('bookPicture'), (req, res) => {
    new user_controller_1.UserController().addNewBook(req, res);
});
userRouter.route('/changeBookInputs').post(upload.single('bookPicture'), (req, res) => {
    new user_controller_1.UserController().changeBookInputs(req, res);
});
userRouter.route('/extendBorrowed').post((req, res) => {
    new user_controller_1.UserController().extendBorrowed(req, res);
});
userRouter.route('/getRequestedBooks').post((req, res) => {
    new user_controller_1.UserController().getRequestedBooks(req, res);
});
userRouter.route('/acceptBook').post((req, res) => {
    new user_controller_1.UserController().acceptBook(req, res);
});
userRouter.route('/rejectBook').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs.unlinkSync('../frontend/src/assets/' + req.body.picture);
    new user_controller_1.UserController().rejectBook(req, res);
}));
userRouter.route('/getNotifications').post((req, res) => {
    new user_controller_1.UserController().getNotifications(req, res);
});
userRouter.route('/getThreeMostPopularBooks').post((req, res) => {
    new user_controller_1.UserController().getThreeMostPopularBooks(req, res);
});
userRouter.route('/checkIfAdminPassword').post((req, res) => {
    new user_controller_1.UserController().checkIfAdminPassword(req, res);
});
userRouter.route('/getUsersCanDelete').post((req, res) => {
    new user_controller_1.UserController().getUsersCanDelete(req, res);
});
userRouter.route('/getBooksCanDelete').post((req, res) => {
    new user_controller_1.UserController().getBooksCanDelete(req, res);
});
userRouter.route('/deleteUser').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs.unlinkSync('../frontend/src/assets/' + req.body.picture);
    new user_controller_1.UserController().deleteUser(req, res);
}));
userRouter.route('/deleteBook').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs.unlinkSync('../frontend/src/assets/' + req.body.picture);
    new user_controller_1.UserController().deleteBook(req, res);
}));
userRouter.route('/getRequestedUsers').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new user_controller_1.UserController().getRequestedUsers(req, res);
}));
userRouter.route('/acceptUser').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new user_controller_1.UserController().acceptUser(req, res);
}));
userRouter.route('/getAllUsers').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new user_controller_1.UserController().getAllUsers(req, res);
}));
userRouter.route('/changeType').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new user_controller_1.UserController().changeType(req, res);
}));
userRouter.route('/changeNumberOfDays').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new user_controller_1.UserController().changeNumberOfDays(req, res);
}));
userRouter.route('/block').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new user_controller_1.UserController().block(req, res);
}));
module.exports = userRouter;
//# sourceMappingURL=user.route.js.map