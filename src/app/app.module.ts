import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import {HttpClientModule} from "@angular/common/http";
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { SiteSearchComponent } from './site-search/site-search.component';
//import { reducers, metaReducers } from './reducers';
import {notifyReducer, userReducer, authorsReducer, booksReducer} from "./state";
import {UserEffects, BooksEffects, AuthorsEffects} from "./state";
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';
import { SizePipe } from './size.pipe';
import { AuthorComponent } from './author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { TestComponent } from './test/test.component';
import { ReviewComponent } from './review/review.component';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    NavbarComponent,
    BookSearchComponent,
    SearchResultsComponent,
    UserComponent,
    LoginComponent,
    ShellComponent,
    HomeComponent,
    BookComponent,
    SiteSearchComponent,
    SizePipe,
    AuthorComponent,
    AuthorsComponent,
    TestComponent,
    ReviewComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({user: userReducer, notify: notifyReducer, books: booksReducer, router: routerReducer, authors: authorsReducer}),
    EffectsModule.forRoot([UserEffects, BooksEffects, AuthorsEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [{provide:'API_URL', useValue: "http://127.0.0.1:3000"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
