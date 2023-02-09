import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IndividualConfig  } from 'ngx-toastr';

import { Toast } from '../../interfaces/toast';

import { ToastService } from '../../services/toast/toast.service';
import { GroupService } from '../../services/group/group.service';

@Component({
	selector: 'app-group-delete',
	templateUrl: './group-delete.component.html',
	styleUrls: ['./group-delete.component.css']
})
export class GroupDeleteComponent implements OnInit {
	constructor(private route: ActivatedRoute, private router: Router, private toastService: ToastService, private groupService: GroupService) { }

	// Inisialisasi Interface Toast
	toast!: Toast;

	// Data Group
	groupId = 0;
	groupName = '';

	ngOnInit(): void {
		// Get Data Group by Id
		this.route.paramMap.subscribe((param) => {
			const groupId = Number(param.get('id'));
			this.dataGroupById(groupId);
		});
	}

	// Get Data Group by Id
	// mengambil data group berdasarkan id dari database
	dataGroupById(id: number) {
		this.groupService.getDataGroupById(id).subscribe(res => {
			this.groupId = res.id;
			this.groupName = res.group_name;
		});
	}

	// Delete Data Group
	// menghapus data group yang ada didalam database
	deleteGroup() {
		this.groupService.deleteDataGroup(this.groupId).subscribe({
			next: (data) => {
				// Tampilkan Toast Success
				this.toast = { message: '<small>Delete group success</small>', title: 'Success', type: 'success', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
				this.toastService.showToast(this.toast);

				// Redirect ke Halaman Group List
				setTimeout(() => {
					this.router.navigate(['/group-list']);
				}, 2000);
			},
			error: (err) => {
				// Tampilkan Toast Error
				this.toast = { message: '<small>Delete group failed</small>', title: 'Error', type: 'error', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
				this.toastService.showToast(this.toast);
			}
		});
	}
}
