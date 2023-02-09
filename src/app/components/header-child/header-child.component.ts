import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
	selector: 'app-header-child',
	templateUrl: './header-child.component.html',
	styleUrls: ['./header-child.component.css']
})
export class HeaderChildComponent implements OnInit {
	constructor(private router: Router, private authenticationService: AuthenticationService) { }

	// Data Session Login
	accountName = localStorage.getItem('accountName');

	ngOnInit(): void {
	}

	// Logout Akun
	// melakukan logout akun dan menghapus session login akun
	logout() {
		this.authenticationService.logout();  
		this.router.navigate(['']);  
	}  
}
