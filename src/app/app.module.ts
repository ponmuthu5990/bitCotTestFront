import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatProgressSpinnerModule } from '@angular/material';
import { SharedModule } from './Modules/shared.module';
import { TopMenuModule } from './Modules/app.routing';
import {GrowlModule} from 'primeng/primeng';

import { AppComponent } from './app.component';

import { CancelDialogComponent } from './components/popups/custom-dialogue/cancel-dialogue.components';
import { CustomDialogComponent } from './components/popups/custom-dialogue/custom-dialogue.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SigninFormComponent } from './components/main/user-login/signin-form/signin-form.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { UserLoginComponent } from './components/main/user-login/user-login.component';

import { AuthenticationService } from './services/authentication.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { NotificationService } from './services/notification.service';
import { SignupFormComponent } from './components/main/user-login/signup-form/signup-form.component';







@NgModule({
  
  declarations: [  AppComponent,       
     CancelDialogComponent, 
    CustomDialogComponent, FooterComponent,         
     MainComponent, SidebarComponent, SigninFormComponent, 
    TopbarComponent, UserLoginComponent, SignupFormComponent, 
     ],

  imports: [ BrowserAnimationsModule, BrowserModule, GrowlModule, 
    HttpClientModule,  MatProgressSpinnerModule,  SharedModule, 
    TopMenuModule],
  providers: [  AuthGuard, AuthenticationService,           
     MessageService,   RoleService,  NotificationService,
     UserService, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },],
  bootstrap: [AppComponent],
  entryComponents: [ CancelDialogComponent, CustomDialogComponent]
})

export class AppModule { }
