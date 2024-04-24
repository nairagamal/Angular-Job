import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.fetchUserDetails(userId);
    }
  }

  fetchUserDetails(userId: string) {
    this.http.get<any>(`https://reqres.in/api/users/${userId}`).subscribe(
      response => {
        this.user = response.data;
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
