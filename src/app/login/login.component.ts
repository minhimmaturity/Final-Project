import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../api.service';
interface LoginDetails {
    username: string | null,
    password: string | null,
}

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//controller
    
    status: any;
    constructor(
        private http: HttpClient,
        private api: ApiService,
        private router: Router) { } //dependency injection
    ngOnInit(): void { }

    loginForm = new FormGroup({
        phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
    onSubmit(data: any) {
        
        this.api.login(
            data.phone,
            data.password
        ).subscribe(res => {
            // confirm("Đăng nhập thành công");

            var d = JSON.parse(res); //doi tu json sang object
           
            const expriesAt = moment().add(d.expiresIn, 'second'); // add de cong them thoi diem hien tai + khoang thoi gian 480s nua thi no se het han
            localStorage.setItem('id_token', d.idToken);
            localStorage.setItem('expires_at', JSON.stringify(expriesAt.valueOf()));

            localStorage.setItem('account', JSON.stringify(d.account));
            console.log(d.account);
        

            this.router.navigateByUrl('/students');
        
            // luu lai trang trc roi quay lai trang do, sau do xoa di
                // this.router.navigateByUrl('/students');
                // localStorage.setItem('token', res.result);
        },
        
        error => {
            console.log("Ban khong co quyen truy cap", error);
            alert("Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!")
            this.router.navigate(['/login']);
        }
        
        );




    }

    // details: LoginDetails = {
    //     username: null,
    //     password: null,
    // }
    // isValidated(ctrl: NgModel): boolean | null {
    //     var result: boolean | null
    //         = ctrl.valid || (ctrl.pristine && ctrl.untouched)
    //     return result;
    // }
    // getValidationClass(ctrl: NgModel): any {
    //     // solution 1: return a class name as string
    //     if (ctrl.touched && ctrl.value && this.isValidated(ctrl)) {
    //         return 'is-valid';
    //     } else if (!this.isValidated(ctrl)) {
    //         return 'is-invalid';
    //     } else {
    //         return '';
    //     }

    // }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
       
        this.router.navigateByUrl('/login');
    }

    logined() {
        const str = localStorage.getItem('expires_at') || ""; // || " " nghia la neu khong co thi gan cho gia tri rong dung cho const
        if(str == ""){
            return false; //chua login

        }
        const expriesAt = JSON.parse(str);
        return moment().isBefore(moment(expriesAt)); //isBefore kiem tra xem thoi gian hien tai co truoc thoi gian expriesAt hay khong - tra ve true or false
    }




}
