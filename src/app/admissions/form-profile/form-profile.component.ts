import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


interface Images {

  CertificateOfGraduation: string | null,
  TemporaryCertificateOfGraduation: string | null,
  StudyRecords: string | null,
  EnglishCertificate: string | null,
  BirthCertificate: string | null,
  PortraitImage: string | null,
  CitizenIdentificationIm: string | null,
  OtherPapers: string | null,

}


interface Students {

  FullName: string | null,
  Gender: string | null,
  GraduationYear: string | null,
  LinkFacebook: string | null,
  Email: string | null,
  PhoneNumberFather: string | null,
  NameFather: string | null,
  PhoneNumberMother: string | null,
  NameMother: string | null,
  EmailFather: string | null,
  EmailMother: string | null,

}

@Component({
  
  
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.css']
})
export class FormProfileComponent implements OnInit {

  ngOptionsGender: Array<string> = ["Nam", "Nữ"]
  ngDropdownGender = "Nam";

  ngOptionsMajors = ["Công Nghệ Thông Tin", "Quản Trị Kinh Doanh", "Thiêt Kế Đồ Họa", "Quản Trị Marketing", "Quản Trị Sự Kiện", "Quản Trị Truyền Thông"];
  ngDropdownMajor?= "Công Nghệ Thông Tin";

  images: Images = {
    CertificateOfGraduation: null,
    TemporaryCertificateOfGraduation: null,
    StudyRecords: null,
    EnglishCertificate: null,
    BirthCertificate: null,
    PortraitImage: null,
    CitizenIdentificationIm: null,
    OtherPapers: null,
  };

