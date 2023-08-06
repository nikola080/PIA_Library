import express from 'express'
import { UserController } from '../controllers/user.controller'
const fs = require('fs')
let mongoosee = require('mongoose')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, '../frontend/src/assets/') 
    },
    filename : function(req,file,cb){
        if(file)
        {let extension = "." + file.originalname.split(".")[1]
        let id
        if(req.body.tip == '0') {
            id = mongoosee.Types.ObjectId()
            req.body.picture = 'profile_' + id + extension
            req.body._id = id
        }
        else if(req.body.tip == '-1'){
            req.body.picture = 'profile_'+ req.body._id + extension
        }
        else if(req.body.tip == '2'){
            id = mongoosee.Types.ObjectId()
            req.body.picture = 'book_'  +  id + extension
            req.body._id = id
        }
        else{
            req.body.picture = 'book_'+ req.body._id + extension
            req.body.picture             
        }

        
        cb(null,req.body.picture)} 
        
        
    }, 

})
const upload = multer({storage: storage})
const userRouter = express.Router()



userRouter.route('/checkUsernameUnique').post( (req:express.Request, res:express.Response) => {
    
    new UserController().checkUsernameUnique(req,res)
})
userRouter.route('/checkEmailUnique').post( (req:express.Request, res:express.Response) => {
    
    new UserController().checkEmailUnique(req,res)
})

userRouter.route('/register').post( upload.single('profilePicture') ,(req, res, next) => {
    
    new UserController().register(req,res)
})

userRouter.route('/checkPassword').post( (req, res, next) => {
    
    new UserController().checkPassword(req,res)
})


userRouter.route('/login').post( (req:express.Request, res:express.Response) => {
    
    new UserController().login(req,res)
})

userRouter.route('/getBookById').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getBookById(req,res)
})


userRouter.route('/getRandomBook').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getRandomBook(req,res)
})

userRouter.route('/changeInputs').post( upload.single('profilePicture'), (req:express.Request, res:express.Response) => {
    
    new UserController().changeInputs(req,res)
})

userRouter.route('/searchBooks').post( (req:express.Request, res:express.Response) => {
    
    new UserController().searchBooks(req,res)
})

userRouter.route('/getGenres').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getGenres(req,res)
})

userRouter.route('/requestBook').post( upload.single('bookPicture'), (req:express.Request, res:express.Response) => {
    
    new UserController().requestBook(req,res)
})

userRouter.route('/commentBook').post( (req:express.Request, res:express.Response) => {
    
    new UserController().commentBook(req,res)
})

userRouter.route('/rateBook').post( (req:express.Request, res:express.Response) => {
    
    new UserController().rateBook(req,res)
})

userRouter.route('/getRatingsAndCommentsFromBook').post(  (req:express.Request, res:express.Response) => {
    
    new UserController().getRatingsAndCommentsFromBook(req,res)
})

userRouter.route('/getAverageRating').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getAverageRating(req,res)
})

userRouter.route('/borrowBook').post( (req:express.Request, res:express.Response) => {
    
    new UserController().borrowBook(req,res)
})

userRouter.route('/reserveBook').post( (req:express.Request, res:express.Response) => {
    
    new UserController().reserveBook(req,res)
})

userRouter.route('/returnBook').post( (req:express.Request, res:express.Response) => {
    
    new UserController().returnBook(req,res)
})

userRouter.route('/checkIfBorrowed').post( (req:express.Request, res:express.Response) => {
    
    new UserController().checkIfBorrowed(req,res)
})

userRouter.route('/checkIfReserved').post( (req:express.Request, res:express.Response) => {
    
    new UserController().checkIfReserved(req,res)
})

userRouter.route('/getBorrowedBooks').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getBorrowedBooks(req,res)
})

userRouter.route('/getHistoryBorrowed').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getHistoryBorrowed(req,res)
})


userRouter.route('/addNewBook').post( upload.single('bookPicture'), (req:express.Request, res:express.Response) => {
    
    new UserController().addNewBook(req,res)
})


userRouter.route('/changeBookInputs').post( upload.single('bookPicture'), (req:express.Request, res:express.Response) => {
    
    new UserController().changeBookInputs(req,res)
})

userRouter.route('/extendBorrowed').post( (req:express.Request, res:express.Response) => {
    
    new UserController().extendBorrowed(req,res)
})

userRouter.route('/getRequestedBooks').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getRequestedBooks(req,res)
})

userRouter.route('/acceptBook').post( (req:express.Request, res:express.Response) => {
    
    new UserController().acceptBook(req,res)
})

userRouter.route('/rejectBook').post( async (req:express.Request, res:express.Response) => {
    await fs.unlinkSync('../frontend/src/assets/' + req.body.picture)
    new UserController().rejectBook(req,res)
})

userRouter.route('/getNotifications').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getNotifications(req,res)
})

userRouter.route('/getThreeMostPopularBooks').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getThreeMostPopularBooks(req,res)
})

userRouter.route('/checkIfAdminPassword').post( (req:express.Request, res:express.Response) => {
    
    new UserController().checkIfAdminPassword(req,res)
})

userRouter.route('/getUsersCanDelete').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getUsersCanDelete(req,res)
})

userRouter.route('/getBooksCanDelete').post( (req:express.Request, res:express.Response) => {
    
    new UserController().getBooksCanDelete(req,res)
})

userRouter.route('/deleteUser').post( async (req:express.Request, res:express.Response) => {
    await fs.unlinkSync('../frontend/src/assets/' + req.body.picture)
    new UserController().deleteUser(req,res)
})

userRouter.route('/deleteBook').post( async (req:express.Request, res:express.Response) => {
    await fs.unlinkSync('../frontend/src/assets/' + req.body.picture)
    new UserController().deleteBook(req,res)
})

userRouter.route('/getRequestedUsers').post( async (req:express.Request, res:express.Response) => {
    new UserController().getRequestedUsers(req,res)
})

userRouter.route('/acceptUser').post( async (req:express.Request, res:express.Response) => {
    new UserController().acceptUser(req,res)
})

userRouter.route('/getAllUsers').post( async (req:express.Request, res:express.Response) => {
    new UserController().getAllUsers(req,res)
})

userRouter.route('/changeType').post( async (req:express.Request, res:express.Response) => {
    new UserController().changeType(req,res)
})

userRouter.route('/changeNumberOfDays').post( async (req:express.Request, res:express.Response) => {
    new UserController().changeNumberOfDays(req,res)
})

userRouter.route('/block').post( async (req:express.Request, res:express.Response) => {
    new UserController().block(req,res)
})





module.exports = userRouter