import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {popular} from "../state/"
import {Book} from "../services/books/book";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
  public books: Book[] = []
  public caption: string = "Most Popular Books"
  constructor(private router: Router, private store: Store, private ts: Title) { }

  submit(query: string): void{
    this.router.navigate(['search'], {queryParams: {query: query}}).then(res => {})
  }

  ngOnInit(): void {
        this.ts.setTitle('The African Ebook Library')
        this.store.select(popular).pipe().subscribe(books => {
          this.books = books;
        })
}

}
