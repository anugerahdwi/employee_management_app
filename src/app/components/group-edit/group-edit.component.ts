import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { IndividualConfig  } from 'ngx-toastr';

import { Toast } from '../../interfaces/toast';
import { Groups } from '../../interfaces/groups';

import { ToastService } from '../../services/toast/toast.service';
import { GroupService } from '../../services/group/group.service';

@Component({
	selector: 'app-group-edit',
	templateUrl: './group-edit.component.html',
	styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
	constructor(private route: ActivatedRoute, private router: Router, private formbuilder: FormBuilder, private toastService: ToastService, private groupService: GroupService) { }

	// Inisialisasi Interface Toast
	toast!: Toast;

	// Data Form Edit Group
	editGroupFormData: Groups = {
		id: 0,
		group_name: ''
	};

	// Inisialisasi FormGroup Form Edit Group
	editGroupForm: FormGroup = new FormGroup({
		group_name: new FormControl('')
	});
	submitted = false;

	// Handling Data Form Group
	get f(): { [key: string]: AbstractControl } {
		return this.editGroupForm.controls;
	}

	ngOnInit(): void {
		// Get Data Group by Id
		this.route.paramMap.subscribe((param) => {
			const groupId = Number(param.get('id'));
			this.dataGroupById(groupId);
		});

		// Ketentuan Form Validation
		this.editGroupForm = this.formbuilder.group({
			group_name: ['', [Validators.required]]
		});
	}

	// Get Data Group by Id
	// mengambil data group berdasarkan id dari database
	dataGroupById(id: number) {
		this.groupService.getDataGroupById(id).subscribe(res => {
			this.editGroupFormData = res;
		});
	}

	// Edit Data Group
	// mengedit data group yang ada didalam database
	editGroup() {
		this.submitted = true;

		// Jika Form Validation Invalid
		// memberikan notifikasi form validation invalid
		if (this.editGroupForm.invalid) {
			return;
		}
		// Jika Form Validation Valid
		// melanjutkan proses edit data group
		else {
			this.groupService.editDataGroup(this.editGroupFormData).subscribe({
				next: (data) => {
					// Tampilkan Toast Success
					this.toast = { message: '<small>Edit group success</small>', title: 'Success', type: 'success', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
					this.toastService.showToast(this.toast);

					// Redirect ke Halaman Group List
					setTimeout(() => {
						this.router.navigate(['/group-list']);
					}, 2000);
				},
				error: (err) => {
					// Tampilkan Toast Error
					this.toast = { message: '<small>Edit group failed</small>', title: 'Error', type: 'error', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
					this.toastService.showToast(this.toast);
				}
			});
		}
	}
}
