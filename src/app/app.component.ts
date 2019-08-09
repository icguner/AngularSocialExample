import { Component } from '@angular/core';
import { AuthCheckService } from 'src/services/auth-check.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import notie from 'notie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private _authCheck: AuthCheckService, private router: Router) {}

    logout() {
        this._authCheck.removeToken();
        this.router.navigateByUrl('/login');
        notie.alert({ text: 'Cikis Yapildi!' });
    }
}


