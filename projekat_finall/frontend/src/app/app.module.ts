import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GuestComponent } from './guest/guest.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReaderComponent } from './reader/reader.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { AdminComponent } from './admin/admin.component';
import { AttributesComponent } from './attributes/attributes.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BookComponent } from './book/book.component';
import { HistoryComponent } from './history/history.component';
import { BookAttributesComponent } from './book-attributes/book-attributes.component';




@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    ReaderComponent,
    ModeratorComponent,
    AdminComponent,
    AttributesComponent,
    PagenotfoundComponent,
    BookComponent,
    HistoryComponent,
    BookAttributesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
