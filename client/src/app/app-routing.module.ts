import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInfoDisplayComponent } from './personal-info-display/personal-info-display.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { ErrorComponent } from './error/error.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "adminHomepage", component: AdminHomepageComponent },
  { path: "addinfo", component: PersonalInfoComponent },
  { path: "userlist", component: UserListComponent },
  { path: "editinfo", component: PersonalInfoDisplayComponent },
  { path: "createrole", component: CreateRoleComponent },
  { path: "createuser", component: CreateUserComponent },
  { path: "error", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
