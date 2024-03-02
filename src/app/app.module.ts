import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { GridComponent } from './shared/grid/grid.component';
import { HttpErrorInterceptor } from '../http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BookListComponent,
    BookDetailsComponent,
    AuthorDetailsComponent,
    WishlistComponent,
    SearchComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    // other providers here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
