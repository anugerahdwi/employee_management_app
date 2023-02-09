import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuardService } from './services/authentication/authentication-guard.service';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './components/employee-delete/employee-delete.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupAddComponent } from './components/group-add/group-add.component';
import { GroupEditComponent } from './components/group-edit/group-edit.component';
import { GroupDeleteComponent } from './components/group-delete/group-delete.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuardService] },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthenticationGuardService] },
  { path: 'employee-add', component: EmployeeAddComponent, canActivate: [AuthenticationGuardService] },
  { path: 'employee-edit/:id', component: EmployeeEditComponent, canActivate: [AuthenticationGuardService] },
  { path: 'employee-delete/:id', component: EmployeeDeleteComponent, canActivate: [AuthenticationGuardService] },
  { path: 'employee-detail/:id', component: EmployeeDetailComponent, canActivate: [AuthenticationGuardService] },
  { path: 'group-list', component: GroupListComponent, canActivate: [AuthenticationGuardService] },
  { path: 'group-add', component: GroupAddComponent, canActivate: [AuthenticationGuardService] },
  { path: 'group-edit/:id', component: GroupEditComponent, canActivate: [AuthenticationGuardService] },
  { path: 'group-delete/:id', component: GroupDeleteComponent, canActivate: [AuthenticationGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
