import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { User } from "../app.model";

@Component({
  selector: "app-user-delete-dialog",
  templateUrl: "./user-delete-dialog.component.html",
  styleUrls: ["./user-delete-dialog.component.sass"],
  encapsulation: ViewEncapsulation.None
})
export class UserDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<UserDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User) {
  }

  onNoClick(): void {
  }
}
