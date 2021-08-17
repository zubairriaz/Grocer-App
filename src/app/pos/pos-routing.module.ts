import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {PoscomponentComponent} from './poscomponent/poscomponent.component'

const routes: Routes = [
  {path:'', redirectTo:'/pos/home',pathMatch:'full'},
  {path:'home',component: PoscomponentComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
