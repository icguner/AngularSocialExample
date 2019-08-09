import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/services/api-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvatarPipePipe } from '../../pipes/avatar-pipe.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  providers: [AvatarPipePipe]
})
export class ProfileComponent implements OnInit {
    selectedFile: File;
    isLoading = false;
    uploadForm: FormGroup;
    fileToUpload: File;
    constructor(private apiService: ApiServiceService, private _spinner: Ng4LoadingSpinnerService,
                private toastr: ToastrService, private formBuilder: FormBuilder, private avatarPipe: AvatarPipePipe) { }
    userInfo = {};
    userAvatar: any;
    ngOnInit() {
    this._spinner.show();
    (this.apiService.getData('profile').subscribe(
        result => {
          this.userInfo = result;
          this.userAvatar = result['avatar'];
          this._spinner.hide();
          this.isLoading = true;
        }));
    }

    updateProfile(form) {
        this._spinner.show();
        let data = {
            'address' : form.value.address,
            'city' : form.value.city,
            'gender' : form.value.gender,
            'country' : form.value.country,
        };
        this.apiService.putData('updateProfile', data).subscribe(
            result => {
                this.userInfo = result;
                setTimeout(() => this.toastr.success('Profil Guncellendi!'));
                this._spinner.hide();
        });
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0]
      }

    updateAvatar(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('avatar', file, file.name);
            this.apiService.postData('updateAvatar', formData).subscribe(
                result => {
                    this.userAvatar = result
                    setTimeout(() => this.toastr.success('Profil Guncellendi!'));
                    this._spinner.hide();
            });
        }
    }
}
