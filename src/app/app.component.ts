import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <app-header *ngIf="showLayout"></app-header>
    <div class="main-container">
      <app-sidebar *ngIf="showLayout"></app-sidebar>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .main-container {
      display: flex;
      min-heights: calc(100vh - 60px);
    }
  `],
  imports: [HeaderComponent, SidebarComponent, RouterModule]
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