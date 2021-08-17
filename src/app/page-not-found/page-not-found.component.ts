import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <p>
      The Page you are Looking for do not exists
      <a routerLink="/home">Go Back</a>
    </p>
  `,
  styles: [],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
