import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';
import { AccountService } from '../services/account-service.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router) { }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Login failed:', err);
      }
    });
  }  
}
