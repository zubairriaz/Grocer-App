import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component'
import {MaterialModule} from "../material.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockComponent } from './stock/stock.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component'

@NgModule({
  declarations: [InventoryComponent, DashboardComponent, StockComponent, ProductsComponent, CategoriesComponent],
  imports: [CommonModule, InventoryRoutingModule, MaterialModule],
})
export class InventoryModule {}
