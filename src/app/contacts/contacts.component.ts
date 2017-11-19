import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService } from "../service/user.service";
import { DatabaseWrapper, User } from "../app.model";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.sass"],
  encapsulation: ViewEncapsulation.None
})
export class ContactsComponent implements OnInit {
  public users: Array<DatabaseWrapper<User>>;
  public showSpinner = true;

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.userService.getUsers().subscribe(u => {
      this.users = u.sort((a, b) => {
        if (a.value.name < b.value.name)
          return -1;
        if (a.value.name > b.value.name)
          return 1;
        return 0;
      });
      this.showSpinner = false;
    });
  }

  public printContacts(): void {
    window.print();
  }
}
