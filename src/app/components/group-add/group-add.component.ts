import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { IndividualConfig  } from 'ngx-toastr';

import { Toast } from '../../interfaces/toast';
import { Groups } from '../../interfaces/groups';

import { ToastService } from '../../services/toast/toast.service';
import { GroupService } from '../../services/group/group.service';

@Component({
	selector: 'app-group-add',
	templateUrl: './group-add.component.html',
	styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {
	constructor(private router: Router, private formbuilder: FormBuilder, private toastService: ToastService, private groupService: GroupService) { }

	// Inisialisasi Interface Toast
	toast!: Toast;

	// Data Form Add Group
	addGroupFormData: Groups = {
		id: 0,
		group_name: ''
	};

	// Inisialisasi FormGroup Form Add Group
	addGroupForm: FormGroup = new FormGroup({
		group_name: new FormControl('')
	});
	submitted = false;

	// Handling Data Form Group
	get f(): { [key: string]: AbstractControl } {
		return this.addGroupForm.controls;
	}

	ngOnInit(): void {
		// Generate Group Id
		this.generateGroupId();

		// Ketentuan Form Validation
		this.addGroupForm = this.formbuilder.group({
			group_name: ['', [Validators.required]]
		});
	}

	// Generate Group Id
	// generate nomor id group untuk disimpan ke database
	generateGroupId() {
		this.groupService.getDataGroup().subscribe(res => {
			const groupId = res[res.length-1].id + 1;
			this.addGroupFormData.id = groupId;
		});
	}

	// Tambah Data Group
	// menambahkan data group baru kedalam database
	addGroup() {
		this.submitted = true;

		// Jika Form Validation Invalid
		// memberikan notifikasi form validation invalid
		if (this.addGroupForm.invalid) {
			return;
		}
		// Jika Form Validation Valid
		// melanjutkan proses tambah data group
		else {
			this.groupService.addDataGroup(this.addGroupFormData).subscribe({
				next: (data) => {
					// Tampilkan Toast Success
					this.toast = { message: '<small>Add group success</small>', title: 'Success', type: 'success', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
					this.toastService.showToast(this.toast);

					// Redirect ke Halaman Group List
					setTimeout(() => {
						this.router.navigate(['/group-list']);
					}, 2000);
				},
				error: (err) => {
					// Tampilkan Toast Error
					this.toast = { message: '<small>Add group failed</small>', title: 'Error', type: 'error', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
					this.toastService.showToast(this.toast);
				}
			});
		}
	}
}
