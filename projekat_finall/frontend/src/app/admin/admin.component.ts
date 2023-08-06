import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../models/book.model';
import { UserModel } from '../models/user.model';
import { CheckInputsService } from '../service/check-inputs.service';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  password : string
  constructor(private mainService : MainService,private router : Router,private route : ActivatedRoute,private checkService : CheckInputsService) { 
   
  }

  admin : UserModel = null
  books : BookModel[]
  users : UserModel[]
  req_users : UserModel[]
  all_users : UserModel[]
  usernameAdmin = ''
  passwordAdmin = ''
  err_usernameAdmin = ''
  err_passwordAdmin = ''
  formSubmited = false
  ngOnInit(): void {
    
    if(localStorage.getItem('admin')) this.admin = JSON.parse(localStorage.getItem('admin'))
    localStorage.removeItem('user')
    localStorage.removeItem('book')
    localStorage.removeItem('history')
    this.route.queryParams.subscribe(params => { 
      this.mainService.checkIfAdminPassword({'inserted' : params.password}).subscribe(res =>{
        if(res['message'] === '0') this.router.navigate(['pagenotfound'])
      })

      this.mainService.getBooksCanDelete().subscribe(res => {
        if(typeof res['books'] !== 'undefined'){
          this.books = res['books']
        }

        this.mainService.getUsersCanDelete().subscribe(res =>{
          if(typeof res['users'] !== 'undefined'){
            this.users = res['users']
          }
        
          this.mainService.getRequestedUsers().subscribe(res => {
            if(res['message'] === '1') this.req_users = res['req_users']

            this.mainService.getAllUsers().subscribe(res => {
              this.all_users = res['all_users']
            })
          })
        })
      })
  })  
    
   
  }

  logIn() {
    let data = {'username' : this.usernameAdmin,'isAdmin' :'1'}
    this.mainService.checkUsernameUnique(data).subscribe( res => {

      this.formSubmited = true
      if(res['message'] == -1) {
        this.err_usernameAdmin = 'Wrong input!'
        
      }
      else{
        if(res['message'] == 1) {
         
          this.err_usernameAdmin = "There is no user with that username!"
         
        }
        else {
          this.err_usernameAdmin = ''
        }
        
      }
  
      let dataa = {'username' : this.usernameAdmin, 'password' : this.passwordAdmin,'isAdmin' :'1'}
      this.mainService.checkPassword(dataa).subscribe( res => {
        
        if(res['message'] == -1) {
          this.err_passwordAdmin = 'Wrong input!'
          
        }
        else{
          if(res['message'] == 1) {
          
            this.err_passwordAdmin = "Password is incorrect!"
          }
          else {

           
            let user : UserModel = res['user']
            localStorage.setItem('admin',JSON.stringify(res['user']))
            this.err_passwordAdmin = ''
            
            this.admin =  res['user']
            
          }
          
        }
        
      })
      
    })
  }


  acceptUser(id){
    this.mainService.acceptUser({'id' : id}).subscribe( res =>{
      if(res['message'] === '1') location.reload()
    })
  }

  deleteUser(id,picture){
    console.log(picture)
    this.mainService.deleteUser({'id' : id, 'picture' : picture}).subscribe( res =>{
      if(res['message'] === '1') location.reload()
    })
  }

  deleteBook(id,picture){
    this.mainService.deleteBook({'id' : id, 'picture' : picture}).subscribe( res =>{
      if(res['message'] === '1') location.reload()
    })
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

  formSubmitedd : boolean = false

  wrongInput : string[] = ['','','','','','','','']


  bookPictureImage(event){
    this.addPicture = event.target.files[0]
  }

  resetBookInputs(){
    this.formSubmitedd = false
    this.wrongInput = ['','','','','','']
  }

  addNewBook(){
    this.formSubmitedd = true
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

  username : string = ''
  password_r : string = ''
  firstName : string = ''
  lastName : string = ''
  adress : string = ''
  phone : string = ''
  email : string = ''
  picture : File = null

  er_username : string = ''
  er_password : string = ''
  er_firstName : string = ''
  er_lastName : string = ''
  er_adress : string = ''
  er_phone : string = ''
  er_email : string = ''

  



  checkUsername()  {
    
    let data = {'username' : this.username}
    this.mainService.checkUsernameUnique(data).subscribe(res => {
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
  
      this.er_password = this.checkService.checkPassword(this.password_r)
      
      let errNames = this.checkService.checkName(this.firstName,this.lastName).split('+')
      this.er_firstName = errNames[0] == ' '? errNames[0] = '': errNames[0]
      this.er_lastName = errNames[1] == ' '? errNames[1] = '': errNames[1]

      this.er_adress = this.checkService.checkAdress(this.adress)

      this.er_phone = this.checkService.checkNumber(this.phone)

      this.checkEmail()
    })
    
    
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
      formData.append('password',this.password_r)
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

  logOut(){
    console.log('asd')
    localStorage.clear()
    this.router.navigate(['guest'])
  }

  upgrade(id){
    this.mainService.changeType({'id' : id,'type' : '1'}).subscribe(res => {})
    location.reload()
  }

  degrade(id){
    this.mainService.changeType({'id' : id,'type' : '0'}).subscribe(res => {})
    location.reload()
  }

  numberDays : number = null
  numberDaysError : string = ''
  changeNumberOfDays(){

    if(this.numberDays == null || this.numberDays < 0) {
      this.numberDaysError = "Cannot insert empty value or value less than 0!"
    }
    else{
      this.numberDaysError = ''
      this.mainService.changeNumberOfDays({'days' : this.numberDays}).subscribe(res => {})
      location.reload()
    }
  }

  block(id){
    this.mainService.block({'id' : id,'what' : '1'}).subscribe(res => {})
    location.reload()
  }
  unblock(id){
    this.mainService.block({'id' : id,'what' : '0'}).subscribe(res => {})
    location.reload()
  }
}
