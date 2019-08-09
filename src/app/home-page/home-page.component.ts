import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/services/api-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent implements OnInit {
    public wallData: any;
    constructor(private apiService: ApiServiceService, private _spinner: Ng4LoadingSpinnerService,
                private toastr: ToastrService) {}
    form = new FormGroup({
        formModel: new FormControl('Context', Validators.minLength(2)),
        title: new FormControl('Post Title', Validators.minLength(2)),
      });

      ngOnInit() {
        this.loadPosts();
      }

      loadPosts() {
        this._spinner.show();
        this.apiService.getData('getPostWall').subscribe(
            result => {
                this.wallData = result;
                this._spinner.hide();
            });
      }

      onSubmit(): void {
        let data = {
            'title' : this.form.value.title,
            'context' : this.form.value.formModel,
        };
        this.apiService.postData('postwall', data).subscribe(
            result => {
                setTimeout(() => this.toastr.success('Post Sended!'));
                this.loadPosts();
                // this._spinner.hide();
        });
      }

      likePost(id) {
        let data = {
            'id' : id
        }
        this.apiService.putData('likePost', data).subscribe(
            result => {
                this.loadPosts();
                // this._spinner.hide();
        });
      }

}
