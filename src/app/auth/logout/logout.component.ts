import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  template: ` <p>logging Out</p> `,
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.doLogOut();
  }

  doLogOut() {
    this.auth.logout(true);
    this.router.navigate(['/']);
  }
}
