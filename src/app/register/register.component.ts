import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/services/api-service.service';
import { Router } from '@angular/router';
import { AuthCheckService } from 'src/services/auth-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import notie from 'notie';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
    password: any;
    password_confirmation: any;
    name: any;
    email: any;
    auth_token: any;

  constructor(private apiService: ApiServiceService, private router: Router, private _authCheck: AuthCheckService, 
    private _spinner: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this._spinner.hide();
  }

  register() {
    let data = {
        'password' : this.password,
        'password_confirmation' : this.password_confirmation,
        'name' : this.name,
        'email' : this.email
    };
    this.apiService.postData('register', data).subscribe(
        result => {
            this.auth_token = result['data']['api_token'];
            localStorage.setItem('auth_tokenz', this.auth_token);
            this._spinner.hide();
            if (this._authCheck.isAuthenticated()) {
              this.router.navigateByUrl('/homepage');
            }
            },
        error => {
            notie.alert({type:2, text: error.error.message });
        }
    );
    }
}
