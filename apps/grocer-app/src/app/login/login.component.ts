import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { combineLatest } from 'rxjs'
import { catchError, filter, tap } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { AuthService } from '../auth/auth.service'
import { Role } from '../auth/interfaces/auth'
import { UIService } from '../common/ui.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private subs = new SubSink()
  loginform: FormGroup
  loginError
  redirectUrl: string
  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UIService
  ) {
    this.subs.sink = this.route.paramMap
      .pipe(
        tap((params) => {
          this.redirectUrl = params.get('redirectUrl')
        })
      )
      .subscribe()
  }

  ngOnInit(): void {
    this.auth.logout(true)
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginform = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(50)],
      ],
    })
  }

  async submitForm(form: FormGroup) {
    this.auth
      .login(form.value.email, form.value.password)
      .pipe(
        catchError((err) => {
          return (this.loginError = err)
        })
      )
      .subscribe()
    this.subs.sink = combineLatest([this.auth.currentStatus$, this.auth.currentUser$])
      .pipe(
        filter(([status, user]) => status.isAuthenticated && user._id != ''),
        tap(([staus, user]) => {
          console.log(user)
          this.uiService.showToast(`Welcome ${user.fullName}! Role ${user.role}`)
          this.router.navigate([
            this.redirectUrl || this.routeBasedOnRoles(user.role as Role),
          ])
        })
      )
      .subscribe()
  }

  routeBasedOnRoles(role: Role) {
    switch (role) {
      case Role.Cashier:
        return '/pos'
      case Role.Manager:
        return '/manager'
      case Role.Clerk:
        return '/inventory'
      default:
        return '/auth/profile'
    }
  }
}
