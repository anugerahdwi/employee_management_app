import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { IndividualConfig  } from 'ngx-toastr';

import { Toast } from '../../interfaces/toast';
import { Groups } from '../../interfaces/groups';
import { Employees } from '../../interfaces/employees';

import { ToastService } from '../../services/toast/toast.service';
import { GroupService } from '../../services/group/group.service';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
	selector: 'app-employee-edit',
	templateUrl: './employee-edit.component.html',
	styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
	constructor(private route: ActivatedRoute, private router: Router, private formbuilder: FormBuilder, private toastService: ToastService, private groupService: GroupService, private employeeService: EmployeeService) {
		// simpan sementara data pencarian employee jika ada
		if (history.state.data.search != '') {
			this.searchEmployee = history.state.data.search;
		}
	}

	// Inisialisasi Interface Toast
	toast!: Toast;

	// Mengambil Tanggal Saat Ini
	currentDate = new Date();

	// Data Search Employee
	searchEmployee = '';

	// Data Group
	allGroup: Groups[] = [];

	// Data Form Edit Employee
	editEmployeeFormData: Employees = {
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

	// Inisialisasi FormGroup Form Edit Employee
	editEmployeeForm: FormGroup = new FormGroup({
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
	submitted = false;

	// Handling Data Form Employee
	get f(): { [key: string]: AbstractControl } {
		return this.editEmployeeForm.controls;
	}

	ngOnInit(): void {
		// Get Data Group
		this.dataGroup();

		// Get Data Employee by Id
		this.route.paramMap.subscribe((param) => {
			const employeeId = Number(param.get('id'));
			this.dataEmployeeById(employeeId);
		});

		// Ketentuan Form Validation
		this.editEmployeeForm = this.formbuilder.group({
			first_name: ['', [Validators.required, Validators.maxLength(30)]],
			last_name: ['', [Validators.required, Validators.maxLength(30)]],
			username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
			email: ['', [Validators.required, Validators.email]],
			birth_date: ['', [Validators.required]],
			basic_salary: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
			status: ['', [Validators.required]],
			group: ['', [Validators.required]],
			description: ['', [Validators.required]]
		});
	}

	// Get Data Group
	// mengambil semua data group dari database
	dataGroup() {
		this.groupService.getDataGroup().subscribe(res => {
			this.allGroup = res;
		});
	}

	// Get Data Employee by Id
	// mengambil data employee berdasarkan id dari database
	dataEmployeeById(id: number) {
		this.employeeService.getDataEmployeeById(id).subscribe(res => {
			this.editEmployeeFormData = res;
		});
	}

	// Edit Data Employee
	// mengedit data employee yang ada didalam database
	editEmployee() {
		this.submitted = true;

		// Jika Form Validation Invalid
		// memberikan notifikasi form validation invalid
		if (this.editEmployeeForm.invalid) {
			return;
		}
		// Jika Form Validation Valid
		// melanjutkan proses edit data employee
		else {
			this.employeeService.editDataEmployee(this.editEmployeeFormData).subscribe({
				next: (data) => {
					// Tampilkan Toast Success
					this.toast = { message: '<small>Edit employee success</small>', title: 'Success', type: 'success', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
					this.toastService.showToast(this.toast);

					// Redirect ke Halaman Employee List
					setTimeout(() => {
						this.router.navigate(['/employee-list']);
					}, 2000);
				},
				error: (err) => {
					// Tampilkan Toast Error
					this.toast = { message: '<small>Edit employee failed</small>', title: 'Error', type: 'error', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
					this.toastService.showToast(this.toast);
				}
			});
		}
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
