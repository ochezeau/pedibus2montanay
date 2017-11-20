import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./app-material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "angularfire2/auth";
import { UserListComponent } from "./user-list/user-list.component";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserItemComponent } from "./user-item/user-item.component";
import { ChildItemComponent } from "./child-item/child-item.component";
import { UserService } from "./service/user.service";
import { NotifService } from "./service/notif.service";
import { ChildListComponent } from "./child-list/child-list.component";
import { FormDaysComponent } from "./form-days/form-days.component";
import { AccompanistItemComponent } from "./accompanist-item/accompanist-item.component";
import { AccompanistListComponent } from "./accompanist-list/accompanist-list.component";
import { UserSummaryDayPipe } from "./user-item/user-summary-day.pipe";
import { PlanningComponent } from "./planning/planning.component";
import { UserSummaryPersonPipe } from "./user-item/user-summary-person.pipe";
import { UserListFilterPipe } from "./user-list/user-list-filter.pipe";
import { PlanningService } from "./service/planning.service";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./service/auth.service";
import { ContactsComponent } from "./contacts/contacts.component";
import { UserDeleteDialogComponent } from "./user-delete-dialog/user-delete-dialog.component";
import { PlanningListPersonComponent } from "./planning-list-person/planning-list-person.component";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserItemComponent,
    ChildItemComponent,
    ChildListComponent,
    FormDaysComponent,
    AccompanistItemComponent,
    AccompanistListComponent,
    UserSummaryDayPipe,
    PlanningComponent,
    UserSummaryPersonPipe,
    UserListFilterPipe,
    LoginComponent,
    ContactsComponent,
    UserDeleteDialogComponent,
    PlanningListPersonComponent
  ],
  entryComponents: [
    UserDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [UserService, NotifService, PlanningService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
