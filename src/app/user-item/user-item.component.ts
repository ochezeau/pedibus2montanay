import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { DatabaseWrapper, User } from "../app.model";
import { NgForm } from "@angular/forms";
import { UserService } from "../service/user.service";
import { NotifService } from "../service/notif.service";
import { ChildListComponent } from "../child-list/child-list.component";
import { AccompanistListComponent } from "../accompanist-list/accompanist-list.component";
import { MatDialog } from "@angular/material";
import { UserDeleteDialogComponent } from "../user-delete-dialog/user-delete-dialog.component";

@Component({
  selector: "app-user-item",
  templateUrl: "./user-item.component.html",
  styleUrls: ["./user-item.component.sass"]
})
export class UserItemComponent implements OnInit, OnChanges {

  @Input()
  public user: DatabaseWrapper<User>;

  @Input()
  public expanded: boolean;

  @ViewChild("f")
  public form: NgForm;

  @ViewChild(ChildListComponent)
  public childListComponent;

  @ViewChild(AccompanistListComponent)
  public accompanistListComponent;

  @Output()
  public open = new EventEmitter<DatabaseWrapper<User>>();

  @Output()
  public close = new EventEmitter<DatabaseWrapper<User>>();

  private savedUser: string;
  public formUpdate = false;
  public deleting = false;

  constructor(private userService: UserService, private notifService: NotifService, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.formChange();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["user"]) {
      this.savedUser = JSON.stringify(this.user.value);
    }
  }

  public saveUser(user: DatabaseWrapper<User>, event: Event): void {
    event.stopPropagation();
    this.userService.updateUser(user).then(() => {
      this.savedUser = JSON.stringify(this.user.value);
      this.notifService.show("Mise à jour de " + user.value.name + " effectuée");
    });
  }

  public deleteUser(event: Event): void {
    let dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: "450px", data: this.user
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r) {
        this.deleting = true;
        this.userService.deleteUser(this.user).then(() => this.notifService.show("Suppression effectuée"));
      }
    });
  }

  public undoChange(): void {
    event.stopPropagation();
    this.user.value = JSON.parse(this.savedUser);
  }

  public onPanelOpen(user: DatabaseWrapper<User>): void {
    this.open.emit(user);
  }

  public hasException(day: string): boolean {
    const val = this.user.value;
    const childEx = val.childs && val.childs.filter(c => c[this.userService.exProp(day)] !== undefined).length > 0;
    const acEx = val.accompanists && val.accompanists.filter(c => c[this.userService.exProp(day)] !== undefined).length > 0;
    return childEx || acEx;
  }

  public onPanelClose(user: DatabaseWrapper<User>): void {
    this.close.emit(user);
  }

  public formChange(): void {
    const current = JSON.stringify(this.user.value);
    this.formUpdate = current !== this.savedUser;
  }

  public get formInvalid(): boolean {
    if (this.deleting) {
      return false;
    }
    return this.form.invalid || this.childListComponent.invalid || this.accompanistListComponent.invalid;
  }
}
