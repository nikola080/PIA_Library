import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { CheckInputsService } from '../service/check-inputs.service';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  constructor(private checkService : CheckInputsService, private mainService : MainService, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') == null) this.router.navigate(['pagenotfound'])

    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user.picture == 'NO_PICTURE') this.pictureURL = '/assets/' + 'profile_default.png'
    this.pictureURL = '/assets/' + this.user.picture
  }
  pictureURL : string
  user : UserModel
  
  wantUsername : boolean = false
  wantPassword : boolean = false
  wantFirstname : boolean = false
  wantLastname : boolean = false
  wantAdress : boolean = false
  wantPhone : boolean = false
  wantEmail : boolean = false
  wantPicture : boolean = false
  
  username : string = ''
  firstName : string = ''
  lastName : string = ''
  adress : string = ''
  phone : string = ''
  email : string = ''
  picture : File = null
 
  username_err : string = ''
  password_err : string = ''
  firstName_err : string = ''
  lastName_err : string = ''
  adress_err : string = ''
  phone_err : string = ''
  email_err : string = ''

  oldPassword : string = ''
  newPassword : string = ''
  repeatNewPassword : string = ''

  oldPassword_err : string = ''
  newPassword_err : string = ''
  repeatNewPassword_err: string = ''

  profilePictureImage(event){
    this.picture = event.target.files[0]
  }

  reload() {
    this.username = ''
  }
  changeInputs(which){
    let forma = new FormData()

    forma.append('username_', this.user.username)

    switch(which){
      case 'username': {
        forma.append('which','username',) 
        forma.append('username',this.username)
        if(this.username.length == 0) this.username_err = 'This input cannot be empty!'
        else{
          let data = {
            'username' : this.username
          }
          this.mainService.checkUsernameUnique(data).subscribe( res => {
            if(res['message'] == 1){
              this.mainService.changeInputs(forma).subscribe( res => {
                if(res['message'] != 1) this.username_err = "Server error!"
                else {
                  this.username_err = ''
                  this.user.username = res['username']
                  localStorage.setItem('user',JSON.stringify(this.user))
                  location.reload()
                  
                }
              })
            }else{
              this.username_err = 'Username is not unique!'
            }
          })
        }
      } break
      
      case 'firstName': {
        forma.append('which','firstName',) 
        forma.append('firstName',this.firstName)
        let err = this.checkService.checkName(this.firstName,this.lastName).split('+')[0]
        if(err == ' ') {
          
          this.mainService.changeInputs(forma).subscribe(res =>{
            if(res['message'] != 1) this.username_err = "Server error!"
            else {
              this.firstName_err = ''
             this.user.firstName = res['firstName']
              localStorage.setItem('user',JSON.stringify(this.user))
              location.reload()
              
            }
          })
        } else this.firstName_err = err
      } break

      case 'lastName': {
        forma.append('which','lastName',) 
        forma.append('lastName',this.lastName)
        let err = this.checkService.checkName(this.firstName,this.lastName).split('+')[1]
        if(err == ' ') {

          this.mainService.changeInputs(forma).subscribe(res =>{
            if(res['message'] != 1) this.username_err = "Server error!"
            else {
              this.lastName_err = ''
              this.user.lastName = res['lastName']
              localStorage.setItem('user',JSON.stringify(this.user))
              location.reload()
            }
          })
        }else this.lastName_err = err
      } break
      case 'phone': {
        forma.append('which','phone',) 
        forma.append('phone',this.phone)
        this.phone_err = this.checkService.checkNumber(this.phone)
        if(this.phone_err.length == 0){
          this.mainService.changeInputs(forma).subscribe(res =>{
            if(res['message'] != 1) this.username_err = "Server error!"
            else {
              this.phone_err = ''
              this.user.phone = res['phone']
              localStorage.setItem('user',JSON.stringify(this.user))
              location.reload()
            }
          })
        }
      } break
      case 'adress': {
        forma.append('which','adress',) 
        forma.append('adress',this.adress)
        this.adress_err = this.checkService.checkAdress(this.adress)
        if(this.adress_err.length == 0){
          this.mainService.changeInputs(forma).subscribe(res =>{
            if(res['message'] != 1) this.username_err = "Server error!"
            else {
              this.adress_err = ''
              this.user.adress = res['adress']
              localStorage.setItem('user',JSON.stringify(this.user))
              location.reload()
            }
          })
        }
      } break
      case 'email': {
        forma.append('which','email',) 
        forma.append('email',this.email)
        if(this.email.length == 0) {
          this.email_err = 'This field cannot be empty!'
          return
        }
        this.mainService.checkEmailUnique(this.email).subscribe( res => {
          if(res['message'] == 1){
            this.mainService.changeInputs(forma).subscribe(res => {
              if(res['message'] != 1) this.username_err = "Server error!"
              else {
                this.email_err = ''
                this.user.email = res['email']
                localStorage.setItem('user',JSON.stringify(this.user))
                location.reload()
              }
            })
          }
          else this.email_err = 'Email is not unique!'
        })
      } break
      case 'picture': {

        if(this.picture)
        {
          forma.append('tip' , '-1')
          forma.append('which','picture')
          forma.append('_id',this.user._id) 
          forma.append('profilePicture',this.picture)
          if(this.picture){
            this.mainService.changeInputs(forma).subscribe(res => {
              if(res['message'] != 1) this.username_err = "Server error!"
              else {
                this.user.picture = res['picture']
                localStorage.setItem('user',JSON.stringify(this.user))
                location.reload()
              }
            })
          }
        }
      } break
    }
    
  }

  changePassword(){
    let data = {'username' : this.user.username,'password' : this.oldPassword}
    this.mainService.checkPassword(data).subscribe( res =>{
      if(res['message'] == 1){
        this.oldPassword_err = 'Incorrect password!'
      }
      else{
        this.oldPassword_err = ''
        this.newPassword_err = this.checkService.checkPassword(this.newPassword)
        console.log(this.newPassword_err)
        if(this.newPassword_err.length != 0) return
        else{
          if(this.newPassword.localeCompare(this.repeatNewPassword) != 0) {
            this.repeatNewPassword_err = 'Repeated password does not match with new one!'
          }
          else {
            
            let forma = new FormData()
            forma.append('username_', this.user.username)
            forma.append('which','password')
            forma.append('password',this.newPassword)
            this.mainService.changeInputs(forma).subscribe( res => {
              if(res['message'] != 1) this.repeatNewPassword_err = 'Server error!'
              else{
                this.repeatNewPassword_err = ''
                
                localStorage.removeItem('user')
                this.router.navigate(['guest'])
              }
            })
          }
        }
      }
    })

  }
  toFirstPage(){
    let type = this.user.type
    switch(type){
      case 'reader' : this.router.navigate(['reader']); break;
      case 'moderator' : this.router.navigate(['moderator']); break;
      case 'admin' : this.router.navigate(['admin']); break;
    }
  }
 
}
