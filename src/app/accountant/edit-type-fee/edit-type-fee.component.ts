import { Component } from '@angular/core';

@Component({

  templateUrl: './edit-type-fee.component.html',
  styleUrls: ['./edit-type-fee.component.css']
})
export class EditTypeFeeComponent {
  ngOnInit(): void {
   
  }

  ngFilterYear = [2023,2022,2021,2020,2019,2018,2017,2016,2015,2014];
  ngDropdownYear?= this.ngFilterYear[0];

  
}
