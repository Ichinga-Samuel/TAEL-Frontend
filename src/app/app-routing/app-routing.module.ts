import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { PreloadAllModules } from '@angular/router';

// components
import { ShellComponent } from '../shell/shell.component';
import { HomeComponent } from '../home/home.component';
import { BookComponent } from '../book/book.component';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import {SearchResultsComponent} from "../search-results/search-results.component";
import { AuthorsComponent } from '../authors/authors.component';
import {AuthorComponent} from "../author/author.component";
import {ReviewComponent} from "../review/review.component";
import {NovelsComponent} from "../novels/novels.component";
import {ProfileComponent} from "../profile/profile.component";
import { TextbooksComponent } from '../textbooks/textbooks.component';
import { PasswordResetComponent } from "../password-reset/password-reset.component";
import {BlogComponent} from "../blog/blog.component";
import {BlogsComponent} from "../blogs/blogs.component";
import {Four0fourComponent} from "../four0four/four0four.component";

// resolvers and guards
import {AuthorResolverService} from "../services/authors/author.resolver.service";
import {AuthorsResolverService} from "../services/authors/authors.resolver.service";
import {BookResolverService} from "../services/books/book.resolver.service";
import {HomeResolverService} from "../services/home/home.resolver.service";
import {NovelsResolverService} from "../services/books/novelsresolver.service";
import {TextbooksResolverService} from "../services/books/textbooksresolver.service";
import {BlogResolverService} from "../services/blogs/blogresolver.service";
import {BlogsResolverService} from "../services/blogs/blogs-resolver.service";
import {AuthGuard} from "../services/user/auth.guard";

const routes: Routes = [
  {path: '', component: ShellComponent,
   children:[
     {path: '', component: HomeComponent, resolve: {popular: HomeResolverService}},
     {path: 'book/:id', component: BookComponent, resolve: {books: BookResolverService}, children: [{path: "review", component: ReviewComponent, outlet: 'review'}]},
     {path: 'search', component: SearchResultsComponent},
     {path: 'textbooks', component: TextbooksComponent, resolve: {books: TextbooksResolverService}},
     {path: 'novels', component: NovelsComponent, resolve: {books: NovelsResolverService}},
     {path: 'authors', component: AuthorsComponent, resolve: {authors: AuthorsResolverService}},
     {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
     {path: 'blog/:id', component: BlogComponent, resolve: {blog: BlogResolverService}},
     {path: 'blogs', component: BlogsComponent, resolve: {blog: BlogsResolverService}},
     {path: 'write', loadChildren: () => import('../stories/stories.module').then(m => m.StoriesModule)},
     {path: 'authors/:id', component: AuthorComponent, resolve: {author: AuthorResolverService}},
   ]
  },

  {path: 'login', component: LoginComponent},
  {path: 'reset_password/:token', component: PasswordResetComponent},
  {path: 'signup', component: UserComponent},
  {path: '**', component: Four0fourComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
