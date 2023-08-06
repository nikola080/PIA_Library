import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../models/book.model';
import { UserModel } from '../models/user.model';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private router : Router,private mainService : MainService) { }

  user : UserModel 
  data = []
  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem('user'))
    if(!this.user) this.router.navigate(['pagenotfound'])
    else{
      this.data = JSON.parse(localStorage.getItem('history'))

      for(let i = 0; i < this.data.length;i++){
        this.data[i].dateBorrowed = (new Date(parseInt(this.data[i].dateBorrowed)).toISOString().slice(0,19))
        let f = this.data[i].dateBorrowed.split('T')
        this.data[i].dateBorrowed = f[0] + ' ' +  f[1]


        this.data[i].dateReturned = (new Date(parseInt(this.data[i].dateReturned)).toISOString().slice(0,19))
        f = this.data[i].dateReturned.split('T')
        this.data[i].dateReturned = f[0] + ' ' + f[1]
       
      }
    }
  }


  toFirstPage(){
    let type = this.user.type
    switch(type){
      case 'reader' : this.router.navigate(['reader']); break;
      case 'moderator' : this.router.navigate(['moderator']); break;
      case 'admin' : this.router.navigate(['admin']); break;
    }
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['guest'])
  }

  sortName : boolean = true
  sortAuthors : boolean = true
  sortBorrowed : boolean = true
  sortReturned : boolean = true


  sortByName() {
    this.sortName = !this.sortName
    this.data.sort((str1,str2) => {
      if (str1.name > str2.name) {
          return 1 * (Number(this.sortName) == 0?-1:1);
      }
  
      if (str1.name < str2.name) {
          return -1 * (Number(this.sortName) == 0?-1:1);
      }
  
      return 0;
   });
   
  }

  sortByAuthor(){
    this.sortAuthors = !this.sortAuthors
    this.data.sort((str1,str2) => {
      
      let auth1 = str1.authors[0].split(' ')[1]
      let auth2 = str2.authors[0].split(' ')[1]
     
      if (auth1 > auth2) {
          return 1 * (Number(this.sortAuthors) == 0?-1:1);
      }
  
      if (auth1 < auth2) {
          return -1 * (Number(this.sortAuthors) == 0?-1:1);
      }
  
      return 0;
   });
  }

  sortByDateBorrowed(){
    this.sortBorrowed = !this.sortBorrowed
    this.data.sort((str1,str2) => {
   
      if (str1.dateBorrowed > str2.dateBorrowed) {
          return 1 * (Number(this.sortBorrowed) == 0?-1:1);
      }
  
      if (str1.dateBorrowed < str2.dateBorrowed) {
          return -1 * (Number(this.sortBorrowed) == 0?-1:1);
      }
  
      return 0;
   });
  }

  sortByDateReturned(){
    this.sortReturned = !this.sortReturned
    this.data.sort((str1,str2) => {
   
      if (str1.dateReturned > str2.dateReturned) {
          return 1 * (Number(this.sortReturned) == 0?-1:1);
      }
  
      if (str1.dateReturned < str2.dateReturned) {
          return -1 * (Number(this.sortReturned) == 0?-1:1);
      }
  
      return 0;
   });
  }

  
  details(id){

    let book : BookModel
    this.mainService.getBookById({'_id' : id}).subscribe( res =>{
      if(res['message'] === '1') {
        localStorage.setItem('book',JSON.stringify(res['book']))
        this.router.navigate(['book'])
      }
    })

  }
}
