import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {popular} from "../state/"
import {Book} from "../services/books/book";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
  public books: Book[] = []
  public caption: string = "Most Popular Books"
  constructor(private router: Router, private store: Store) { }

  submit(query: string): void{
    this.router.navigate(['search'], {queryParams: {query: query}}).then(res => {})
  }

  ngOnInit(): void {
        this.store.select(popular).pipe().subscribe(books => this.books = books)
}

}
