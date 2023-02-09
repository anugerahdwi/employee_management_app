import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { IndividualConfig  } from 'ngx-toastr';

import { Toast } from '../../interfaces/toast';

import { ToastService } from '../../services/toast/toast.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	constructor(private http: HttpClient, private router: Router, private toastService: ToastService) { }

	// Inisialisasi Interface Toast
	toast!: Toast;

	// Login Akun
	// melakukan login akun dengan autentikasi username dan password
	login(username: string, password: string)  {
		// Autentikasi Username dan Password
		this.http.get<any>('http://localhost:3000/accounts').subscribe(res => {
			const authentication = res.find((a: any) => {
				return a.username === username && a.password === password;
			});

			// Jika Autentikasi Berhasil
			// menyimpan session login akun dan redirect ke halaman home
			if (authentication) {
				// Menyimpan Session Login
				localStorage.setItem('isLogin', 'loggedIn');
				localStorage.setItem('accountName', authentication.name);

				// Tampilkan Toast Success
				this.toast = { message: '<small>Login success</small>', title: 'Success', type: 'success', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
				this.toastService.showToast(this.toast);

				// Redirect ke Halaman Home
				setTimeout(() => {
					this.router.navigate(['home']);
				}, 2000);
			}
			// Jika Autentikasi Gagagl
			// memberikan notifikasi login gagal
			else {
				// Tampilkan Toast Error
				this.toast = { message: '<small>Wrong username or password</small>', title: 'Error', type: 'error', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
				this.toastService.showToast(this.toast);
			}
		}, err => {
			// Tampilkan Toast Error
			this.toast = { message: '<small>Something went wrong</small>', title: 'Error', type: 'error', ic: { timeOut: 2000, closeButton: false } as IndividualConfig };
			this.toastService.showToast(this.toast);
		});
	}

	// Logout Akun
	// melakukan logout akun dan menghapus session login akun
	logout() {
		// Hapus Session Login
		localStorage.clear();
	}

	// Mengambil Status Login Akun
	// apakah status login akun 'aktif' atau 'tidak aktif'
	public get loggedIn(): boolean {
		return (localStorage.getItem('isLogin') !== null);
	}
}
