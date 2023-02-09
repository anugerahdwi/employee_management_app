import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Employees } from '../../interfaces/employees';

import { EmployeeService } from '../../services/employee/employee.service';

@Component({
	selector: 'app-employee-detail',
	templateUrl: './employee-detail.component.html',
	styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
	constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) {
		// simpan sementara data pencarian employee jika ada
		if (history.state.data.search != '') {
			this.searchEmployee = history.state.data.search;
		}
	}

	// Data Search Employee
	searchEmployee = '';

	// Data Form Detail Employee
	detailEmployeeFormData: Employees = {
		id: 0,
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		birth_date: '',
		basic_salary: '',
		status: '',
		group: '',
		description: ''
	};

	// Inisialisasi FormGroup Form Detail Employee
	detailEmployeeForm: FormGroup = new FormGroup({
		first_name: new FormControl(''),
		last_name: new FormControl(''),
		username: new FormControl(''),
		email: new FormControl(''),
		birth_date: new FormControl(''),
		basic_salary: new FormControl(''),
		status: new FormControl(''),
		group: new FormControl(''),
		description: new FormControl('')
	});

	ngOnInit(): void {
		// Get Data Employee by Id
		this.route.paramMap.subscribe((param) => {
			const employeeId = Number(param.get('id'));
			this.dataEmployeeById(employeeId);
		});
	}

	// Get Data Employee by Id
	// mengambil data employee berdasarkan id dari database
	dataEmployeeById(id: number) {
		this.employeeService.getDataEmployeeById(id).subscribe(res => {
			this.detailEmployeeFormData = res;
		});
	}

	// Router Navigate Kembali
	// mengarahkan kembali ke halaman employee list dengan membawa data pencarian employee
	routerNavigateBack() {
		if (this.searchEmployee != '') {
			let dataExtras = { search: this.searchEmployee }
			let navigationExtras: NavigationExtras = {
				state: {
					data: dataExtras
				}
			};
	
			this.router.navigate(['/employee-list'], navigationExtras);
		} else {
			this.router.navigate(['/employee-list']);
		}
	}
}
