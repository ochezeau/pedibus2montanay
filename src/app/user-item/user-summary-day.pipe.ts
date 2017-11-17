import {Pipe, PipeTransform} from '@angular/core';
import {Person, Ride, User} from '../app.model';
import {UserService} from '../service/user.service';

@Pipe({
  name: 'userSummaryDay'
})
export class UserSummaryDayPipe implements PipeTransform {

  constructor(private userService: UserService) {
  }

  public transform(user: User, day: string): string {
    return this.strDay(user, day);
  }

  private strDay(user: User, property: string): string {
    const childMonday = this.strProperty(user.childs, property);
    const AcMonday = this.strProperty(user.accompanists, property);
    let strResult = '';
    if (childMonday || AcMonday) {
      if (childMonday) {
        strResult = strResult + '(E)' + childMonday;
      }
      if (childMonday && AcMonday) {
        strResult = strResult + ' - ';
      }
      if (AcMonday) {
        strResult = strResult + '(A)' + AcMonday;
      }
    }
    return strResult;
  }

  private strProperty(list: Array<Person>, property: string): string {
    if (!list) {
      return;
    }
    const countDay = this.userService.countByDay(list, property);
    const values = Object.keys(countDay).map(k => countDay[k] + '=' + Ride[k]);
    return values.join(', ');
  }

}
