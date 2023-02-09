import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employees } from '../../interfaces/employees';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {
	constructor(private http: HttpClient) { }

	// Get Data Employee
	// mengambil semua data employee dari database
    getDataEmployee() {
		return this.http.get<Employees[]>('http://localhost:3000/employees');
	}

	// Get Data Employee Descending
	// mengambil semua data employee dengan sort descending dari database
    getDataEmployeeDesc() {
		return this.http.get<Employees[]>('http://localhost:3000/employees?_sort=id&_order=desc');
	}

	// Get Data Employee by Id
	// mengambil data employee berdasarkan id dari database
    getDataEmployeeById(id: number) {
		return this.http.get<Employees>('http://localhost:3000/employees/' + id);
	}

	// Search Data Employee
	// mencari data employee berdasarkan parameter
	searchDataEmployee(parameter: string, value: string) {
		return this.http.get<Employees[]>('http://localhost:3000/employees?' + parameter + '_like=' + value);
	}

	// Add Data Employee
	// menambahkan data employee baru kedalam database
    addDataEmployee(payload: Employees) {
		return this.http.post<Employees>('http://localhost:3000/employees', payload);
	}

	// Edit Data Employee
	// mengedit data employee yang ada didalam database
	editDataEmployee(payload: Employees) {
		return this.http.put('http://localhost:3000/employees/' + payload.id, payload);
	}

	// Delete Data Employee
	// menghapus data employee yang ada didalam database
    deleteDataEmployee(id: number) {
		return this.http.delete<Employees>('http://localhost:3000/employees/' + id);
	}
}
