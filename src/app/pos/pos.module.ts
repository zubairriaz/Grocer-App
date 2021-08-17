import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PosRoutingModule } from './pos-routing.module';
import { PoscomponentComponent } from './poscomponent/poscomponent.component'

@NgModule({
  declarations: [PoscomponentComponent],
  imports: [CommonModule, PosRoutingModule],
})
export class PosModule {}
