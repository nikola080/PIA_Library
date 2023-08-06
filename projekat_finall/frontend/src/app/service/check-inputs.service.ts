import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckInputsService {

  constructor() { }

  checkAdress(adress) {
    let ret : string = ''
    let regex0 = /.*,.*,.*/g
    if(adress.match(regex0) == null) return 'Adress must fill pattern: street name,street number,city' 
    
    let array = adress.split(',')
    let street = array[0]
    let number = array[1]
    let city = array[2]
    let regex1 = /[^0-9]+/g
    let regex2 = /[^a-zA-z\s]/g
    if(street.match(regex2) != null || number.match(regex1) != null || city.match(regex2) != null) {
      ret = 'Adress must fill pattern: street name,street number,city'
    }
    else ret = ''

    return ret
  }

  checkName(firstName,lastName) {
    let ret : string = ''
    let regex = '[^a-zA-Z]'
   
    if(firstName === '') ret += 'This field cannot be empty!'
    else {
      if(firstName.match(regex) != null) {
        ret += 'This field must contain only alphabetic characters!'
      }
      else ret += ' '
    }
    ret += '+'
    if(lastName === '') ret += 'This field cannot be empty!'
    else {
      if(lastName.match(regex) != null) {
        ret += 'This field must contain only alphabetic characters!'
      }
      else ret += ' '
    }
    return ret
  }

  checkNumber(phone) {
    let ret : string = ''
    if(phone.length === 0) {
      ret = 'This field cannot be empty!'
    }
    else{
      let regex = /[^0-9\+\s]/g
      if(phone.match(regex) != null) {
        ret = 'Phone number must only numberic characters!'
      }
      else{
      regex = /\+[0-9]{1,3}\s[0-9]+/g
        if(phone.match(regex) == null || phone.match(regex)[0].length != phone.length) {
          ret = 'Phone number must begin with country code, then blank character and than phone number!'
        }
        else ret = ''
      }
    }

    return ret
  }

  checkPassword(password) {
    let ret : string = ''
    let errorFlag = 0

    console.log(password)
    if(password.length < 8 || password.length > 12) {
      ret = 'Password must be between 8 and 12 characters!'
      
    }
    else{
      let regExpr = /[a-zA-z].*/g;
      if(password.match(regExpr) == null){
        ret = 'Password must contain alphabetic character!'
        
      }
      else{
        regExpr = /[A-Z]/g;
        if(password.match(regExpr) == null){
          ret = 'Password must contain at least 1 capital character!'
          
        }
        else{
          regExpr = /[0-9]/g;
          if(password.match(regExpr) == null){
            ret = 'Password must contain at least 1 numeric character!'
            
          }
          else{
            regExpr = /[^A-Za-z0-9]/g;
            if(password.match(regExpr) == null){
              ret = 'Password must contain at least 1 special character!'
              
            }
            else ret = ''
        }
        }
      }
    }
    return ret
  }

  checkBookName(name){
    if(name == '') return false
    return true
  }

  checkAuthors(authors){
    let auth = authors.split(",")
    let regex = /[^a-zA-Z\s]/g
    let regex2 = /,\s/g
    let regex3 = /\s,/g

    if(authors.match(regex2) || authors.match(regex2)) return false
    if(authors == '') return false

    for(let i = 0; i < auth.length;i++){
      if(auth[i].split(' ').length != 2) return false
    }
    for(let i = 0; i < auth.length; i++){
      if(auth[i] == '' || auth[i].match(regex) != null) return false
    }
   

    return true
  }

  checkGenre(genre){
    let regex = /[^a-zA-Z]/g

    if(genre.match(regex) != null || genre == '') return false
    return true
  }

  checkPublisher(publisher){
    let regex = /[^a-zA-Z0-9\s]/g
    if(publisher == '' || publisher.match(regex) != null) return false
    return true
  }

  checkYearOfPublishing(year){
    if(year == null || year < 0) return false
    return true
  }

  checkLanguage(language) {
    let regex = /[A-Z]{1,1}[a-z]*/g

    if(language == '' || language.match(regex)[0].length != language.length) return false
    return true
  }

  checkNumberOfCopies(amount){
    if(amount == null || amount < 0) return false
    return true
  }


}
