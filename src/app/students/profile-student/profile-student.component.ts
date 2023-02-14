import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import axios  from 'axios'


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
  PhoneNumberSponsor1: string | null,
  NameSponsor1: string | null,
  PhoneNumberSponsor2: string | null,
  NameSponsor2: string | null,
  EmailSponsor1: string | null,
  EmailSponsor2: string | null,

}

@Component({
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  ngOptionsGender: Array<string> = ["Nam", "Nữ"]
  ngDropdownGender = "Nam";

  ngOptionsMajors = ["Công Nghệ Thông Tin", "Quản Trị Kinh Doanh", "Thiêt Kế Đồ Họa", "Quản Trị Marketing", "Quản Trị Sự Kiện", "Quản Trị Truyền Thông"];
  ngDropdownMajor?= "Công Nghệ Thông Tin";
  
  ngOptionsProvinceTHPT = ["An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
   "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái", "Phú Yên", "Cần Thơ", "Đà Nẵng", "Hải Phòng", "Hà Nội", "TP HCM"];
  ngDropdownProvinceTHPT = "Hà Nội";
  // ngOptionsProvince = ["An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",]
  // ngDropdownProvince = "Hà Nội";
  // ngOptionsDistrict = []
  ngOptionsHightSchool = []


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
    PhoneNumberSponsor1: null,
    NameSponsor1: null,
    PhoneNumberSponsor2: null,
    NameSponsor2: null,
    EmailSponsor1: null,
    EmailSponsor2: null,
  };

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router) {

  } //dependency injection



  // ngOnInit(): void {

   
  //   // this.profileForm.reset();

  // }

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
    NameSponsor1: new FormControl(''),
    PhoneNumberSponsor1: new FormControl(''),
    EmailSponsor1: new FormControl(''),
    NameSponsor2: new FormControl(''),
    PhoneNumberSponsor2: new FormControl(''),
    EmailSponsor2: new FormControl(''),
   
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
      // console.log("meeeeeeeeeeeeeee" + d.student.Email);
      // this.profileForm.get('Province')?.setValue(d.student.Province.toString());
      // this.profileForm.get('District')?.setValue(d.student.District.toString());
      // this.profileForm.get('Commune')?.setValue(d.student.Commune.toString());
      // this.profileForm.get('privateAddress')?.setValue(d.student.privateAddress.toString());
      this.profileForm.get('NameSponsor1')?.setValue(d.student.NameSponsor1.toString());
      this.profileForm.get('PhoneNumberSponsor1')?.setValue(d.student.PhoneNumberSponsor1.toString());
      this.profileForm.get('EmailSponsor1')?.setValue(d.student.EmailSponsor1.toString());
      this.profileForm.get('NameSponsor2')?.setValue(d.student.NameSponsor2.toString());
      this.profileForm.get('PhoneNumberSponsor2')?.setValue(d.student.PhoneNumberSponsor2.toString());
      this.profileForm.get('EmailSponsor2')?.setValue(d.student.EmailSponsor2.toString());



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
      PhoneNumberSponsor1: data.PhoneNumberSponsor1,
      NameSponsor1: data.NameSponsor1,
      PhoneNumberSponsor2: data.PhoneNumberSponsor2,
      NameSponsor2: data.NameSponsor2,
      EmailSponsor1: data.EmailSponsor1,
      EmailSponsor2: data.EmailSponsor2,
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
      console.log("hii");
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


    private citis?: HTMLSelectElement;
    private districts?: HTMLSelectElement;
    private wards?: HTMLSelectElement;
  
    ngOnInit() {
      this.profile();
      this.citis = document.getElementById("city") as HTMLSelectElement;
      this.districts = document.getElementById("district") as HTMLSelectElement;
      this.wards = document.getElementById("ward") as HTMLSelectElement;
  // lay api ra
      axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json") 
        .then((result: { data: any; }) => {
          this.renderCity(result.data);
        });
    }
  
    private renderCity(data: any) {
      for (const x of data) {
        this.citis!.options[this.citis!.options.length] = new Option(x.Name, x.Id); 
      }
      this.citis!.onchange = () => {
        this.districts!.length = 1;
        this.wards!.length = 1;
        if (this.citis!.value !== "") {
          const result = data.filter((n: any) => n.Id === this.citis!.value);
  
          for (const k of result[0].Districts) {
            this.districts!.options[this.districts!.options.length] = new Option(k.Name, k.Id);
          }
        }
      };
      this.districts!.onchange = () => {
        this.wards!.length = 1;
        const dataCity = data.filter((n:any) => n.Id === this.citis!.value);
        if (this.districts!.value !== "") {
          const dataWards = dataCity[0].Districts.filter((n:any) => n.Id === this.districts!.value)[0].Wards;
  
          for (const w of dataWards) {
            this.wards!.options[this.wards!.options.length] = new Option(w.Name, w.Id);
          }
        }
      };
    }




  }
