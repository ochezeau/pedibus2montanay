import { Pipe, PipeTransform } from "@angular/core";
import { DatabaseWrapper, Person, User, UsersFilter } from "../app.model";
import { UserService } from "../service/user.service";

@Pipe({
  name: "userListFilter",
  pure: false
})
export class UserListFilterPipe implements PipeTransform {
  private readonly DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  constructor(private userService: UserService) {
  }

  public transform(users: Array<DatabaseWrapper<User>>, filter: UsersFilter): Array<DatabaseWrapper<User>> {
    const days = filter.days.length > 0 ? filter.days : this.DAYS;

    let result = this.filterForDay(filter, days, users, (d, p) => true);
    if (filter.familly) {
      result = result.filter(u => u.value.name.toLowerCase().includes(filter.familly.toLowerCase()));
    }

    if (filter.exception) {
      result = this.filterForDay(filter, days, result, (d, p) => p[this.userService.exProp(d)] !== undefined);
    }

    if (filter.ride) {
      result = this.filterForDay(filter, days, result, (d, p) => this.startWith(p, d, filter.ride));
    }

    if (filter.occasional && filter.occasional.length > 0) {
      result = this.filterForDay(filter, days, result, (d, p) => this.contains(p, d, filter.occasional));
    }

    return result;
  }

  private startWith(p: Person, day: string, value: string): boolean {
    return p[day] && p[day].toString().startsWith(value) || p[this.userService.exProp(day)] &&
      p[this.userService.exProp(day)].toString().startsWith(value);
  }

  private contains(p: Person, day: string, oc: Array<string>): boolean {
    return oc.filter(o => {
      return p[day] && p[day].toString().includes(o) || p[this.userService.exProp(day)] && p[this.userService.exProp(day)].toString().includes(o);
    }).length > 0;
  }

  public filterForDay(userFilter: UsersFilter, days: Array<string>, result: Array<DatabaseWrapper<User>>, filter: (string, Person) => boolean): Array<DatabaseWrapper<User>> {
    return result.filter(u => {
      const persons: Array<Person> = [];
      if (userFilter.person) {
        persons.push(...u.value[userFilter.person]);
      } else {
        persons.push(...u.value.accompanists);
        persons.push(...u.value.childs);
      }
      if (persons.length === 0) {
        return result;
      }
      return persons.filter(p => {
        return days.filter(d => (p[d] !== undefined || p[this.userService.exProp(d)] !== undefined) && filter(d, p)).length > 0;
      }).length > 0;
    });
  }

}
