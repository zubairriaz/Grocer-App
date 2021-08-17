import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { MaterialModule } from './material.module'
import { HomeComponent } from './home/home.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AuthService } from './auth/auth.service'
import { CustomHttpInterceptor } from './http/http.interceptor';
import { LoginComponent } from './login/login.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { SimpleDialogComponent } from './common/simple-dialogue.component'
import {AngularFireModule  } from "@angular/fire";
import {environment} from "../environments/environment"
import { authFactory } from "./auth/auth.factory";
import { AngularFireAuth } from "@angular/fire/auth";



@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    { provide: AuthService, useFactory: authFactory, deps:[AngularFireAuth] },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor,multi:true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [SimpleDialogComponent],
})
export class AppModule {}
