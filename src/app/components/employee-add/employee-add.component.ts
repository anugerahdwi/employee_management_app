import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { IndividualConfig  } from 'ngx-toastr';

import { Toast } from '../../interfaces/toast';
import { Groups } from '../../interfaces/groups';
import { Employees } from '../../interfaces/employees';

import { ToastService } from '../../services/toast/toast.service';
import { GroupService } from '../../services/group/group.service';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
	selector: 'app-employee-add',
	templateUrl: './employee-add.component.html',
	styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
	constructor(private router: Router, private formbuilder: FormBuilder, private toastService: ToastService, private groupService: GroupService, private employeeService: EmployeeService) { }

	// Inisialisasi Interface Toast
	toast!: Toast;

	// Mengambil Tanggal Saat Ini
	currentDate = new Date();

	// Data Group dan Employee Id
	allGroup: Groups[] = [];
	employeeId = 0;

	// Data Form Add Employee
	addEmployeeFormData: Employees = {
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

	// Inisialisasi FormGroup Form Add Employee
	addEmployeeForm: FormGroup = new FormGroup({
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
		return this.addEmployeeForm.controls;
	}

	ngOnInit(): void {
		// Get Data Group
		this.dataGroup();

		// Generate Employee Id
		this.generateEmployeeId();

		// Ketentuan Form Validation
		this.addEmployeeForm = this.formbuilder.group({
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

	// Generate Employee Id
	// generate nomor id employee untuk disimpan ke database
	generateEmployeeId() {
		this.employeeService.getDataEmployee().subscribe(res => {
			const employeeId = res[res.length-1].id + 1;
			this.addEmployeeFormData.id = employeeId;
		});
	}

	// Tambah Data Employee
	// menambahkan data employee baru kedalam database
	addEmployee() {
		this.submitted = true;

		// Jika Form Validation Invalid
		// memberikan notifikasi form validation invalid
		if (this.addEmployeeForm.invalid) {
			return;
		}
		// Jika Form Validation Valid
		// melanjutkan proses tambah data employee
		else {
			this.employeeService.addDataEmployee(this.addEmployeeFormData).subscribe({
				next: (data) => {
					// Tampilkan Toast Success
					this.toast = { message: '<small>Add employee success</small>', title: 'Success', type: 'success', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
					this.toastService.showToast(this.toast);

					// Redirect ke Halaman Employee List
					setTimeout(() => {
						this.router.navigate(['/employee-list']);
					}, 2000);
				},
				error: (err) => {
					// Tampilkan Toast Error
					this.toast = { message: '<small>Add employee failed</small>', title: 'Error', type: 'error', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
					this.toastService.showToast(this.toast);
				}
			});
		}
	}
}
