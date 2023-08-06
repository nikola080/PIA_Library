import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../models/book.model';
import { CommentsAndRatingsModel } from '../models/commentsandratings.model';
import { UserModel } from '../models/user.model';
import { CheckInputsService } from '../service/check-inputs.service';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
 
 
  constructor(private mainService : MainService, private router : Router,private checkService : CheckInputsService) { 

    if(localStorage.getItem('book') == null || localStorage.getItem('user') == null) {
      this.router.navigate(['pagenotfound'])
    }
    else{
      this.myBook = JSON.parse(localStorage.getItem('book'));
      this.myBookUrl = '/assets/' + this.myBook.picture
      this.user = JSON.parse(localStorage.getItem('user'))
      this.userPictureUrl = '/assets/' + this.user.picture
      
      this.getCommentsAndRatings()

    }

    
   
  }
  borrowedMoreThanThree : boolean = false
  expiredReturn : boolean = false
  returned : boolean = false
  borrowed : boolean = false
  reserved : boolean = false
  
  myBookAvgRating : number = 0
  commentEdited : string = ''
  wantToEdit : boolean = false
  commentsAndRatings : CommentsAndRatingsModel[] = null
  user : UserModel
  userPictureUrl : string = ''
  currentRate : number = 0
  averageRating : number = 0
  myBook : BookModel
  myBookUrl : string
  emptyComment : boolean = false
  emptyCommentEdited : boolean = false
  commentTwice : boolean = false
  comment : string = ''
  noCommentsFound : boolean = false


  toFirstPage(){
    let type = this.user.type
    switch(type){
      case 'reader' : this.router.navigate(['reader']); break;
      case 'moderator' : this.router.navigate(['moderator']); break;
      case 'admin' : this.router.navigate(['admin']); break;
    }
  }

  logout(){
    localStorage.removeItem('user')
    this.router.navigate(['guest'])

  }

  checkIfBorrowed(){
    let data = {
      'user' : this.user._id,
      'book' : this.myBook._id
    }
    this.mainService.checkIfBorrowed(data).subscribe( res =>{
      if(res['message'] == '1') this.borrowed = true
      else this.borrowed = false
    })
  }

  checkIfReserved(){
    let data = {
      'user' : this.user._id,
      'book' : this.myBook._id
    }
    this.mainService.checkIfReserved(data).subscribe( res =>{
      if(res['message'] == '1') this.reserved = true
      else this.reserved = false
    })
  }

  checkIfReturned(){
    let data = {
      'user' : this.user._id,
      'book' : this.myBook._id,
      'read' : '1'
    }
    this.mainService.checkIfBorrowed(data).subscribe( res =>{
      if(res['message'] == '1') this.returned = true
      else this.returned = false
    })
  }


  borrowBook(){
    let data = {
      'user' : this.user._id,
      'book' : this.myBook._id,
    }

    this.mainService.borrowBook(data).subscribe(res => {
      if(res['message'] === '1') {
        console.log('book has been borrowed')

        this.myBook.amount--

        localStorage.setItem('book',JSON.stringify(this.myBook))
        location.reload()
      }
      else if(res['message'] == '-1'){

        this.borrowedMoreThanThree = true;
      }
      else if(res['message'] == '-2'){
        this.expiredReturn = true;
      }
    })
  }

  reserveBook(){
    let data = {
      'user' : this.user._id,
      'book' : this.myBook._id,
    }

    this.mainService.reserveBook(data).subscribe(res => {
      if(res['message'] === '1') {
        console.log('book has been reserved')
        location.reload()
      }
      else if(res['message'] === '-1'){
        this.borrowedMoreThanThree = true
      }  else if(res['message'] === '-2'){
        this.expiredReturn = true
      }  
    })
  }

  returnBook(){
    let data = {
      'user' : this.user._id,
      'book' : this.myBook._id,
    }

    this.mainService.returnBook(data).subscribe(res => {
      if(res['message'] === '1' || res['message'] === '2' ) {
        console.log('book has been returned')
        res['message'] === '1'?this.myBook.amount++:1

        localStorage.setItem('book',JSON.stringify(this.myBook))
        location.reload()
      }
    })
  }

  users = []

  getCommentsAndRatings(){
    
    this.mainService.getRatingsAndCommentsFromBook({'book' : this.myBook._id}).subscribe( res => {
      if(res['message'] == 1){
        this.noCommentsFound = false
        this.commentsAndRatings = res['results']
        let userss = res['users']


        for(let i = 0; i < this.commentsAndRatings.length; i++){
          this.commentsAndRatings[i].date = new Date(new Date(parseInt( (this.commentsAndRatings[i].date).toString() )))
        }
        this.commentsAndRatings.sort(
          (objA, objB) => Number(objB.date) - Number(objA.date),
        );

        this.users = []
        for(let i = 0; i < this.commentsAndRatings.length;i++){
          this.users.push('asd')
        }
        for(let i = 0; i < this.commentsAndRatings.length; i++) {

          for(let j = 0; j < userss.length; j++) {
            if(userss[j].id === this.commentsAndRatings[i].user){
              this.users[i] = userss[j]
              break
            }
          }
          
        }
        

      }
      else{
        this.noCommentsFound = true
      }

      this.mainService.getAverageRating({'books' : [this.myBook._id]}).subscribe( res =>{
        if(res['message'] == '1'){
          
          this.averageRating = res['books_ratings'][0].avgRating
        }

        let data = {
          'user' : this.user._id,
          'book' : this.myBook._id
        }
        this.mainService.checkIfBorrowed(data).subscribe( res =>{
          if(res['message'] == '1') this.borrowed = true
          else this.borrowed = false

          let data = {
            'user' : this.user._id,
            'book' : this.myBook._id
          }
          this.mainService.checkIfReserved(data).subscribe( res =>{
            if(res['message'] == '1') this.reserved = true
            else this.reserved = false

            let data = {
              'user' : this.user._id,
              'book' : this.myBook._id,
              'read' : '1'
            }
            this.mainService.checkIfBorrowed(data).subscribe( res =>{
              if(res['message'] == '1') this.returned = true
              else this.returned = false

              
              
            })

          })

        })
      })


      

    })
  }
  ngOnInit(): void {

  }

 

  submitComment(){
    if(this.comment == '') {
      this.emptyComment = true
      this.commentTwice = false
    }
    else{
      this.emptyComment = false
      let data = {
        'user' : this.user._id,
        'book' : this.myBook._id,
        'comment' : this.comment,
        'wantToComment' : "1"
      }

      this.mainService.commentBook(data).subscribe( res => {
        if(res['message'] == 0) {
         this.commentTwice = true;
        }
        else{
          this.commentTwice = false;
          this.getCommentsAndRatings()
          this.getAvgRating()
        }
      })
    }
  }


  submitRating(){
    
    let data = {
      'user' : this.user._id,
      'book' : this.myBook._id,
      'rating' : this.currentRate
    }
    this.mainService.rateBook(data).subscribe( res => {
      if(res['message'] == 0) {
        console.log('error')
      }
      else {
        this.getAvgRating() 
        this.getCommentsAndRatings()
      }
    })
  }

  editComment(){
    if(this.commentEdited == '') {
      this.emptyCommentEdited = true
    }
    else{
      this.emptyCommentEdited = false
      let data = {
        'user' : this.user._id,
        'book' : this.myBook._id,
        'comment' : this.commentEdited
      }

      this.mainService.commentBook(data).subscribe( res => {
        if(res['message'] == 0) {
        }
        else{
          this.getAvgRating() 
          this.getCommentsAndRatings()
        }
      })
    }
  }

  getAvgRating(){
    this.mainService.getAverageRating({'books' : [this.myBook._id]}).subscribe( res =>{
      if(res['message'] == '1'){
        this.averageRating = res['books_ratings'][0].avgRating
      }
    })
  }

  goToChangeAttr(){
    
    if(this.user.type === 'moderator') this.router.navigate(['book_attr'])
  }
}
