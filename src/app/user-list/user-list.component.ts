import {Component, OnInit, ViewChildren} from '@angular/core';
import {DatabaseWrapper, User, UsersFilter} from '../app.model';
import {NotifService} from '../service/notif.service';
import {UserService} from '../service/user.service';
import {UserItemComponent} from '../user-item/user-item.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  private users: Array<DatabaseWrapper<User>>;
  public showSpinner = true;
  public panelsOpened: Array<string> = [];
  public filter = new UsersFilter();

  @ViewChildren(UserItemComponent)
  private userItemComponents: Array<UserItemComponent>;

  constructor(private userService: UserService, private notifService: NotifService) {
  }

  public ngOnInit(): void {
    this.userService.getUsers().subscribe((r) => {
      this.showSpinner = false;
      this.users = r;
    });
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
    this.userService.addUser(this.users).then(() => this.notifService.show('Nouvel utilisateur ajouté'));
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
}
