import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AttributesComponent } from './attributes/attributes.component';
import { GuestComponent } from './guest/guest.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ReaderComponent } from './reader/reader.component';
import { BookComponent } from './book/book.component'
import { HistoryComponent } from './history/history.component';
import { BookAttributesComponent } from './book-attributes/book-attributes.component';
const routes: Routes = [
  {path : 'book_attr', component : BookAttributesComponent},
  {path : 'history', component : HistoryComponent},
  {path : 'book', component : BookComponent},
  {path : 'pagenotfound', component : PagenotfoundComponent},
  {path : 'attributes', component : AttributesComponent},
  {path : 'admin', component : AdminComponent},
  {path : 'reader', component : ReaderComponent},
  {path : 'moderator', component : ModeratorComponent},
  {path : 'guest', component : GuestComponent},
  {path : '**', component : GuestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
