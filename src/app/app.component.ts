import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { HocsinhComponent } from './hocsinh/hocsinh.component';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { Routes } from '@angular/router'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, SidebarComponent, RouterModule, CommonModule]
})
//baongoc
export class AppComponent {
  showLayout = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !event.url.includes('/login');
      }
    });
  }
}
export const routes: Routes = [
  { path: '', component: QuestionManagementComponent }, // Hiển thị component khi truy cập root
  { path: '**', redirectTo: '' } // Redirect mọi đường dẫn không hợp lệ về root
];
