import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { PlanningComponent } from "./planning/planning.component";
import { AuthGuard } from "./service/auth.service";
import { LoginComponent } from "./login/login.component";
import { ContactsComponent } from "./contacts/contacts.component";

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "users", component: UserListComponent, canActivate: [AuthGuard]},
  {path: "planning", component: PlanningComponent, canActivate: [AuthGuard], data: {type: "current"}},
  {path: "history", component: PlanningComponent, canActivate: [AuthGuard], data: {type: "history"}},
  {path: "contacts", component: ContactsComponent, canActivate: [AuthGuard]},
  {path: "**", component: UserListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
