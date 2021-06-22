import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ShellComponent } from '../shell/shell.component';
import { HomeComponent } from '../home/home.component';
import { BookComponent } from '../book/book.component';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import {SearchResultsComponent} from "../search-results/search-results.component";


const routes: Routes = [
  {path: '', component: ShellComponent,
   children:[
     {path: 'home', component: HomeComponent},
     {path: 'book/:id', component: BookComponent},
     {path: 'search', component: SearchResultsComponent},
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
