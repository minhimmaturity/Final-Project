import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionsComponent } from './admissions/admissions.component';
import { AutoAccountComponent } from './admissions/auto-account/auto-account.component';
import { FormProfileComponent } from './admissions/form-profile/form-profile.component';
import { LoginComponent } from './login/login.component';
// import { LoginComponent } from './login/login.component';
import { ProfileStudentComponent } from './students/profile-student/profile-student.component';
import { StudentsComponent } from './students/students.component';
import { StudentGuard } from './student.guard';
import { NewAutoAccountComponent } from './admissions/new-auto-account/new-auto-account.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ListStudentComponent } from './admissions/list-student/list-student.component';
import { AccountantComponent } from './accountant/accountant.component';

import { FeeVerificationComponent } from './accountant/fee-verification/fee-verification.component';
import { EditTypeFeeComponent } from './accountant/edit-type-fee/edit-type-fee.component';
import { NewFeeComponent } from './accountant/new-fee/new-fee.component';
import { ListEnglishTestWaitComponent } from './admissions/list-english-test-wait/list-english-test-wait.component';
import { TestTaComponent } from './admissions/test-ta/test-ta.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'students', component: StudentsComponent,
    children: [
      { path: 'profilestudent', component: ProfileStudentComponent },
      // { path: 'profilestudent/:id', component: ProfileStudentComponent },


      // canActivate: [StudentGuard] 

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },

  {
    path: 'admissions', component: AdmissionsComponent,
    children: [
      {
        path: 'liststudent', component: ListStudentComponent,
        children: [
          { path: 'formprofile', component: FormProfileComponent },
        ]
      }, 
      {path: 'listtest', component: ListEnglishTestWaitComponent, children: [
        {path: 'testenglish', component: TestTaComponent},
      ]},

      {
        path: 'registeraccount', component: AutoAccountComponent,
        children: [
          { path: 'newaccount', component: NewAutoAccountComponent },
        ]
      },
    ]
  },
  {
    path: 'accountant', component: AccountantComponent,
    children: [
     
      {path: 'feeverification', component: FeeVerificationComponent},
      {path: 'edittypefee', component: EditTypeFeeComponent,
      children: [
        {path: 'newfee', component: NewFeeComponent}
      ]}

    ]
  }

]



@NgModule({
  imports: [CommonModule,
    [RouterModule.forRoot(routes, {
      // scrollPositionRestoration: 'top',
      // anchorScrolling: 'enabled',
      // initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
