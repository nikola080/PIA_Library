import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../models/book.model';
import { UserModel } from '../models/user.model';
import { CheckInputsService } from '../service/check-inputs.service';
import { MainService } from '../service/main.service';
@Component({
  selector: 'app-book-attributes',
  templateUrl: './book-attributes.component.html',
  styleUrls: ['./book-attributes.component.css']
})
export class BookAttributesComponent implements OnInit {

  constructor(private router : Router,private mainService : MainService, private checkService : CheckInputsService) { }

  user : UserModel = null
  book : BookModel = null
  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem('user'))
    this.book = JSON.parse(localStorage.getItem('book'))
    if(this.user == null || this.book == null || this.user.type !== 'moderator') this.router.navigate(['pagenotfound'])

    this.placeholders[0] = 'Current name : ' + this.book.name
    this.placeholders[1] = 'Current authors : ' + this.book.authors
    this.placeholders[2] = 'Current genre : ' + this.book.genre
    this.placeholders[3] = 'Current publisher : ' + this.book.publisher
    this.placeholders[4] = 'Current publishing year : ' + this.book.publishingYear
    this.placeholders[5] = 'Current language : ' + this.book.language
    this.placeholders[6] = 'Current amount : ' + this.book.amount

  }

  addName : string = ''
  addAuthors : string = ''
  addGenre : string = ''
  addPublisher : string = ''
  addPublishingYear : number = null
  addLanguage : string = ''
  addPicture : File = null
  addAmount : number = null


  placeholders : string[] = []
  formOpened : boolean[] = [false,false,false,false,false,false,false,false]
  formSubmited : boolean[] = [false,false,false,false,false,false,false,false]
  wrongInput : string[] = ['','','','','','','']

  toFirstPage(){
    let type = this.user.type
    switch(type){
      case 'reader' : this.router.navigate(['reader']); break;
      case 'moderator' : this.router.navigate(['moderator']); break;
      case 'admin' : this.router.navigate(['admin']); break;
    }
  }
  bookPictureImage(event){
    this.addPicture = event.target.files[0]
  }

 

  addNewBook(what){
   
    if(what === 'name'  && !this.checkService.checkBookName(this.addName) ) {
      this.wrongInput[0] = 'Book name must be consisted of only aplhabetic characters!'
    }
    else this.wrongInput[0] = this.wrongInput[0]
    if(what === 'authors'  && !this.checkService.checkAuthors(this.addAuthors) ) {
      this.wrongInput[1] = 'Authors must be consisted of only aplhabetic characters, first name and last name must be spearated by blank space, authors must be separated by ,!'
    }
    else this.wrongInput[1] = this.wrongInput[1]
    if(what === 'genre'  && !this.checkService.checkGenre(this.addGenre) ) {
      this.wrongInput[2] = 'Genre must be consisted of only aplhabetic characters!'
    }
    else this.wrongInput[2] = this.wrongInput[2]

    if(what === 'publisher'  && !this.checkService.checkPublisher(this.addPublisher) ) {
      this.wrongInput[3] = 'Publisher must be consisted of only aplhanumberic characters!'
    }
    else this.wrongInput[3] = this.wrongInput[3]
    if(what === 'publishingYear'  && !this.checkService.checkYearOfPublishing(this.addPublishingYear) ) {
      this.wrongInput[4] = 'Cannot be lower than 0!'
    }
    else this.wrongInput[4] = this.wrongInput[4]
    if(what === 'language'  && !this.checkService.checkLanguage(this.addLanguage) ) {
      this.wrongInput[5] = 'Language must begin with capital alphabetic character e.g. (English, German...)!'
    }
    else this.wrongInput[5] = this.wrongInput[5]
    if(what === 'amount'  && !this.checkService.checkNumberOfCopies(this.addAmount) ) {
      this.wrongInput[6] = 'Amount cannot be lower than 0!'
    }
    else this.wrongInput[6] = this.wrongInput[6]
   

    let flag = false

    for(let i = 0; i < this.wrongInput.length; i++){
      if(this.wrongInput[i] != '') flag = true
    }

    if(!flag){
      let formData= new FormData()
      formData.append('tip', '3')
      formData.append('_id', this.book._id)
      formData.append('name', this.addName === '' ? null : this.addName)
      formData.append('authors', this.addAuthors === '' ? null : this.addAuthors )
      formData.append('genre', this.addGenre === '' ? null : this.addGenre )
      formData.append('publisher', this.addPublisher === '' ? null : this.addPublisher)
      formData.append('publishingYear',this.addPublishingYear == null ? null : this.addPublishingYear.toString())
      formData.append('language',  this.addLanguage === '' ? null : this.addLanguage)
      formData.append('bookPicture', this.addPicture)
      formData.append('amount', this.addAmount == null ? null :  this.addAmount.toString())
      formData.append('active','1')

      this.mainService.changeBookInputs(formData).subscribe( res  =>{
        if(res['message'] === '1') {
          this.book = res['book']
          localStorage.setItem('book',JSON.stringify(this.book))
          location.reload()
        }
        
      })

    }
    
  }

}
