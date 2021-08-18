import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-inventory',
  template: `
    <mat-toolbar color="accent">
      <button mat-button routerLink="dashboard">DashBoard</button>
      <button mat-button routerLink="stock">Stock</button>
      <button mat-button routerLink="products">Products</button>
      <button mat-button routerLink="categories">Categories</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
