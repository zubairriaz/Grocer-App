import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ManagerComponent } from './manager/manager.component'
import { ReceiptComponent } from './receipt/receipt.component'
import { UserComponent } from './user/user.component'
import { HomeComponent } from './home/home.component'
import { AuthGuard } from '../auth/auth.guard'
import { Role } from '../auth/interfaces/auth'

export const managerRoutes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: '', redirectTo: '/manager/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: Role.Manager },
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: Role.Manager },
      },
      {
        path: 'receipt',
        component: ReceiptComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: Role.Manager },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(managerRoutes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
