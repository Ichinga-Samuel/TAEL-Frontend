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
import * as userReducers from './state/user/user.reducer'
import * as notifyReducers from './state/notify/notify.reducers'
import * as booksReducers from "./state/books/books.reducer"
import {UserEffects, BooksEffects} from "./state";
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';
import { SizePipe } from './size.pipe';


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

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({user: userReducers.reducer, notify: notifyReducers.reducer, books: booksReducers.reducer, router: routerReducer}),
    EffectsModule.forRoot([UserEffects, BooksEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [{provide:'API_URL', useValue: "http://127.0.0.1:3000"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
