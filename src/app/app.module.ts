import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { HeaderChildComponent } from './components/header-child/header-child.component';
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

@NgModule({
	declarations: [
		AppComponent,
		HeaderMainComponent,
		HeaderChildComponent,
		LoginComponent,
		HomeComponent,
		EmployeeListComponent,
		EmployeeAddComponent,
		EmployeeEditComponent,
		EmployeeDeleteComponent,
		EmployeeDetailComponent,
		GroupListComponent,
		GroupAddComponent,
		GroupEditComponent,
		GroupDeleteComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		ToastrModule.forRoot(),
		NgxPaginationModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
