import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	constructor(private router: Router, private formbuilder: FormBuilder, private authenticationService: AuthenticationService) {
		// Jika Status Login Akun 'Aktif'
        // redirect ke halaman home
		if (this.authenticationService.loggedIn) {  
			this.router.navigate(['home']);  
		}  
	}

	// Inisialisasi FormGroup Form Login
	loginForm: FormGroup = new FormGroup({
		username: new FormControl(''),
		password: new FormControl('')
	});
	submitted = false;

	// Handling Data Form Login
	get f(): { [key: string]: AbstractControl } {
		return this.loginForm.controls;
	}

	ngOnInit(): void {
		// Ketentuan Form Validation
		this.loginForm = this.formbuilder.group({
			username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
			password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
		});
	}

	// Login Akun
	// melakukan login akun dengan autentikasi username dan password
	login() {
		this.submitted = true;

		// Jika Form Validation Invalid
		// memberikan notifikasi form validation invalid
		if (this.loginForm.invalid) {
			return;
		}
		// Jika Form Validation Valid
		// melanjutkan proses login akun
		else {
			this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password);
		}
	}
}
