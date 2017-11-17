import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../app.model';

@Pipe({
  name: 'userSummaryPerson'
})
export class UserSummaryPersonPipe implements PipeTransform {

  public transform(user: User, args?: any): string {
    let child = '';
    if (user.childs && user.childs.length > 0) {
      child = '(E) ' + user.childs.length;
    }
    let accompanist = '';
    if (user.accompanists && user.accompanists.length > 0) {
      if (child.length > 0) {
        accompanist = ' - ';
      }
      accompanist = accompanist + '(A) ' + user.accompanists.length;
    }
    return child + accompanist;
  }

}
