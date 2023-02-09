import { Component, OnInit } from '@angular/core';

import { GroupService } from '../../services/group/group.service';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	constructor(private groupService: GroupService, private employeeService: EmployeeService) { }

	// Data Total Group dan Employee
	totalGroup = 0;
	totalEmployee = 0;

	ngOnInit(): void {
		// Hitung Total Data
		// menghitung jumlah total data group dan employee
		this.countTotalGroup();
		this.countTotalEmployee();
	}

	// Hitung Total Data Group
	// menghitung jumlah total data group
	countTotalGroup() {
		this.groupService.getDataGroup().subscribe(res => {
			this.totalGroup = res.length;
		});
	}

	// Hitung Total Data Employee
	// menghitung jumlah total data employee
	countTotalEmployee() {
		this.employeeService.getDataEmployee().subscribe(res => {
			this.totalEmployee = res.length;
		});
	}
}
