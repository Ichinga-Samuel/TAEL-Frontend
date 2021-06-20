import {Component, Input, OnInit} from '@angular/core';
import {BookResult} from "../services/book_result";
import {BookSearchService} from "../services/booksearch.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() result: BookResult[] | undefined;
  @Input() loading: boolean = false
  constructor(private bs: BookSearchService, private route: ActivatedRoute) {
  }
  getResults(books: BookResult[]): void{
    this.result = books
  }
  ngOnInit(): void {
    this.route.queryParamMap.pipe(map(param => param.get('query') || ''), filter(q => q.length>=3), switchMap((query: string) => this.bs.search(query))).subscribe(
      (value: BookResult[]) => {this.result=value;},
      error => {this.loading=false},
      () => {this.loading=false; // @ts-ignore
        if(this.result?.length > 0){console.log('hey')}}
    )
  }

}
