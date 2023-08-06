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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
let mongoosee = require('mongoose');
const User = require('../models/user.model');
const Book = require('../models/book.model');
const CommentRating = require('../models/commentrating.model');
const BorrowedBook = require('../models/borrowed_book.model');
const ReservedBook = require('../models/reserved_book.model');
const AdminPassword = require('../models/admin_password.model');
class UserController {
    constructor() {
        this.checkPassword = (req, res) => {
            let password = req.body.password;
            let username = req.body.username;
            if (typeof req.body.isAdmin === 'undefined') {
                User.findOne({ 'username': username, 'password': password, 'active': '1', 'type': { $ne: 'admin' } }, (err, user) => {
                    if (err)
                        res.json({ 'message': -1 });
                    else {
                        if (user) {
                            res.json({ 'message': 0, 'user': user });
                        }
                        else {
                            res.json({ 'message': 1 });
                        }
                    }
                });
            }
            else {
                User.findOne({ 'username': username, 'password': password, 'type': 'admin', 'active': '1' }, (err, user) => {
                    if (err)
                        res.json({ 'message': -1 });
                    else {
                        if (user) {
                            res.json({ 'message': 0, 'user': user });
                        }
                        else {
                            res.json({ 'message': 1 });
                        }
                    }
                });
            }
        };
        this.checkEmailUnique = (req, res) => {
            let email = req.body.email;
            User.findOne({ 'email': email }, (err, user) => {
                if (err)
                    res.json({ 'message': -1 });
                else {
                    if (user) {
                        res.json({ 'message': 0 });
                    }
                    else {
                        res.json({ 'message': 1 });
                    }
                }
            });
        };
        this.checkUsernameUnique = (req, res) => {
            let username = req.body.username;
            if (typeof req.body.isAdmin === 'undefined') {
                User.findOne({ 'username': username }, (err, user) => {
                    if (err)
                        res.json({ 'message': -1 });
                    else {
                        if (user) {
                            res.json({ 'message': 0 });
                        }
                        else {
                            res.json({ 'message': 1 });
                        }
                    }
                });
            }
            else {
                User.findOne({ 'username': username, 'type': 'admin' }, (err, user) => {
                    if (err)
                        res.json({ 'message': -1 });
                    else {
                        if (user) {
                            res.json({ 'message': 0 });
                        }
                        else {
                            res.json({ 'message': 1 });
                        }
                    }
                });
            }
        };
        this.register = (req, res) => {
            User.collection.insertOne({
                '_id': mongoosee.Types.ObjectId(req.body._id),
                'username': req.body.username,
                'password': req.body.password,
                'firstName': req.body.firstName,
                'lastName': req.body.lastName,
                'adress': req.body.adress,
                'phone': req.body.phone,
                'email': req.body.email,
                'type': 'reader',
                'picture': typeof req.body.picture !== 'undefined' ? req.body.picture : 'profile_default.jpg',
                'active': '0',
                'blocked': '0'
            });
        };
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            User.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    res.json({ 'message': 'Wrong inputs!' });
                else {
                    if (user) {
                        res.json({ 'user': user });
                    }
                    else
                        res.json({ 'message': 'Wrong inputs!' });
                }
            });
        };
        this.getBookById = (req, res) => {
            Book.findOne({ '_id': req.body._id }, (err, book) => {
                if (err)
                    res.json({ 'message': '0!' });
                else {
                    if (book) {
                        res.json({ 'message': '1', 'book': book });
                    }
                    else
                        res.json({ 'message': '0' });
                }
            });
        };
        this.getRandomBook = (req, res) => {
            let cnt = 0;
            Book.countDocuments({ 'active': '1' }, (err, cntt) => {
                if (!err) {
                    cnt = cntt;
                    Book.find({ 'active': '1' }, (err, books) => {
                        if (err || books == null) {
                            res.json({ 'message': -1 });
                        }
                        else {
                            let rnd = Math.floor((Math.random() * cnt));
                            res.json({ 'message': 1, 'book': books[rnd] });
                        }
                    });
                }
                else {
                    res.json({ 'message': -1 });
                }
            });
        };
        this.changeInputs = (req, res) => {
            let which = req.body.which;
            let what;
            let username_ = req.body.username_;
            switch (which) {
                case 'username':
                    {
                        User.collection.updateOne({ 'username': username_ }, { $set: { 'username': req.body.username } }, (err, ress) => {
                            if (!err)
                                res.json({ 'message': 1, 'username': req.body.username });
                        });
                    }
                    ;
                    break;
                case 'password':
                    {
                        User.collection.updateOne({ 'username': username_ }, { $set: { 'password': req.body.password } }, (err, ress) => {
                            if (!err)
                                res.json({ 'message': 1 });
                        });
                    }
                    ;
                    break;
                case 'firstName':
                    {
                        User.collection.updateOne({ 'username': username_ }, { $set: { 'firstName': req.body.firstName } }, (err, ress) => {
                            if (!err)
                                res.json({ 'message': 1, 'firstName': req.body.firstName });
                        });
                    }
                    ;
                    break;
                case 'lastName':
                    {
                        User.collection.updateOne({ 'username': username_ }, { $set: { 'lastName': req.body.lastName } }, (err, ress) => {
                            if (!err)
                                res.json({ 'message': 1, 'lastName': req.body.lastName });
                        });
                    }
                    ;
                    break;
                case 'adress':
                    {
                        User.collection.updateOne({ 'username': username_ }, { $set: { 'adress': req.body.adress } }, (err, ress) => {
                            if (!err)
                                res.json({ 'message': 1, 'adress': req.body.adress });
                        });
                    }
                    ;
                    break;
                case 'phone':
                    {
                        User.collection.updateOne({ 'username': username_ }, { $set: { 'phone': req.body.phone } }, (err, ress) => {
                            if (!err)
                                res.json({ 'message': 1, 'phone': req.body.phone });
                        });
                    }
                    ;
                    break;
                case 'email':
                    {
                        User.collection.updateOne({ 'username': username_ }, { $set: { 'email': req.body.email } }, (err, ress) => {
                            if (!err)
                                res.json({ 'message': 1, 'email': req.body.email });
                        });
                    }
                    ;
                    break;
                case 'picture':
                    {
                        if (req.body.picture != null) {
                            User.collection.updateOne({ 'username': username_ }, {
                                $set: { 'picture': req.body.picture }
                            }, (err, ress) => {
                                if (!err)
                                    res.json({ 'message': 1, 'picture': typeof req.body.picture !== 'undefined' ? req.body.picture : 'profile_default.jpg' });
                            });
                        }
                    }
                    ;
                    break;
            }
        };
        this.getGenres = (req, res) => {
            Book.aggregate([
                { $match: { 'active': '1' } },
                { $group: {
                        _id: '$genre'
                    } }
            ], (err, books) => {
                if (!err) {
                    if (!books) {
                        res.json({ 'message': 0 });
                    }
                    else {
                        res.json({ 'message': 1, 'books': books });
                    }
                }
                else {
                    res.json({ 'message': -1 });
                }
            });
        };
        this.searchBooks = (req, res) => {
            let authors;
            let authorsRegex = '';
            let name;
            if (!(typeof req.body.name === 'undefined')) {
                name = '.*' + req.body.name + '.*';
            }
            else
                name = null;
            if (!(typeof req.body.authors === 'undefined')) {
                authors = req.body.authors.split(",");
                for (let i = 0; i < authors.length; i++) {
                    authorsRegex += ".*" + authors[i] + ".*";
                    if (i + 1 != authors.length)
                        authorsRegex += "|";
                }
            }
            else {
                authors = null;
                authorsRegex = '';
            }
            let genre;
            if (!(typeof req.body.genre === 'undefined')) {
                genre = req.body.genre;
            }
            else
                genre = null;
            let publishingYear1;
            if (!(typeof req.body.publishingYear1 === 'undefined')) {
                publishingYear1 = req.body.publishingYear1;
            }
            else
                publishingYear1 = null;
            let publishingYear2;
            if (!(typeof req.body.publishingYear2 === 'undefined')) {
                publishingYear2 = req.body.publishingYear2;
            }
            else
                publishingYear2 = null;
            let publisher;
            if (!(typeof req.body.publisher === 'undefined')) {
                publisher = '.*' + req.body.publisher + '.*';
            }
            else
                publisher = null;
            if (name == null && authorsRegex == '' && genre == null && publishingYear1 == null && publishingYear2 == null && publisher == null) {
                res.json({ 'message': 0 });
            }
            else {
                Book.find({ $and: [
                        { 'active': '1' },
                        name == null ? { 1: 1 } : { 'name': { $regex: name, $options: "i" } },
                        authorsRegex === '' ? { 1: 1 } : { 'authors': { $regex: authorsRegex, $options: "i" } },
                        genre == null ? { 1: 1 } : { 'genre': { $eq: genre } },
                        publishingYear1 == null ? { 1: 1 } : { 'publishingYear': { $gte: Number(publishingYear1) } },
                        publishingYear2 == null ? { 1: 1 } : { 'publishingYear': { $lte: Number(publishingYear2) } },
                        publisher == null ? { 1: 1 } : { 'publisher': { $regex: publisher, $options: "i" } }
                    ] }).then(books => {
                    if (books) {
                        res.json({
                            'message': 1,
                            'books': books
                        });
                    }
                    else {
                        res.json({ 'message': 0 });
                    }
                }).catch(err => {
                    //console.log(err)
                    res.json({ 'message': -1 });
                });
            }
        };
        this.requestBook = (req, res) => {
            Book.collection.insertOne({
                '_id': mongoosee.Types.ObjectId(req.body._id),
                'name': req.body.name,
                'authors': req.body.authors,
                'genre': req.body.genre,
                'publisher': req.body.publisher,
                'publishingYear': Number(req.body.publishingYear),
                'language': req.body.language,
                'picture': typeof req.body.picture !== 'undefined' ? req.body.picture : 'book_default.jpg',
                'amount': Number(0),
                'active': '0',
                'whoRequested': mongoosee.Types.ObjectId(req.body.whoRequested)
            }).then(ress => {
                if (ress)
                    res.json({ 'message': 'book has been inserted' });
            }).catch(err => console.log(err));
        };
        this.commentBook = (req, res) => {
            CommentRating.findOne({ 'user': mongoosee.Types.ObjectId(req.body.user), 'book': mongoosee.Types.ObjectId(req.body.book) }).then(found => {
                if (!found) {
                    CommentRating.collection.insertOne({
                        'user': mongoosee.Types.ObjectId(req.body.user),
                        'book': mongoosee.Types.ObjectId(req.body.book),
                        'comment': req.body.comment,
                        'rating': null,
                        'date': Date.now().toString(),
                        'edited': "0"
                    }).then(ress => {
                        if (ress)
                            res.json({ 'message': '1' });
                    }).catch(err => console.log(err));
                }
                else {
                    if (typeof req.body.wantToComment != 'undefined' && found.comment != null)
                        res.json({ 'message': '0' });
                    else if (typeof req.body.wantToComment != 'undefined' && found.comment == null) {
                        CommentRating.collection.updateOne({ 'user': mongoosee.Types.ObjectId(req.body.user), 'book': mongoosee.Types.ObjectId(req.body.book) }, {
                            $set: {
                                'comment': req.body.comment,
                                'date': Date.now().toString()
                            }
                        }).then(ress => {
                            if (ress)
                                res.json({ 'message': '1' });
                        }).catch(err => console.log(err));
                    }
                    else {
                        CommentRating.collection.updateOne({ 'user': mongoosee.Types.ObjectId(req.body.user), 'book': mongoosee.Types.ObjectId(req.body.book) }, {
                            $set: {
                                'comment': req.body.comment,
                                'date': Date.now().toString(),
                                'edited': "1"
                            }
                        }).then(ress => {
                            if (ress)
                                res.json({ 'message': '1' });
                        }).catch(err => console.log(err));
                    }
                }
            });
        };
        this.rateBook = (req, res) => {
            CommentRating.findOne({ 'user': mongoosee.Types.ObjectId(req.body.user), 'book': mongoosee.Types.ObjectId(req.body.book) }).then(found => {
                if (!found) {
                    CommentRating.collection.insertOne({
                        'user': mongoosee.Types.ObjectId(req.body.user),
                        'book': mongoosee.Types.ObjectId(req.body.book),
                        'comment': null,
                        'rating': Number(req.body.rating),
                        'date': Date.now().toString(),
                        'edited': "0"
                    }).then(ress => {
                        if (ress)
                            res.json({ 'message': '1' });
                    }).catch(err => console.log(err));
                }
                else {
                    CommentRating.collection.updateOne({ 'user': mongoosee.Types.ObjectId(req.body.user), 'book': mongoosee.Types.ObjectId(req.body.book) }, {
                        $set: {
                            'rating': Number(req.body.rating)
                        }
                    }).then(ress => {
                        if (ress)
                            res.json({ 'message': '1' });
                    }).catch(err => console.log(err));
                }
            });
        };
        this.getRatingsAndCommentsFromBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            CommentRating.find({ 'book': mongoosee.Types.ObjectId(req.body.book), 'comment': { $ne: null } }).then((found) => __awaiter(this, void 0, void 0, function* () {
                if (found.length != 0) {
                    let username;
                    let picture;
                    let id;
                    let data = [];
                    for (let i = 0; i < found.length; i++) {
                        yield User.findOne({ '_id': mongoosee.Types.ObjectId(found[i].user) }).then(result => { id = result._id, username = result.username; picture = result.picture; });
                        data.push({ 'id': id, 'username': username, 'picture': picture });
                    }
                    res.json({ 'message': 1, 'results': found, 'users': data });
                }
                else
                    res.json({ 'message': 0 });
            }));
        });
        this.getAverageRating = (req, res) => {
            CommentRating.aggregate([
                { $match: { 'book': { $in: req.body.books.map(s => mongoosee.Types.ObjectId(s)) } } },
                { $group: {
                        _id: '$book',
                        avgRating: { $avg: "$rating" }
                    } }
            ], (err, found) => {
                if (err) {
                    res.json({ 'message': '0' });
                    console.log(err);
                }
                else {
                    let niz = req.body.books;
                    for (let i = 0; i < niz.length; i++) {
                        let flag = false;
                        for (let j = 0; j < found.length; j++) {
                            if (found[j]._id === niz[i])
                                flag = true;
                        }
                        if (!flag)
                            found.push({ '_id': niz[i], 'avgRating': 0 });
                    }
                    res.json({ 'message': '1', 'books_ratings': found });
                }
            });
        };
        this.checkIfBorrowed = (req, res) => {
            let read = null;
            if (typeof req.body.read !== 'undefined')
                read = 1;
            BorrowedBook.findOne(read == null ? {
                'user': mongoosee.Types.ObjectId(req.body.user),
                'book': mongoosee.Types.ObjectId(req.body.book),
                'active': '1'
            } : {
                'user': mongoosee.Types.ObjectId(req.body.user),
                'book': mongoosee.Types.ObjectId(req.body.book),
                'active': '0'
            }).then(found => {
                if (found)
                    res.json({ 'message': '1' });
                else
                    res.json({ 'message': '0' });
            }).catch(err => { console.log(err); });
        };
        this.borrowBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let days;
            yield AdminPassword.find({}).then(result => {
                days = result[0].days;
            });
            BorrowedBook.find({ 'user': mongoosee.Types.ObjectId(req.body.user), 'active': '1' }).then(found => {
                let check = () => {
                    if (found)
                        found.forEach(element => {
                            if (parseInt(element.date) + 1000 * 60 * 60 * 24 * days > Date.now())
                                return true;
                        });
                    else
                        return false;
                };
                if (!found || found.length < 3) {
                    if (!check()) {
                        let sada = Date.now();
                        BorrowedBook.collection.insertOne({
                            'user': mongoosee.Types.ObjectId(req.body.user),
                            'book': mongoosee.Types.ObjectId(req.body.book),
                            'dateBorrowed': sada.toString(),
                            'dateToReturn': (sada + 1000 * 60 * 60 * 24 * days).toString(),
                            'dateReturned': null,
                            'active': "1",
                            'read': "1",
                            'retry': '0'
                        }).then(ress => {
                            Book.collection.updateOne({ '_id': mongoosee.Types.ObjectId(req.body.book) }, {
                                $inc: { 'amount': -1 }
                            }).then(resss => {
                                res.json({ 'message': "1" });
                            }).catch(err => { console.log(err); });
                        }).catch(err => { console.log(err); });
                    }
                    else
                        res.json({ 'message': "-2" });
                }
                else
                    res.json({ 'message': "-1" });
            });
        });
        this.checkIfReserved = (req, res) => {
            ReservedBook.findOne({
                'user': mongoosee.Types.ObjectId(req.body.user),
                'book': mongoosee.Types.ObjectId(req.body.book)
            }).then(found => {
                if (found)
                    res.json({ 'message': '1' });
                else
                    res.json({ 'message': '0' });
            }).catch(err => { console.log(err); });
        };
        this.reserveBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let checkThree = false;
            let checkExpired = false;
            let days;
            yield AdminPassword.find({}).then(found => {
                days = found[0].days;
            });
            yield BorrowedBook.find({ 'user': mongoosee.Types.ObjectId(req.body.user), 'active': '1' }).then(found => {
                if (found.length == 3)
                    checkThree = true;
                found.forEach(element => {
                    if (parseInt(element.date) + 1000 * 60 * 60 * 24 * days > Date.now()) {
                        checkExpired = true;
                    }
                });
            });
            if (!checkThree && !checkExpired) {
                ReservedBook.collection.insertOne({
                    'user': mongoosee.Types.ObjectId(req.body.user),
                    'book': mongoosee.Types.ObjectId(req.body.book),
                    'date': Date.now().toString()
                }).then(ress => {
                    res.json({ 'message': "1" });
                }).catch(err => { console.log(err); });
            }
            else {
                if (checkThree)
                    res.json({ 'message': '-1' });
                else if (checkExpired)
                    res.json({ 'message': '-2' });
            }
        });
        this.returnBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield BorrowedBook.collection.updateOne({
                'user': mongoosee.Types.ObjectId(req.body.user),
                'book': mongoosee.Types.ObjectId(req.body.book),
                'active': '1',
            }, {
                $set: { 'active': '0', 'dateReturned': Date.now().toString() }
            }).then((ress) => __awaiter(this, void 0, void 0, function* () {
                let book;
                yield Book.findOne({ '_id': mongoosee.Types.ObjectId(req.body.book) }).then(ress => book = ress);
                let days;
                yield AdminPassword.findOne({}).then(resf => days = resf.days);
                if (book.amount == 0) {
                    let reserved;
                    yield ReservedBook.find({ 'book': mongoosee.Types.ObjectId(req.body.book) }).sort({ 'date': 1 }).then(rets => reserved = rets).catch(err => console.log(err));
                    let sada = Date.now();
                    if (!(typeof reserved === 'undefined') && reserved.length != 0) {
                        yield BorrowedBook.collection.insertOne({
                            'user': mongoosee.Types.ObjectId(reserved[0].user),
                            'book': mongoosee.Types.ObjectId(reserved[0].book),
                            'dateBorrowed': sada.toString(),
                            'dateToReturn': (sada + 1000 * 60 * 60 * 24 * days).toString(),
                            'dateReturned': null,
                            'active': "1",
                            'read': "0",
                            'retry': '0'
                        }).catch(err => console.log(err));
                        yield ReservedBook.collection.deleteOne({ '_id': reserved[0]._id });
                        res.json({ 'message': "2" });
                    }
                    else {
                        Book.collection.updateOne({ '_id': mongoosee.Types.ObjectId(req.body.book) }, {
                            $inc: { 'amount': 1 }
                        });
                        res.json({ 'message': "1" });
                    }
                }
                else {
                    Book.collection.updateOne({ '_id': mongoosee.Types.ObjectId(req.body.book) }, {
                        $inc: { 'amount': 1 }
                    });
                    res.json({ 'message': "1" });
                }
            })).catch(err => { console.log(err); });
        });
        this.getBorrowedBooks = (req, res) => {
            BorrowedBook.find({
                'user': mongoosee.Types.ObjectId(req.body.user),
                'active': '1'
            }).then(found => {
                if (found.length == 0)
                    res.json({ 'message': 0 });
                else {
                    let niz = [];
                    let niz2 = [];
                    let niz3 = [];
                    for (let i = 0; i < found.length; i++) {
                        niz.push(found[i].book);
                        niz2.push(found[i].dateToReturn);
                        niz3.push(found[i]._id);
                    }
                    let boooks = [];
                    Book.find({ '_id': { $in: niz.map(s => mongoosee.Types.ObjectId(s)) } }).then(books => {
                        found.forEach(element1 => {
                            books.forEach(element2 => {
                                if (element1.book.toString() === element2._id.toString())
                                    return boooks.push(element2);
                            });
                        });
                        res.json({ 'message': '1', 'books': boooks, 'toReturn': niz2, 'borrowed_ids': niz3 });
                    });
                }
            }).catch(err => { console.log(err); });
        };
        this.getHistoryBorrowed = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let borrowed = null;
            yield BorrowedBook.find({ 'user': mongoosee.Types.ObjectId(req.body.user), 'active': '0' }).then(found => {
                if (found)
                    borrowed = found;
            });
            let borrowedBooks = [];
            if (borrowed) {
                borrowed.forEach(element => {
                    borrowedBooks.push(element.book.toString());
                });
                yield Book.find({ '_id': { $in: borrowedBooks.map(s => mongoosee.Types.ObjectId(s)) } }).then(foundBooks => {
                    let result = [];
                    borrowed.forEach(element => {
                        let j = 0;
                        let id;
                        for (let i = 0; i < foundBooks.length; i++) {
                            if (String(foundBooks[i]._id) === String(element.book)) {
                                id = String(foundBooks[i]._id);
                                break;
                            }
                            j++;
                        }
                        let data = {
                            "_id": id,
                            'name': foundBooks[j].name,
                            'authors': foundBooks[j].authors,
                            'dateBorrowed': element.dateBorrowed,
                            'dateReturned': element.dateReturned
                        };
                        result.push(data);
                    });
                    res.json({ 'message': '1', 'data': result });
                });
            }
            else
                res.json({ 'message': '0' });
        });
        this.addNewBook = (req, res) => {
            Book.collection.insertOne({
                '_id': new mongoosee.Types.ObjectId(),
                'name': req.body.name,
                'authors': req.body.authors,
                'genre': req.body.genre,
                'publisher': req.body.publisher,
                'publishingYear': Number(req.body.publishingYear),
                'language': req.body.language,
                'picture': req.body.picture,
                'amount': Number(req.body.amount),
                'active': '1',
                'whoRequested': null
            }).then(result => {
                if (result)
                    res.json({ 'message': '1' });
            }).catch(err => console.log(err));
        };
        this.changeBookInputs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let name = (req.body.name === 'null' ? null : req.body.name);
            let authors = (req.body.authors === 'null' ? null : req.body.authors);
            let genre = (req.body.genre === 'null' ? null : req.body.genre);
            let publisher = (req.body.publisher === 'null' ? null : req.body.publisher);
            let publishingYear = (req.body.publishingYear === 'null' ? null : req.body.publishingYear);
            let language = (req.body.language === 'null' ? null : req.body.language);
            let picture = (req.body.picture === 'null' ? null : req.body.picture);
            let amount = (req.body.amount === 'null' ? null : req.body.amount);
            let active = (req.body.active === 'null' ? null : req.body.active);
            let book;
            yield Book.findOne({ '_id': mongoosee.Types.ObjectId(req.body._id) }).then((result) => __awaiter(this, void 0, void 0, function* () {
                book = result;
                if (Number(book.amount) == 0) {
                    let reserved;
                    let days;
                    yield AdminPassword.find({}).then(result => {
                        days = result[0].days;
                    }).catch(err => console.log(err));
                    yield ReservedBook.find({ 'book': mongoosee.Types.ObjectId(req.body._id) }).sort({ 'date': 1 }).then(reser => reserved = reser).catch(err => console.log(err));
                    let temp = amount;
                    let i = 0;
                    while (temp != 0 && i < reserved.length) {
                        let sada = Date.now();
                        yield BorrowedBook.collection.insertOne({
                            'user': mongoosee.Types.ObjectId(reserved[i].user),
                            'book': mongoosee.Types.ObjectId(reserved[i].book),
                            'dateBorrowed': sada.toString(),
                            'dateToReturn': (sada + 1000 * 60 * 60 * 24 * days).toString(),
                            'dateReturned': null,
                            'active': "1",
                            'read': "0",
                            'retry': '0'
                        }).catch(err => console.log(err));
                        temp--;
                        yield ReservedBook.collection.deleteOne({ '_id': mongoosee.Types.ObjectId(reserved[i++]._id) }).catch(err => console.log(err));
                    }
                    amount = temp;
                }
                if (name)
                    (book.name = name);
                if (authors)
                    (book.authors = authors);
                if (genre)
                    (book.genre = genre);
                if (publisher)
                    (book.publisher = publisher);
                if (publishingYear)
                    (book.publishingYear = Number(publishingYear));
                if (language)
                    (book.language = language);
                if (picture)
                    (book.picture = (typeof req.body.picture !== 'undefined' ? req.body.picture : 'book_default.jpg'));
                if (amount)
                    (book.amount = Number(amount));
                if (active)
                    (book.active = active);
                book.save().then(ress => {
                    if (ress)
                        res.json({ 'message': '1', 'book': book });
                }).catch(err => console.log(err));
            }));
        });
        this.extendBorrowed = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let days;
            yield AdminPassword.findOne({}).then(result => {
                days = result.days;
            });
            let borrowed;
            yield BorrowedBook.findOne({ '_id': mongoosee.Types.ObjectId(req.body._id) }).then(result => {
                borrowed = result;
            });
            if (borrowed.retry === '0') {
                borrowed.dateToReturn = String((parseInt(borrowed.dateToReturn) + 1000 * 60 * 60 * 24 * days));
                borrowed.retry = '1';
                yield borrowed.save().catch(err => { res.json({ 'message': '0' }); console.log(err); });
                res.json({ 'message': '1' });
            }
            else {
                res.json({ 'message': '-1' });
            }
        });
        this.getRequestedBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            Book.find({ 'active': '0' }).then((ress) => __awaiter(this, void 0, void 0, function* () {
                if (ress) {
                    let users = [];
                    for (let i = 0; i < ress.length; i++) {
                        yield User.findOne({ '_id': mongoosee.Types.ObjectId(ress[i].whoRequested) }).then(resultt => users.push(resultt.username));
                    }
                    res.json({ 'message': '1', 'books': ress, 'users': users });
                }
                else
                    res.json({ 'message': '0' });
            }));
        });
        this.acceptBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let book;
            yield Book.findOne({ '_id': mongoosee.Types.ObjectId(req.body._id) }).then((ress) => __awaiter(this, void 0, void 0, function* () {
                if (ress) {
                    book = ress;
                }
                else
                    res.json({ 'message': '0' });
            }));
            book.active = '1';
            yield book.save().catch(err => console.log(err));
            res.json({ 'message': '1' });
        });
        this.rejectBook = (req, res) => {
            Book.collection.deleteOne({ '_id': mongoosee.Types.ObjectId(req.body._id) }).then((ress) => __awaiter(this, void 0, void 0, function* () {
                if (ress) {
                    res.json({ 'message': '1' });
                }
                else
                    res.json({ 'message': '0' });
            }));
        };
        this.getNotifications = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let inTwoDays = [];
            yield BorrowedBook.find({ 'user': mongoosee.Types.ObjectId(req.body._id), 'active': '1' }).then(//trazi one sto im istice rok u naredna dva dana
            (borrowed) => __awaiter(this, void 0, void 0, function* () {
                if (borrowed) {
                    for (let i = 0; i < borrowed.length; i++) {
                        let now = Date.now();
                        let when = parseInt(borrowed[i].dateToReturn);
                        let books = [];
                        if ((when > now) && ((when - now) / (1000 * 60 * 60 * 24)) < 2) {
                            books.push(borrowed[i].book);
                        }
                        yield Book.find({ '_id': { $in: books.map(s => mongoosee.Types.ObjectId(s)) } }).then(found => {
                            if (found) {
                                found.forEach(element => {
                                    inTwoDays.push(element);
                                });
                            }
                        });
                    }
                }
            }));
            let expired = [];
            yield BorrowedBook.find({ 'user': mongoosee.Types.ObjectId(req.body._id), 'active': '1' }).then(//trazi one sto im je istekao rok
            (borrowed) => __awaiter(this, void 0, void 0, function* () {
                if (borrowed) {
                    for (let i = 0; i < borrowed.length; i++) {
                        let now = Date.now();
                        let when = parseInt(borrowed[i].dateToReturn);
                        let books = [];
                        if ((when - now) < 0) {
                            books.push(borrowed[i].book);
                        }
                        yield Book.find({ '_id': { $in: books.map(s => mongoosee.Types.ObjectId(s)) } }).then(found => {
                            if (found) {
                                found.forEach(element => {
                                    expired.push(element);
                                });
                            }
                        });
                    }
                }
            }));
            let hasThree = false;
            yield BorrowedBook.find({ 'user': mongoosee.Types.ObjectId(req.body._id), 'active': '1' }).then(borrowed => {
                if (borrowed)
                    if (borrowed.length == 3)
                        hasThree = true;
            });
            let gotReseved = [];
            yield BorrowedBook.find({ 'user': mongoosee.Types.ObjectId(req.body._id), 'read': '0', 'active': '1' }).then((borrowed) => __awaiter(this, void 0, void 0, function* () {
                if (borrowed) {
                    let books = [];
                    for (let i = 0; i < borrowed.length; i++) {
                        books.push(borrowed[i].book);
                        borrowed[i].read = '1';
                        yield borrowed[i].save();
                    }
                    yield Book.find({ '_id': { $in: books.map(s => mongoosee.Types.ObjectId(s)) } }).then(found => {
                        if (found) {
                            found.forEach(element => {
                                gotReseved.push(element);
                            });
                        }
                    });
                }
            }));
            let acceptedBooks = [];
            yield Book.find({ 'whoRequested': mongoosee.Types.ObjectId(req.body._id) }).then(found => {
                if (found) {
                    acceptedBooks = found;
                }
            });
            res.json({
                'inTwoDays': inTwoDays,
                'expired': expired,
                'hasThree': hasThree,
                'gotReseved': gotReseved,
                'acceptedBooks': acceptedBooks
            });
        });
        this.getThreeMostPopularBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            BorrowedBook.aggregate([
                { $group: {
                        _id: '$book',
                        name: { '$first': '$book' },
                        count: { $sum: 1 }
                    } }
            ]).sort({ 'count': -1 }).then((found) => __awaiter(this, void 0, void 0, function* () {
                let data = [];
                let book1 = null;
                if (found.length > 0)
                    yield Book.findOne({ '_id': mongoosee.Types.ObjectId(found[0].name) }).then(ress => book1 = ress);
                let book2 = null;
                if (found.length > 1)
                    yield Book.findOne({ '_id': mongoosee.Types.ObjectId(found[1].name) }).then(ress => book2 = ress);
                let book3 = null;
                if (found.length > 2)
                    yield Book.findOne({ '_id': mongoosee.Types.ObjectId(found[2].name) }).then(ress => book3 = ress);
                //console.log(book1,book2,book3)
                if (book1 == null) {
                    res.json({ 'message': '1' });
                }
                else if (book2 == null) {
                    res.json({ 'message': '1', 'book1': book1 });
                }
                else if (book3 == null) {
                    res.json({ 'message': '1', 'book1': book1, 'book2': book2 });
                }
                else
                    res.json({ 'message': '1', 'book1': book1, 'book2': book2, 'book3': book3 });
            })).catch(err => {
                res.json({ 'message': '0' });
                console.log(err);
            });
        });
        this.checkIfAdminPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let password;
            yield AdminPassword.findOne({}).then(found => {
                password = found.password;
            });
            if (req.body.inserted === password)
                res.json({ 'message': '1' });
            else
                res.json({ 'message': '0' });
        });
        this.getUsersCanDelete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield User.find({ 'active': '1', 'type': { $ne: 'admin' } }).then((foundUsers) => __awaiter(this, void 0, void 0, function* () {
                let finalUsers = [];
                for (let i = 0; i < foundUsers.length; i++) {
                    yield BorrowedBook.find({ 'user': mongoosee.Types.ObjectId(foundUsers[i]._id), 'active': '1' }).then(foundBorrowings => {
                        //console.log(foundBorrowings)
                        if (foundBorrowings.length == 0)
                            finalUsers.push(foundUsers[i]);
                    });
                }
                res.json({ 'message': '1', 'users': finalUsers });
            }));
        });
        this.getBooksCanDelete = (req, res) => {
            Book.find({}).then((foundBooks) => __awaiter(this, void 0, void 0, function* () {
                let finalBooks = [];
                for (let i = 0; i < foundBooks.length; i++) {
                    yield BorrowedBook.find({ 'book': mongoosee.Types.ObjectId(foundBooks[i]._id), 'active': '1' }).then(foundBorrowings => {
                        if (foundBorrowings.length == 0)
                            finalBooks.push(foundBooks[i]);
                    });
                }
                res.json({ 'message': '1', 'books': finalBooks });
            }));
        };
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //provera da li ima rezervisanih knjiga i ako ima obrisi ih
            yield ReservedBook.find({ 'user': mongoosee.Types.ObjectId(req.body.id) }).then((foundReservations) => __awaiter(this, void 0, void 0, function* () {
                if (foundReservations.length != 0)
                    yield ReservedBook.collection.deleteMany({ 'user': mongoosee.Types.ObjectId(req.body.id) });
            })).catch(err => console.log(err));
            yield CommentRating.find({ 'user': mongoosee.Types.ObjectId(req.body.id) }).then((foundReservations) => __awaiter(this, void 0, void 0, function* () {
                if (foundReservations.length != 0)
                    yield CommentRating.collection.deleteMany({ 'user': mongoosee.Types.ObjectId(req.body.id) });
            })).catch(err => console.log(err));
            yield BorrowedBook.find({ 'user': mongoosee.Types.ObjectId(req.body.id) }).then((foundBorrowed) => __awaiter(this, void 0, void 0, function* () {
                if (foundBorrowed.length != 0)
                    yield BorrowedBook.collection.deleteMany({ 'user': mongoosee.Types.ObjectId(req.body.id) });
            })).catch(err => console.log(err));
            yield Book.find({ 'whoRequested': mongoosee.Types.ObjectId(req.body.id) }).then((foundBook) => __awaiter(this, void 0, void 0, function* () {
                if (foundBook.length != 0) {
                    for (let i = 0; i < foundBook.length; i++) {
                        yield Book.collection.updateOne({ "_id": mongoosee.Types.ObjectId(foundBook[i]._id) }, {
                            $set: { 'whoRequested': null }
                        });
                    }
                }
            })).catch(err => console.log(err));
            User.collection.deleteOne({ '_id': mongoosee.Types.ObjectId(req.body.id) }).then(result => {
                if (result)
                    res.json({ 'message': '1' });
                else
                    res.json({ 'message': '0' });
            }).catch(err => {
                console.log(err);
                res.json({ 'message': '-1' });
            }).catch(err => console.log(err));
        });
        this.deleteBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //provera da li ima rezervisanih knjiga i ako ima obrisi ih
            yield ReservedBook.find({ 'book': mongoosee.Types.ObjectId(req.body.id) }).then((foundReservations) => __awaiter(this, void 0, void 0, function* () {
                if (foundReservations.length != 0)
                    yield ReservedBook.collection.deleteMany({ 'book': mongoosee.Types.ObjectId(req.body.id) });
            })).catch(err => console.log(err));
            yield CommentRating.find({ 'book': mongoosee.Types.ObjectId(req.body.id) }).then((foundComments) => __awaiter(this, void 0, void 0, function* () {
                if (foundComments.length != 0)
                    yield CommentRating.collection.deleteMany({ 'book': mongoosee.Types.ObjectId(req.body.id) });
            })).catch(err => console.log(err));
            yield BorrowedBook.find({ 'book': mongoosee.Types.ObjectId(req.body.id) }).then((foundBorrowed) => __awaiter(this, void 0, void 0, function* () {
                if (foundBorrowed.length != 0)
                    yield BorrowedBook.collection.deleteMany({ 'book': mongoosee.Types.ObjectId(req.body.id) });
            })).catch(err => console.log(err));
            Book.collection.deleteOne({ '_id': mongoosee.Types.ObjectId(req.body.id) }).then(result => {
                if (result)
                    res.json({ 'message': '1' });
                else
                    res.json({ 'message': '0' });
            }).catch(err => {
                console.log(err);
                res.json({ 'message': '-1' });
            }).catch(err => console.log(err));
        });
        this.getRequestedUsers = (req, res) => {
            User.find({ 'active': '0' }).then(found => {
                res.json({ 'message': '1', 'req_users': found });
            }).catch(err => {
                res.json({ 'message': '0' });
                console.log(err);
            });
        };
        this.acceptUser = (req, res) => {
            User.collection.updateOne({ '_id': mongoosee.Types.ObjectId(req.body.id) }, { $set: { 'active': '1' } }).then(found => {
                res.json({ 'message': '1' });
            }).catch(err => {
                res.json({ 'message': '0' });
                console.log(err);
            });
        };
        this.getAllUsers = (req, res) => {
            User.find({ 'type': { $ne: 'admin' }, 'active': '1' }).then(found => res.json({ 'all_users': found }));
        };
        this.changeType = (req, res) => {
            if (req.body.type === '1') {
                User.collection.updateOne({ '_id': mongoosee.Types.ObjectId(req.body.id) }, {
                    $set: { 'type': 'moderator' }
                }).catch(err => console.log(err));
            }
            else if (req.body.type === '0') {
                User.collection.updateOne({ '_id': mongoosee.Types.ObjectId(req.body.id) }, {
                    $set: { 'type': 'reader' }
                }).catch(err => console.log(err));
                res.json({ 'message': '1' });
            }
            else
                res.json({ 'message': '0' });
        };
        this.changeNumberOfDays = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let prom;
            yield AdminPassword.find({}).then(found => prom = found[0]);
            prom.days = req.body.days;
            yield prom.save();
            res.json({ 'messsage': '1' });
        });
        this.block = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user;
            yield User.findOne({ '_id': mongoosee.Types.ObjectId(req.body.id) }).then(found => user = found);
            if (req.body.what === '1') {
                user.blocked = '1';
            }
            else if (req.body.what === '0') {
                user.blocked = '0';
            }
            yield user.save();
            res.json({ 'message': '1' });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map