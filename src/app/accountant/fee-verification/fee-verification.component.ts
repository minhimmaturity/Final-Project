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
}
