import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  submit(query: string): void{
    this.router.navigate(['search'], {queryParams: {query: query}}).then(ret => {})
  }

  ngOnInit(): void {
  }

}
