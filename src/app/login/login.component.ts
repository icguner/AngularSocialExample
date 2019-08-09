import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiServiceService } from '../../services/api-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthCheckService } from 'src/services/auth-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  name: any;
  password: any;
  password_confirmation: any;
  auth_token: any;
  email: any;
  constructor(private apiService: ApiServiceService, private router: Router, private _authCheck: AuthCheckService, 
              private _spinner: Ng4LoadingSpinnerService, private toastr: ToastrService) {}
    ngOnInit(): void {
        this._spinner.hide();
        if (this._authCheck.isAuthenticated()) {
        this.router.navigateByUrl('/homepage');
      }
    }
    login() {
    this._spinner.show();
    let data = {
        'password' : this.password,
        'name' : this.name
    };
    this.apiService.postData('login', data)
    .subscribe(
        result => {
            // tslint:disable-next-line: no-string-literal
            this.auth_token = result['data']['api_token'];
            localStorage.setItem('auth_tokenz', this.auth_token);
            this._spinner.hide();
            if (this._authCheck.isAuthenticated()) {
              this.router.navigateByUrl('/homepage');
            }
        },
        error => {
            setTimeout(() => this.toastr.error('Giriş bilgileri doğru değil'));
        }
    );
    }
}
