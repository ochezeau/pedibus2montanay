import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {PlanningComponent} from './planning/planning.component';

const appRoutes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'planning', component: PlanningComponent},
  {path: '**', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
