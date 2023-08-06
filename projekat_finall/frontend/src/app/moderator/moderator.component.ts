import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../models/book.model';
import { UserModel } from '../models/user.model';
import { CheckInputsService } from '../service/check-inputs.service';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  constructor(private router : Router,private mainService : MainService, private checkService : CheckInputsService) { }

  user : UserModel = null
  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem('user'))

    if(this.user == null || this.user.type !== 'moderator') this.router.navigate(['pagenotfound'])

    this.getRequestedBooks()

  }

  formOpenAddNewBook : boolean = false


  addName : string = ''
  addAuthors : string = ''
  addGenre : string = ''
  addPublisher : string = ''
  addPublishingYear : number = null
  addLanguage : string = ''
  addPicture : File = null
  addAmount : number = null

  formSubmited : boolean = false

  wrongInput : string[] = ['','','','','','','','']


  bookPictureImage(event){
    this.addPicture = event.target.files[0]
  }

  resetBookInputs(){
    this.formSubmited = false
    this.wrongInput = ['','','','','','']
  }

  addNewBook(){
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
    if(!this.checkService.checkNumberOfCopies(this.addAmount) ) {
      this.wrongInput[6] = 'Amount cannot be lower than 0!'
    }
    else this.wrongInput[6] = ''

   

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
      formData.append('amount', this.addAmount.toString())
      this.mainService.addNewBook(formData).subscribe( res  =>{
        console.log(res['message'])
        location.reload()
      })

    }
    
  }

  requestedBooks : BookModel[]
  whoAsked : string[]
  getRequestedBooks() {
    this.mainService.getRequestedBooks().subscribe( res => {
      if(res['message'] == '1') {
        this.requestedBooks = res['books']
        this.whoAsked = res['users']

      }
    })

  }

  acceptRequest(id){
    this.mainService.acceptBook({'_id' : id}).subscribe(res=>{
      if(res['message'] === '1') location.reload()
    })
  }

  rejectBook(id,picture){
    this.mainService.rejectBook({'_id' : id,'picture' : picture}).subscribe(res=>{
      if(res['message'] === '1') location.reload()
    })
  }
}


