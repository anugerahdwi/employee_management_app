import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Toast } from '../../interfaces/toast';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	constructor(private toastr: ToastrService) { 
		// Define Toastr GlobalConfig
		this.toastr.toastrConfig.enableHtml = true;
	}

	// Tampilkan Toast
	// menampilkan notifikasi toast
	showToast(toast: Toast) {
		this.toastr.show(
			toast.message,
			toast.title,
			toast.ic,
			'toast-' + toast.type
		);
	}
}
