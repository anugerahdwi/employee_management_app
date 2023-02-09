import { Component, OnInit } from '@angular/core';

import { Groups } from '../../interfaces/groups';

import { GroupService } from '../../services/group/group.service';

@Component({
	selector: 'app-group-list',
	templateUrl: './group-list.component.html',
	styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
	constructor(private groupService: GroupService) { }

	// Data Group dan Search
	allGroup: Groups[] = [];
	searchGroup = '';

	// Data Pagination
	currentPage: number = 1;
	itemsPerPage: number = 5;
	totalItems: number = 0;
	tableSize: number[] = [5, 10, 15, 20];

	ngOnInit(): void {
		// Get Data Group
		this.dataGroup();
	}

	// Get Data Group
	// mengambil semua data group dari database
	dataGroup() {
		this.groupService.getDataGroupDesc().subscribe(res => {
			this.allGroup = res;
		});
	}

	// Search Data Group
	// mencari data group dan menampilkan kedalam tabel
	searchDataGroup() {
		if (this.searchGroup !== '') {
			// mencari data employee berdasarkan 'group_name'
			this.groupService.searchDataGroup('group_name', this.searchGroup).subscribe(res => {
				if (res.length == 0) {
					this.allGroup = [];
				} else {
					this.allGroup = res;
				}
			});
		}
		else { 
			this.groupService.getDataGroupDesc().subscribe(res => {
				this.allGroup = res;
			});
		}
	}

	// Ukuran Data Per Page
	// set jumlah data yang ditampilkan di tabel per page
	setDataTableSize(event: any): void {
		this.itemsPerPage = event.target.value;
		this.currentPage = 1;
		this.dataGroup();
	}

	// Pagination Tabel
	// set ukuran pagination tabel
	setDataTablePagination(event: any) {
		this.currentPage = event;
		this.dataGroup();
	}
}
