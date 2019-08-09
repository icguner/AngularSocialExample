import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarPipe'
})
export class AvatarPipePipe implements PipeTransform {
    public avatarUrl = 'http://127.0.0.1:8000/img/';

  transform(args?: any): any {
    if (args) {
        return '<img src="' + this.avatarUrl + args + '" alt="" />';
    }
  }

}
