import { Component, OnInit } from '@angular/core';
import {AuthCheckService} from '../../services/auth-check.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiServiceService } from 'src/services/api-service.service';
import { Observable, timer } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})

export class ArticleComponent implements OnInit {
  articles: any;
  isAuth: boolean;
  constructor(private apiService: ApiServiceService, private _authCheck: AuthCheckService, private router: Router,
              private _spinner: Ng4LoadingSpinnerService, private toastr: ToastrService) { }

  ngOnInit() {
    this._spinner.show();
    this.isAuth = this._authCheck.isAuthenticated();
    if (!this._authCheck.isAuthenticated()) {
        setTimeout(() => this.toastr.error('Giris Yapilmamis!'));
        setTimeout(() => {
            this.router.navigateByUrl('/login');
        }, 3000);
    }
    this.apiService.getData('articles')
    .subscribe(
        result => {
            // tslint:disable-next-line: no-string-literal
            this.articles = result;
            this._spinner.hide();
        },
        error => {
            console.error('error creating');
        }
    );
  }
}
