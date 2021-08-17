import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../material.module'
import { HomeComponent } from './home/home.component'
import { ManagerRoutingModule } from './manager-routing.module'
import { ManagerComponent } from './manager/manager.component'
import { ReceiptComponent } from './receipt/receipt.component'
import { UserComponent } from './user/user.component'

@NgModule({
  declarations: [ManagerComponent, ReceiptComponent, UserComponent, HomeComponent],
  imports: [CommonModule, ManagerRoutingModule, MaterialModule],
})
export class ManagerModule {}
