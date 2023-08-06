import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { FormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http : HttpClient) { }
  
  uri = "http://localhost:4000"

  checkUsernameUnique(data){
    return this.http.post(`${this.uri}/checkUsernameUnique`,data)
  }
  checkEmailUnique(email){
    return this.http.post(`${this.uri}/checkEmailUnique`,{"email" : email})
  }
  registerUser(formData : FormData){
    
    return this.http.post(`${this.uri}/register`,formData)
  }

  checkPassword(data){
    return this.http.post(`${this.uri}/checkPassword`,data)
  }

  getBookById(data) {
    return this.http.post(`${this.uri}/getBookById`,data)
  }

  getRandomBook() {
    return this.http.post(`${this.uri}/getRandomBook`,{})
  }


  
  changeInputs(formData : FormData){
    return this.http.post(`${this.uri}/changeInputs`,formData)
  }

  searchBooks(data){
    return this.http.post(`${this.uri}/searchBooks`,data)
  }

  getGenres() {
    return this.http.post(`${this.uri}/getGenres`,{})
  }

  requestBook(data){
    return this.http.post(`${this.uri}/requestBook`,data)
  }

  commentBook(data){
    return this.http.post(`${this.uri}/commentBook`,data)
  }

  rateBook(data){
    return this.http.post(`${this.uri}/rateBook`,data)
  }

  getRatingsAndCommentsFromBook(data){
    return this.http.post(`${this.uri}/getRatingsAndCommentsFromBook`,data)
  }

  getAverageRating(data){
    return this.http.post(`${this.uri}/getAverageRating`,data)
  }

  borrowBook(data){
    return this.http.post(`${this.uri}/borrowBook`,data)
  }

  reserveBook(data){
    return this.http.post(`${this.uri}/reserveBook`,data)
  }

  returnBook(data){
    return this.http.post(`${this.uri}/returnBook`,data)
  }

  checkIfBorrowed(data){
    return this.http.post(`${this.uri}/checkIfBorrowed`,data)
  }
  checkIfReserved(data){
    return this.http.post(`${this.uri}/checkIfReserved`,data)
  }
  
  getBorrowedBooks(data){
    return this.http.post(`${this.uri}/getBorrowedBooks`,data)
  }

  getHistoryBorrowed(data) {
    return this.http.post(`${this.uri}/getHistoryBorrowed`,data)
  }

  addNewBook(data) {
    return this.http.post(`${this.uri}/addNewBook`,data)
  }

  changeBookInputs(data) {
    return this.http.post(`${this.uri}/changeBookInputs`,data)
  }
  
  extendBorrowed(data) {
    return this.http.post(`${this.uri}/extendBorrowed`,data)
  }

  getRequestedBooks() {
    return this.http.post(`${this.uri}/getRequestedBooks`,{})
  }

  acceptBook(data) {
    return this.http.post(`${this.uri}/acceptBook`,data)
  }

  rejectBook(data) {
    return this.http.post(`${this.uri}/rejectBook`,data)
  }

  getNotifications(data) {
    return this.http.post(`${this.uri}/getNotifications`,data)
  }

  getThreeMostPopularBooks() {
    return this.http.post(`${this.uri}/getThreeMostPopularBooks`,{})
  }

  checkIfAdminPassword(data) {
    return this.http.post(`${this.uri}/checkIfAdminPassword`,data)
  }

  getUsersCanDelete() {
    return this.http.post(`${this.uri}/getUsersCanDelete`,{})
  }

  getBooksCanDelete() {
    return this.http.post(`${this.uri}/getBooksCanDelete`,{})
  }

  deleteUser(data) {
    return this.http.post(`${this.uri}/deleteUser`,data)
  }

  deleteBook(data) {
    return this.http.post(`${this.uri}/deleteBook`,data)
  }

  getRequestedUsers() {
    return this.http.post(`${this.uri}/getRequestedUsers`,{})
  }

  acceptUser(data) {
    return this.http.post(`${this.uri}/acceptUser`,data)
  }

  getAllUsers() {
    return this.http.post(`${this.uri}/getAllUsers`,{})
  }

  changeType(data) {
    return this.http.post(`${this.uri}/changeType`,data)
  }

  changeNumberOfDays(data) {
    return this.http.post(`${this.uri}/changeNumberOfDays`,data)
  }

  block(data) {
    return this.http.post(`${this.uri}/block`,data)
  }
}
