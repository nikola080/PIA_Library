import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../models/book.model';
import { UserModel } from '../models/user.model';
import { CheckInputsService } from '../service/check-inputs.service';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private mainService : MainService,private router : Router,private checkInputs : CheckInputsService) { 
    
  }


  books : BookModel[] = []
  booksInd : number = 0
  ngOnInit(): void {

    if(localStorage.getItem('user') != null) this.router.navigate(['pagenotfound'])
    else if(localStorage.getItem('admin') != null) this.router.navigate(['pagenotfound'])
    this.er_username = ''
    this.er_password = ''
    this.er_firstName = ''
    this.er_lastName = ''
    this.er_adress = ''
    this.er_phone = ''
    this.er_email = ''
    this.er_l_username = ''
    this.er_l_password = ''
    
    this.username = ''
    this.password = ''
    this.firstName = ''
    this.lastName = ''
    this.adress = ''
    this.phone = ''
    this.email = ''
    this.picture = null
    this.mainService.getThreeMostPopularBooks().subscribe(res => {
      if(res['message'] === '1'){ 
        if(typeof res['book1'] !== 'undefined' ) {this.books.push(res['book1']); this.booksInd++}
        if(typeof res['book2'] !== 'undefined' ) {this.books.push(res['book2']); this.booksInd++}
        if(typeof res['book3'] !== 'undefined' ) {this.books.push(res['book3']); this.booksInd++}
        
        console.log(res['book1'],res['book2'],res['book3'],)
      }

      this.mainService.getGenres().subscribe( res => {

        let books : BookModel[] = res['books']

        books.forEach(element => {
          this.genres.push(element._id)
        });
      })
    })
   
  }
  imageInd = 0
  nextSlide(){
    this.imageInd = (this.imageInd + 1) % this.booksInd
  }
  previousSlide(){
    this.imageInd = (this.imageInd + this.booksInd - 1) % 3
  }


  username : string 
  password : string 
  firstName : string 
  lastName : string
  adress : string 
  phone : string 
  email : string
  picture : File

  er_username : string
  er_password : string
  er_firstName : string
  er_lastName : string
  er_adress : string
  er_phone : string
  er_email : string

 
  checkUsername()  {
    
   let dataaa  = {'username' : this.username}
    this.mainService.checkUsernameUnique(dataaa).subscribe(res => {
      if(res['message'] == -1) {
        this.er_username = 'Wrong input!'
        
      }
      else{
        if(res['message'] == 0) {
          this.er_username = "Username is not unique!"
          
        }
        else 
        this.er_username = ''
      }

      if(this.username === '') {
        this.er_username = 'This field cannot be empty!'
      }
  
      this.er_password = this.checkInputs.checkPassword(this.password)
      
      let errNames = this.checkInputs.checkName(this.firstName,this.lastName).split('+')
      this.er_firstName = errNames[0] == ' '? errNames[0] = '': errNames[0]
      this.er_lastName = errNames[1] == ' '? errNames[1] = '': errNames[1]

      this.er_adress = this.checkInputs.checkAdress(this.adress)

      this.er_phone = this.checkInputs.checkNumber(this.phone)

      this.checkEmail()
    })
    
    
  }

  checkPassword() {
    let errorFlag = 0
    if(this.password.length < 8 || this.password.length > 12) {
      this.er_password = 'Password must be between 8 and 12 characters!'
      
    }
    else{
      let regExpr = /[a-zA-z].*/g;
      if(this.password.match(regExpr) == null){
        this.er_password = 'Password must contain alphabetic character!'
        
      }
      else{
        regExpr = /[A-Z]/g;
        if(this.password.match(regExpr) == null){
          this.er_password = 'Password must contain at least 1 capital character!'
          
        }
        else{
          regExpr = /[0-9]/g;
          if(this.password.match(regExpr) == null){
            this.er_password = 'Password must contain at least 1 numeric character!'
            
          }
          else{
            regExpr = /[^A-Za-z0-9]/g;
            if(this.password.match(regExpr) == null){
              this.er_password = 'Password must contain at least 1 special character!'
              
            }
            else this.er_password = ''
        }
        }
      }
    }
  }

  checkAdress() {
    let regex1 = /[a-zA-z]+[a-zA-z]+,.*/g
    let regex2 = /.*,[0-9]+,.*/g
    let regex3 = /.*,.*,[a-zA-z]+[a-zA-z]+/g
    if(this.adress.match(regex1) == null) {
      this.er_adress = 'Adress must fill pattern: street name,street number,city'
    }
    else{
      if(this.adress.match(regex2) == null) {
        this.er_adress = 'Adress must fill pattern: street name,street number,city'
      }
      else{
        if(this.adress.match(regex3) == null) {
          this.er_adress = 'Adress must fill pattern: street name,street number,city'
        }
        else this.er_adress = ''
      }
    }
    
  }

  checkName() {
    if(this.firstName === '') this.er_firstName = 'This field cannot be empty!'
    else this.er_firstName = ''
    if(this.lastName === '') this.er_lastName = 'This field cannot be empty!'
    else this.er_lastName = ''
  }

  checkNumber() {

    if(this.phone.length === 0) {
      this.er_phone = 'This field cannot be empty!'
    }
    else{
      let regex = /[0-9].*/g
      if(this.phone.match(regex) == null) {
        this.er_phone = 'Phone number must only numberic characters!'
      }
      else{
      regex = /\+[0-9]{1,3}\s[0-9]+/g
        if(this.phone.match(regex) == null) {
          this.er_phone = 'Phone number must begin with country code, then blank character and than phone number!'
        }
        else this.er_phone = ''
      }
    }

    
  }

  checkEmail() {

    if(this.email.length == 0) {
      this.er_email = 'This field cannot be empty!'
      return
    }
    this.mainService.checkEmailUnique(this.email).subscribe(res => {
      if(res['message'] == -1) {
        this.er_email = 'Wrong input!'
        return
      }
      else{
        if(res['message'] == 0) {
          this.er_email = "Email is not unique!"
          return
        }
        else this.er_email = ''
      }

      
    if(this.noError()){

      let formData : FormData = new FormData()
      formData.append('tip','0')
      formData.append('username',this.username)
      formData.append('password',this.password)
      formData.append('firstName',this.firstName)
      formData.append('lastName',this.lastName)
      formData.append('adress',this.adress)
      formData.append('phone',this.phone)
      formData.append('email',this.email)
      
      if(this.picture != null){
        formData.append('profilePicture',this.picture)
      }
      else {
        formData.append('profilePicture','defaultProfilePicture')
      }

      this.mainService.registerUser(formData).subscribe( res => {
        location.reload()
      } )
    }
    })
  }


  noError() : boolean {
    if(
      this.er_username.length == 0 &&
      this.er_password.length == 0 &&
      this.er_firstName.length == 0 &&
      this.er_lastName.length == 0 &&
      this.er_phone.length == 0 &&
      this.er_adress.length == 0 &&
      this.er_email.length == 0
    ) return true
    else return false
  }

  profilePictureImage(event){
    this.picture = event.target.files[0]
  }

 
  
  register() {
   
    this.checkUsername()
    
    
  }


  l_username : string
  l_password : string

  er_l_password : string
  er_l_username : string

  logIn() {
    let userData = {'username' : this.l_username}
    this.mainService.checkUsernameUnique(userData).subscribe( res => {
      if(res['message'] == -1) {
        this.er_l_username = 'Wrong input!'
        
      }
      else{
        if(res['message'] == 1) {
         
          this.er_l_username = "There is no user with that username!"
         
        }
        else {
          this.er_l_username = ''
        }
        
      }
      let pswData = {'username' : this.l_username,'password' : this.l_password}
      this.mainService.checkPassword(pswData).subscribe( res => {
        
        if(res['message'] == -1) {
          this.er_l_password = 'Wrong input!'
          
        }
        else{
          if(res['message'] == 1) {
          
            this.er_l_password = "Password is incorrect!"
          }
          else {

           
            let user : UserModel = res['user']
            localStorage.setItem('user',JSON.stringify(res['user']))
            this.er_l_password = ''

            if(user.type == 'reader') this.router.navigate(['reader'])
            else this.router.navigate(['moderator'])
            
            
          }
          
        }
        
      })
      
    })
  }

  byName : boolean = false
  byAuthor : boolean = false
  byGenre : boolean = false
  byYear : boolean = false
  byPublisher : boolean = false

  genres = []

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

}
