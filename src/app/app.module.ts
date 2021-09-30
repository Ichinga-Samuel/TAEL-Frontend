import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule} from '@ngrx/store';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { SiteSearchComponent } from './site-search/site-search.component';
import { AuthorComponent } from './author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { ReviewComponent } from './review/review.component';
import { FooterComponent } from './footer/footer.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

//import { reducers, metaReducers } from './reducers';
import {notifyReducer, userReducer, authorsReducer, booksReducer, metaReducers} from "./state";
import {UserEffects, BooksEffects, AuthorsEffects} from "./state";

import { SizePipe } from './size.pipe';

import {httpInterceptorProviders} from "./services/backend";
import { ProfileComponent } from './profile/profile.component';
import { NovelsComponent } from './novels/novels.component';
import { TextbooksComponent } from './textbooks/textbooks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './alert/alert.component';


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
    ReviewComponent,
    FooterComponent,
    ProfileComponent,
    NovelsComponent,
    TextbooksComponent,
    PasswordResetComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({user: userReducer, notify: notifyReducer, books: booksReducer, router: routerReducer, authors: authorsReducer}, {metaReducers}),
    EffectsModule.forRoot([UserEffects, BooksEffects, AuthorsEffects]),
    StoreRouterConnectingModule.forRoot(),
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [httpInterceptorProviders, {provide:'API_URL', useValue: "http://localhost:3000"}],
  bootstrap: [AppComponent]
})

export class AppModule { }
// "https://tael-backend.ew.r.appspot.com"
