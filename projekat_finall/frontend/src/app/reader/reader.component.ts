
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BookModel } from '../models/book.model';
import { BorrowedBook } from '../models/borrowed_book.model';
import { UserModel } from '../models/user.model';
import { CheckInputsService } from '../service/check-inputs.service';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private mainService : MainService, private router : Router, private checkService : CheckInputsService) { }

  user : UserModel
  bookOfTheDay : BookModel = null
  bookOfTheDayUrl : SafeResourceUrl
  bookOfTheDayAvgRating : number = 0
  ime : string
  errorBorrowed = null
  ngOnInit(): void {

    if(localStorage.getItem('user') == null) {
      this.router.navigate(['pagenotfound'])
    }
    this.user = JSON.parse(localStorage.getItem('user'))

    if(this.user.type === 'moderator') this.router.navigate(['moderator'])

    this.mainService.getRandomBook().subscribe( res => {
      
      if(res['message'] == -1){
        this.bookOfTheDay = new BookModel()
        this.bookOfTheDay.picture = 'book_default.jpg'
        
      }
      else{
        this.bookOfTheDay = new BookModel()
        this.bookOfTheDay = res['book']
        this.ime = this.bookOfTheDay.name
      }
      this.bookOfTheDayUrl = '/assets/' + this.bookOfTheDay.picture
      this.mainService.getGenres().subscribe( res => {

        let books : BookModel[] = res['books']

        books.forEach(element => {
          this.genres.push(element._id)
        });
        let dat = {
          'books' : [this.bookOfTheDay._id]
        }
        this.mainService.getAverageRating(dat).subscribe( res => {
          if(res['message'] == '1'){
            this.bookOfTheDayAvgRating = res['books_ratings'][0].avgRating
          }
          
          this.getBorrowedBooks()

        })
      })
      
    })
    //this.getBorrowedBooks()
   
  }
  byName : boolean = false
  byAuthor : boolean = false
  byGenre : boolean = false
  byYear : boolean = false
  byPublisher : boolean = false

  genres = []

  navigateToProfileAttributes(){
    this.router.navigate(['attributes'])
  }
  getUserPicture(){
    return '/assets/' + this.user.picture
  }
  getAverageRating() {
    return 0
  }

  toFirstPage(){
    location.reload()
  }

  logOut(){
    localStorage.removeItem('user')
    this.router.navigate(['guest'])
  }

  s_name : string = ''
  s_authors : string = ''
  s_genre : string = ''
  s_publihser : string = ''
  s_year_from : number
  s_year_to : number

  searchedBooks : BookModel[] = null 
  searchedFlag = false
  searchBooks(){
    this.searchedFlag = true
    let authrs = this.s_authors.split(",")

    let data = {
      'name' : this.s_name === "" ? undefined : this.s_name,
      'authors' : authrs[0] === "" ? undefined : this.s_authors,
      'genre' : this.s_genre === "" ? undefined : this.s_genre,
      'publishingYear1' : this.s_year_from, 
      'publishingYear2' : this.s_year_to,
      'publisher' : this.s_publihser === ""? undefined : this.s_publihser
    }
    this.mainService.searchBooks(data).subscribe( res =>{
     
      if(res['message'] != -1 && res['message'] != 0){
        this.searchedBooks = res['books']

        for(let i = 0; i < this.searchedBooks.length; i++){
          if( this.searchedBooks[i].picture == null)  this.searchedBooks[i].picture = 'book_default.jpg'
          
        }
       
      }
      else this.searchedBooks = null

      
    })
  }

  bookPictureImage(event){
    this.addPicture = event.target.files[0]
  }

  formOpenAddBook : boolean = false
  formSubmited : boolean = false

  addName : string = ''
  addAuthors : string = ''
  addGenre : string = ''
  addPublisher : string = ''
  addPublishingYear : number = null
  addLanguage : string = ''
  addPicture : File = null
  addAmount : number = null

  wrongInput : string[] = ['','','','','','']

  resetBookInputs(){
    this.formSubmited = false
    this.wrongInput = ['','','','','','']
  }

  addBook(){
    this.formSubmited = true
    if(!this.checkService.checkBookName(this.addName) ) {
      this.wrongInput[0] = 'Book name must be consisted of only aplhabetic characters!'
    }
    else this.wrongInput[0] = ''
    if(!this.checkService.checkAuthors(this.addAuthors) ) {
      this.wrongInput[1] = 'Authors must be consisted of only aplhabetic characters, first name and last name must be spearated by blank space, authors must be separated by ,!'
    }
    else this.wrongInput[1] = ''
    if(!this.checkService.checkGenre(this.addGenre) ) {
      this.wrongInput[2] = 'Genre must be consisted of only aplhabetic characters!'
    }
    else this.wrongInput[2] = ''

    if(!this.checkService.checkPublisher(this.addPublisher) ) {
      this.wrongInput[3] = 'Publisher must be consisted of only aplhanumberic characters!'
    }
    else this.wrongInput[3] = ''
    if(!this.checkService.checkYearOfPublishing(this.addPublishingYear) ) {
      this.wrongInput[4] = 'Cannot be lower than 0!'
    }
    else this.wrongInput[4] = ''
    if(!this.checkService.checkLanguage(this.addLanguage) ) {
      this.wrongInput[5] = 'Language must begin with capital alphabetic character e.g. (English, German...)!'
    }
    else this.wrongInput[5] = ''

   

    let flag = false

    for(let i = 0; i < this.wrongInput.length; i++){
      if(this.wrongInput[i] != '') flag = true
    }

    if(!flag){
      let formData= new FormData()

      formData.append('tip', '2')
      formData.append('name', this.addName)
      formData.append('authors', this.addAuthors)
      formData.append('genre', this.addGenre)
      formData.append('publisher', this.addPublisher)
      formData.append('publishingYear', this.addPublishingYear.toString())
      formData.append('language', this.addLanguage)
      formData.append('bookPicture', this.addPicture)
      formData.append('whoRequested',this.user._id)
      this.mainService.requestBook(formData).subscribe( res  =>{
        console.log(res['message'])
        location.reload()
      })

    }
    
  }

  navigateToBook(book : BookModel) {
    //this.router.navigate(['book'],{state :{'book' :JSON.stringify(book)}})

    if(this.user){
      localStorage.setItem('book',JSON.stringify(book))
      this.router.navigate(['book'])
    }
  }

  borrowedBooks : BookModel[] = null
  periodLeft : string[] = null
  passedDue : boolean[] = []
  borrowed_ids = []
  getBorrowedBooks(){
    let data = {
      'user' : this.user._id
    }

    this.mainService.getBorrowedBooks(data).subscribe( res =>{
      if(res['message'] == '0'){
        this.borrowedBooks = null
      }
      else if(res['message'] == '1'){
        this.borrowedBooks = res['books']
        if(this.errorBorrowed == null) {
          this.errorBorrowed = []
          this.borrowedBooks.forEach(element => {
            this.errorBorrowed.push('false')
          });
          
        }
        
        let left = res['toReturn']
        this.borrowed_ids = res['borrowed_ids']
        for(let i = 0; i < left.length; i++){

          let diff = Date.now() /*+ 30*24*60*60*1000*/ - parseInt(left[i])
          
          let a = Math.floor((diff<0?-diff:diff)/(1000*60*60*24)) //days
          let b =  Math.floor((diff<0?-diff:diff)/(1000*60*60)) //hours
          let c =  Math.floor((diff<0?-diff:diff)/(1000*60)) //minutes
          let d =  Math.floor((diff<0?-diff:diff)/(1000)) //seconds
          if(diff < 0){
           
            left[i] = 'Time left : ' + a + " days " + (b - a*24)  + ' hours ' 
            + (c - a*24*60 - (b - a*24)*60) + ' minutes ' + (d - a*24*60*60 - (b - a*24)*60*60 - (c - a*24*60 - (b - a*24)*60)*60) + ' seconds '
            this.passedDue[i] = false
          }
          else {
            left[i] = 'Time past deadline : ' + a + " days " + (b - a*24)  + ' hours ' 
          + (c - a*24*60 - (b - a*24)*60) + ' minutes ' + (d - a*24*60*60 - (b - a*24)*60*60 - (c - a*24*60 - (b - a*24)*60)*60) + ' seconds '
          this.passedDue[i] = true
          }
     
        
        }

        this.periodLeft = left

      }
      this.getNotifications()
    })
  }

  
  getHistoryBorrowed(){
    this.mainService.getHistoryBorrowed({'user' : this.user._id}).subscribe(res =>{
      if(res['message'] === '1') {
        localStorage.setItem('history', JSON.stringify(res['data']))
        this.router.navigate(['history'])
      }
     
    });

  }


  extendBook(id,ind){

    
    this.mainService.extendBorrowed({'_id' : id}).subscribe(res => {
      if(res['message'] === '1'){
        location.reload()
      }
      else{
        this.errorBorrowed[ind] = 'true'
      }
    })

  }

  inTowDays = []
  expired = []
  hasThree = false 
  gotReseved = []
  acceptedBooks = []

  
  getNotifications(){
   
    this.mainService.getNotifications({'_id' : this.user._id}).subscribe(res=>{
      this.inTowDays = res['inTwoDays']
      this.expired = res['expired']
      this.hasThree = res['hasThree'] 
      this.gotReseved = res['gotReseved']
      this.acceptedBooks = res['acceptedBooks']
      
    })
  }

}