  student: Students = {
    FullName: null,
    Gender: null,
    GraduationYear: null,
    LinkFacebook: null,
    Email: null,
    PhoneNumberFather: null,
    NameFather: null,
    PhoneNumberMother: null,
    NameMother: null,
    EmailFather: null,
    EmailMother: null,
  };

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router) {

  } //dependency injection



  ngOnInit(): void {

    this.profile();
    // this.profileForm.reset();

  }

  profileForm = new FormGroup({
    FullName: new FormControl(''),
    CitizenIdentificationNum: new FormControl(''),
    Gender: new FormControl(''),
    Birthday: new FormControl(''),
    provinceTHPT: new FormControl(''),
    
    HightSchool: new FormControl(''),
    GraduationYear: new FormControl(''),
    Phone: new FormControl(''),
    LinkFacebook: new FormControl(''),
    Majors: new FormControl(''),
    Email: new FormControl(''),
    Province: new FormControl(''),
    District: new FormControl(''),
    Commune: new FormControl(''),
    privateAddress: new FormControl(''),
    NameFather: new FormControl(''),
    PhoneNumberFather: new FormControl(''),
    EmailFather: new FormControl(''),
    NameMother: new FormControl(''),
    PhoneNumberMother: new FormControl(''),
    EmailMother: new FormControl(''),
    SponsorName: new FormControl(''),
    SponsorPhone: new FormControl(''),
    EmailSponsor: new FormControl(''),
    CertificateOfGraduation: new FormControl(''),
    TemporaryCertificateOfGraduation: new FormControl(''),
    StudyRecords: new FormControl(''),
    EnglishCertificate: new FormControl(''),
    BirthCertificate: new FormControl(''),
    PortraitImage: new FormControl(''),
    CitizenIdentificationIm: new FormControl(''),
    OtherPapers: new FormControl(''),

  }
  )

  profile() {

    //get password from localstorage
    var account: any = localStorage.getItem('account');
    var phone = JSON.parse(account).Phone;
    console.log("dsadsds" + phone);



    // if(this.loginForm.invalid){
    //     return false;
    // } 
    // truyen du lieu vao form
    // console.log(data.phone, data.password);
    // this.router.navigateByUrl('/students');

    // return true;
    // console.log(
    //  this.resetPasswordForm.value);
    // if (this.resetPasswordForm.value.oldPassword != oldPw) {

    //   alert("Mật khẩu cũ không đúng");
    //   return false;
    // }
    // else if (this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.reNewPassword) {
    //   alert("Mật khẩu mới không trùng khớp");
    //   return false;
    // }
    // else {
    console.log("hii");
    this.api.getAStudent(phone
    ).subscribe(res => {


      var d = JSON.parse(res); //doi tu json sang object

      //set display value for form control 
      this.profileForm.get('FullName')?.setValue(d.student.FullName.toString());
      // this.profileForm.get('CitizenIdentificationNum')?.setValue(d.student.CitizenIdentificationNum.toString());
      // this.profileForm.get('Birthday')?.setValue(d.student.Birthday.toString());

      this.profileForm.get('GraduationYear')?.setValue(d.student.GraduationYear.toString());
      this.profileForm.get('Phone')?.setValue(d.student.Phone.toString());
      this.profileForm.get('LinkFacebook')?.setValue(d.student.LinkFacebook.toString());


      this.ngDropdownGender = d.student.Gender.toString();
      // this.profileForm.patchValue({Gender: d.student.Gender.toString()});
      this.profileForm.controls.Gender.setValue(d.student.Gender.toString());

      // this.profileForm.get('Email')?.setValue(d.student.Email.toString());
      
      // this.profileForm.get('Province')?.setValue(d.student.Province.toString());
      // this.profileForm.get('District')?.setValue(d.student.District.toString());
      // this.profileForm.get('Commune')?.setValue(d.student.Commune.toString());
      // this.profileForm.get('privateAddress')?.setValue(d.student.privateAddress.toString());
      this.profileForm.get('NameFather')?.setValue(d.student.NameFather.toString());
      this.profileForm.get('PhoneNumberFather')?.setValue(d.student.PhoneNumberFather.toString());
      this.profileForm.get('EmailFather')?.setValue(d.student.EmailFather.toString());
      this.profileForm.get('NameMother')?.setValue(d.student.NameMother.toString());
      this.profileForm.get('PhoneNumberMother')?.setValue(d.student.PhoneNumberMother.toString());
      this.profileForm.get('EmailMother')?.setValue(d.student.EmailMother.toString());



      // this.profileForm.get('SponsorName')?.setValue(d.student.SponsorName.toString());
      // this.profileForm.get('SponsorPhone')?.setValue(d.student.SponsorPhone.toString());
      // this.profileForm.get('EmailSponsor')?.setValue(d.student.EmailSponsor.toString());



      // this.ngDropdownMajor = this.profileForm.get('Majors')?.value?.toString();

      this.images.CertificateOfGraduation = d.student.CertificateOfGraduation;

      this.images.TemporaryCertificateOfGraduation = d.student.TemporaryCertificateOfGraduation.toString();
      this.images.StudyRecords = d.student.StudyRecords.toString();
      this.images.EnglishCertificate = d.student.EnglishCertificate.toString();
      this.images.BirthCertificate = d.student.BirthCertificate.toString();
      this.images.PortraitImage = d.student.PortraitImage.toString();
      this.images.CitizenIdentificationIm = d.student.CitizenIdentification.toString();
      this.images.OtherPapers = d.student.OtherPapers.toString();



      // alert("Đổi mật khẩu thành công");

      // this.router.navigateByUrl('/students');


      // this.router.navigateByUrl('/students');

      // luu lai trang trc roi quay lai trang do, sau do xoa di
      // this.router.navigateByUrl('/students');
      // localStorage.setItem('token', res.result);
    },

      error => {
        console.log("Error", error);
        alert("Error");
        // this.router.navigateByUrl('/students');
      }

    );

  }



  UploadProfile(data: any) {

    //get password from localstorage
    var account: any = localStorage.getItem('account');
    var phone = JSON.parse(account).Phone;
    console.log("dsadsds" + phone);

    this.student = {
      FullName: data.FullName,
      Gender: data.Gender,
      GraduationYear: data.GraduationYear,
      LinkFacebook: data.LinkFacebook,
      Email: data.Email,
      PhoneNumberFather: data.PhoneNumberFather,
      NameFather: data.NameFather,
      PhoneNumberMother: data.PhoneNumberMother,
      NameMother: data.NameMother,
      EmailFather: data.EmailFather,
      EmailMother: data.EmailMother,
    }





      // if(this.loginForm.invalid){
      //     return false;
      // } 
      // truyen du lieu vao form
      // console.log(data.phone, data.password);
      // this.router.navigateByUrl('/students');

      // return true;
      // console.log(
      //  this.resetPasswordForm.value);
      // if (this.resetPasswordForm.value.oldPassword != oldPw) {

      //   alert("Mật khẩu cũ không đúng");
      //   return false;
      // }
      // else if (this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.reNewPassword) {
      //   alert("Mật khẩu mới không trùng khớp");
      //   return false;
      // }
      // else {
      
      this.api.testUpdateStudent(phone, this.student
      ).subscribe(res => {

        var d = JSON.parse(res); //doi tu json sang object
        
        alert("Thay đổi thông tin thành công");
        
        // this.router.navigateByUrl('/students/profilestudent');
        window.location.reload();
      },
  
        error => {
            console.log("Error", error);
            alert("Error");
            this.router.navigateByUrl('/students');
        }
  
      );

    }




  }