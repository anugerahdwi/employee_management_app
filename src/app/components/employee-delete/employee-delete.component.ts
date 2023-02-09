import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { IndividualConfig  } from 'ngx-toastr';

import { Toast } from '../../interfaces/toast';

import { ToastService } from '../../services/toast/toast.service';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
	selector: 'app-employee-delete',
	templateUrl: './employee-delete.component.html',
	styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
	constructor(private route: ActivatedRoute, private router: Router, private toastService: ToastService, private employeeService: EmployeeService) {
		// simpan sementara data pencarian employee jika ada
		if (history.state.data.search != '') {
			this.searchEmployee = history.state.data.search;
		}
	}

	// Inisialisasi Interface Toast
	toast!: Toast;

	// Data Search Employee
	searchEmployee = '';

	// Data Employee
	employeeId = 0;
	employeeName = '';

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
			this.employeeId = res.id;
			this.employeeName = res.first_name + ' ' + res.last_name;
		});
	}

	// Delete Data Employee
	// menghapus data employee yang ada didalam database
	deleteEmployee() {
		this.employeeService.deleteDataEmployee(this.employeeId).subscribe({
			next: (data) => {
				// Tampilkan Toast Success
				this.toast = { message: '<small>Delete employee success</small>', title: 'Success', type: 'success', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
				this.toastService.showToast(this.toast);

				// Redirect ke Halaman Employee List
				setTimeout(() => {
					this.router.navigate(['/employee-list']);
				}, 2000);
			},
			error: (err) => {
				// Tampilkan Toast Error
				this.toast = { message: '<small>Delete employee failed</small>', title: 'Error', type: 'error', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
				this.toastService.showToast(this.toast);
			}
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
