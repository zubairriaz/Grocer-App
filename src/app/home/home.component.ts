import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="(authService.currentStatus$ | async)?.isAuthenticated; else doLogin">
      <div class="mat-display-4">This is LemonMart! The place where</div>
      <div class="mat-display-4">
        You get a lemon, you get a lemon, you get a lemon...
      </div>
      <div class="mat-display-4">Everybody gets a lemon.</div>
    </div>
    <ng-template #doLogin>
      <app-login></app-login>
    </ng-template>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
}
