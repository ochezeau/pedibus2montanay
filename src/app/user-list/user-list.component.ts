import { Component, OnInit, ViewChild } from "@angular/core";
import { DatabaseWrapper, Person, User, UsersFilter } from "../app.model";
import { NotifService } from "../service/notif.service";
import { UserService } from "../service/user.service";
import { UserItemComponent } from "../user-item/user-item.component";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.sass"]
})
export class UserListComponent implements OnInit {
  private readonly DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  private users: Array<DatabaseWrapper<User>>;
  private filtredUsers: Array<DatabaseWrapper<User>>;
  public showSpinner = true;
  public panelsOpened: Array<string> = [];
  public filter = new UsersFilter();

  private userItemComponents: Array<UserItemComponent>;

  @ViewChild("f")
  public form: NgForm;

  constructor(private userService: UserService, private notifService: NotifService) {
  }

  public ngOnInit(): void {
    this.userService.getUsers().subscribe((r) => {
      this.showSpinner = false;
      this.users = r;
      this.filtredUsers = this.users.sort(this.userService.sort);
    });
  }

  @ViewChild("f")
  public set formFilter(form: NgForm) {
    this.form = form;
    if (this.form) {
      this.form.valueChanges.subscribe(() => {
        this.doFilter();
      });
    }
  }

  public panelOpen(user: DatabaseWrapper<User>): void {
    if (!this.panelsOpened.includes(user.key)) {
      this.panelsOpened.push(user.key);
    }
  }

  public panelClose(user: DatabaseWrapper<User>): void {
    const i = this.panelsOpened.indexOf(user.key);
    if (i !== -1) {
      this.panelsOpened.splice(i, 1);
    }
  }

  public expanded(user: DatabaseWrapper<User>): boolean {
    return this.panelsOpened.indexOf(user.key) !== -1;
  }

  public addUser(): void {
    this.userService.addUser(this.users).then(() => this.notifService.show("Nouvel utilisateur ajouté"));
  }

  public get invalid(): boolean {
    if (!this.userItemComponents) {
      return false;
    }
    return this.userItemComponents.find(c => c.formInvalid) !== undefined;
  }

  public clearFilter(): void {
    this.filter = new UsersFilter();
  }

  public doFilter(): void {
    const days = this.filter.days.length > 0 ? this.filter.days : this.DAYS;

    let result = this.filterForDay(this.filter, days, this.users, (d, p) => true);
    if (this.filter.familly) {
      result = result.filter(u => u.value.name.toLowerCase().includes(this.filter.familly.toLowerCase()));
    }

    if (this.filter.exception) {
      result = this.filterForDay(this.filter, days, result, (d, p) => p[this.userService.exProp(d)] !== undefined);
    }

    if (this.filter.ride) {
      result = this.filterForDay(this.filter, days, result, (d, p) => this.startWith(p, d, this.filter.ride));
    }

    if (this.filter.occasional && this.filter.occasional.length > 0) {
      result = this.filterForDay(this.filter, days, result, (d, p) => this.contains(p, d, this.filter.occasional));
    }

    this.filtredUsers = result.sort(this.userService.sort);
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

  private filterForDay(userFilter: UsersFilter, days: Array<string>, result: Array<DatabaseWrapper<User>>, filter: (string, Person) => boolean): Array<DatabaseWrapper<User>> {
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
        return days.filter(d => (p[d] !== undefined || p[d] === undefined && days.length === 5 || p[this.userService.exProp(d)] !== undefined) && filter(d, p)).length > 0;
      }).length > 0;
    });
  }

}
