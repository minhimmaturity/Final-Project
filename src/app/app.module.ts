import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmissionsComponent } from './admissions/admissions.component';
import { StudentsComponent } from './students/students.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormProfileComponent } from './admissions/form-profile/form-profile.component';
import { HeaderAdmissionsComponent } from './admissions/header-admissions/header-admissions.component';

import { ProfileStudentComponent } from './students/profile-student/profile-student.component';

import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoAccountComponent } from './admissions/auto-account/auto-account.component';
import { Moment } from 'moment';
import { NewAutoAccountComponent } from './admissions/new-auto-account/new-auto-account.component';
import { Interceptor } from './Interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultProfileComponent } from './default-profile/default-profile.component';
import { ListStudentComponent } from './admissions/list-student/list-student.component';
import { AccountantComponent } from './accountant/accountant.component';
import { SwitcherBodyComponent } from './switcher-body/switcher-body.component';

import { FeeVerificationComponent } from './accountant/fee-verification/fee-verification.component';
import { EditTypeFeeComponent } from './accountant/edit-type-fee/edit-type-fee.component';
import { NewFeeComponent } from './accountant/new-fee/new-fee.component';
import { ListEnglishTestWaitComponent } from './admissions/list-english-test-wait/list-english-test-wait.component';
import { HeaderComponent } from './header/header.component';
import { LogoGWComponent } from './logo-gw/logo-gw.component';



@NgModule({
  declarations: [
    AppComponent,
    AdmissionsComponent,
    StudentsComponent,
    FormProfileComponent,
    HeaderAdmissionsComponent,
    
    ProfileStudentComponent,
    LoginComponent,
    AutoAccountComponent,
    NewAutoAccountComponent,
    ResetPasswordComponent,
    FooterComponent,
    DefaultProfileComponent,
    ListStudentComponent,
    AccountantComponent,
    SwitcherBodyComponent,
   
    FeeVerificationComponent,
    EditTypeFeeComponent,
    NewFeeComponent,
    ListEnglishTestWaitComponent,
    HeaderComponent,
    LogoGWComponent,
   
   
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, 
    AppRoutingModule, ReactiveFormsModule 
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
