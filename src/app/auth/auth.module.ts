import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AuthRoutingModule } from './auth-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component'

@NgModule({
  declarations: [ProfileComponent, LogoutComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
