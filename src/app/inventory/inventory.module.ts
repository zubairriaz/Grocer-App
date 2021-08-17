import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../material.module'
import { CategoriesComponent } from './categories/categories.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { InventoryRoutingModule } from './inventory-routing.module'
import { InventoryComponent } from './inventory/inventory.component'
import { ProductsComponent } from './products/products.component'
import { StockComponent } from './stock/stock.component'

@NgModule({
  declarations: [
    InventoryComponent,
    DashboardComponent,
    StockComponent,
    ProductsComponent,
    CategoriesComponent,
  ],
  imports: [CommonModule, InventoryRoutingModule, MaterialModule],
})
export class InventoryModule {}
