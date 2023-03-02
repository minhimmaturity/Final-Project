import { Component, OnInit } from '@angular/core';

@Component({
  
  templateUrl: './fee-verification.component.html',
  styleUrls: ['./fee-verification.component.css']
})
export class FeeVerificationComponent implements OnInit {
  ngOnInit(): void {
   
  }

 

  ngFilterStatus = ["Tất cả", "Đã nộp đầy đủ phí ", "Thiếu phí giữ chỗ ", "Thiếu phí xét tuyển ", "Chưa nộp phí"];
  ngDropdownStatus?= "Tất cả";

  ngFilterSemester = ["fall", "spring", "summer"];
  ngDropdownSemester?= "all";

  ngFilterYear = [2023,2022,2021,2020,2019,2018,2017,2016,2015,2014];
  ngDropdownYear?= this.ngFilterYear[0];

  ngFilterName = ["Nguyễn Văn A", "Nguyễn Văn B", "Nguyễn Văn C"];
  ngDropdownName?= "Nguyễn Văn A";
}
