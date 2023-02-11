import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  templateUrl: './auto-account.component.html',
  styleUrls: ['./auto-account.component.css']
})
export class AutoAccountComponent implements OnInit {
 
  public aElement?: boolean = true;
  constructor(private router: Router) {
   
    this.aElement = true;
    // router.events.subscribe((val) => {
      
    //   // if (val instanceof NavigationEnd) {
    //   //   console.log(val.url);
    //   // }

    //   this.activateDiv(this.router.url);
    // });
  }

  onclick() {
    this.aElement = !this.aElement;
    
   
  }
  ngOnInit() {
    
   
  }
  
  // ngAfterViewInit(): void {
  //   this.aElement = this.child.aElementNewAccount
    
  // }
  

  activateDiv(url: string) {
    if (url == '/admissions/registeraccount') {
      this.aElement = true;
    }
    this.aElement = false;
  }

  // Reload parent component when needed
  reloadParent() {
    this.ngOnInit();
  }
  
}
