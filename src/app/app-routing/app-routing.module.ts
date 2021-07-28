import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ShellComponent } from '../shell/shell.component';
import { HomeComponent } from '../home/home.component';
import { BookComponent } from '../book/book.component';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import {SearchResultsComponent} from "../search-results/search-results.component";
import { AuthorsComponent } from '../authors/authors.component';
import {AuthorComponent} from "../author/author.component";
import {AuthorResolverService} from "../services/authors/author.resolver.service";
import {AuthorsResolverService} from "../services/authors/authors.resolver.service";
import {BookResolverService} from "../services/books/book.resolver.service";
import {HomeResolverService} from "../services/home/home.resolver.service";
import {NovelsResolverService} from "../services/books/novelsresolver.service";
import {TextbooksResolverService} from "../services/books/textbooksresolver.service";
import {ReviewComponent} from "../review/review.component";
import {NovelsComponent} from "../novels/novels.component";
import {ProfileComponent} from "../profile/profile.component";
import { TextbooksComponent } from '../textbooks/textbooks.component';
import {AuthGuard} from "../services/user/auth.guard";

const routes: Routes = [
  {path: '', component: ShellComponent,
   children:[
     {path: 'home', component: HomeComponent, resolve: {popular: HomeResolverService}},
     {path: 'book/:id', component: BookComponent, resolve: {books: BookResolverService}, children: [{path: "review", component: ReviewComponent, outlet: 'review'}]},
     {path: 'search', component: SearchResultsComponent},
     {path: 'textbooks', component: TextbooksComponent, resolve: {books: TextbooksResolverService}},
     {path: 'novels', component: NovelsComponent, resolve: {books: NovelsResolverService}},
     {path: 'authors', component: AuthorsComponent, resolve: {authors: AuthorsResolverService}},
     {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
     {path: 'authors/:id', component: AuthorComponent, resolve: {author: AuthorResolverService}},
     {path: '', redirectTo: 'home', pathMatch: 'full'}
   ]
  },

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: UserComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
