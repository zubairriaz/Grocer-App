import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-manager',
  template: `
    <mat-toolbar color="accent">
      <a mat-button color="primary" routerLink="/manager/home">Manager Dashboard</a>
      <a mat-button color="primary" routerLink="/manager/receipt">Receipt Managment</a>
      <a mat-button color="primary" routerLink="/manager/user">User Managment</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class ManagerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
