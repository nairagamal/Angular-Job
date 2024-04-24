import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  searchText: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  viewDetails(userId: number) {
    this.router.navigate(['/users', userId]); // Navigate to '/users/:userId' route
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any>('https://reqres.in/api/users').subscribe(response => {
      this.users = response.data;
    });
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.first_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.last_name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
