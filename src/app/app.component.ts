import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    // private login: LoginComponent
    ) {

  }
  // logout() { this.login.logout(); }

  // logined() { return this.login.logined()}
  


}
