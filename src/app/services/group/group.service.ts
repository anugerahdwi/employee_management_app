import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Groups } from '../../interfaces/groups';

@Injectable({
	providedIn: 'root'
})
export class GroupService {
	constructor(private http: HttpClient) { }

	// Get Data Group
	// mengambil semua data group dari database
    getDataGroup() {
		return this.http.get<Groups[]>('http://localhost:3000/groups');
	}

	// Get Data Group Descending
	// mengambil semua data group dengan sort descending dari database
    getDataGroupDesc() {
		return this.http.get<Groups[]>('http://localhost:3000/groups?_sort=id&_order=desc');
	}

	// Get Data Group by Id
	// mengambil data group berdasarkan id dari database
    getDataGroupById(id: number) {
		return this.http.get<Groups>('http://localhost:3000/groups/' + id);
	}

	// Search Data Group
	// mencari data group berdasarkan parameter
	searchDataGroup(parameter: string, value: string) {
		return this.http.get<Groups[]>('http://localhost:3000/groups?' + parameter + '_like=' + value);
	}

	// Add Data Group
	// menambahkan data group baru kedalam database
    addDataGroup(payload: Groups) {
		return this.http.post<Groups>('http://localhost:3000/groups', payload);
	}

	// Edit Data Group
	// mengedit data group yang ada didalam database
	editDataGroup(payload: Groups) {
		return this.http.put('http://localhost:3000/groups/' + payload.id, payload);
	}

	// Delete Data Group
	// menghapus data group yang ada didalam database
    deleteDataGroup(id: number) {
		return this.http.delete<Groups>('http://localhost:3000/groups/' + id);
	}
}
