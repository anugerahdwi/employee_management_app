import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {
	constructor(private router: Router) { }

    // Cek Status Login Akun
    canActivate() {
        // Jika Status Login Akun 'Aktif'
        // tetap di halaman yang sedang aktif
        if (localStorage.getItem('isLogin')) {
            return true;
        }
        // Jika Status Login Akun 'Tidak Aktif'
        // redirect ke halaman root/login
        else {
            this.router.navigate(['']);
            return false;
        }
    }
}
