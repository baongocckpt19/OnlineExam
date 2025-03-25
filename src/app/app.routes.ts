import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HocsinhComponent } from './hocsinh/hocsinh.component';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { title } from 'process';
import { KiThiComponent } from './ki-thi/ki-thi.component';
import { DeThiComponent } from './de-thi/de-thi.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [authGuard]
  },
  {
    path: 'hocsinh',
    component: HocsinhComponent,
    data: { title: 'Học sinh' },
    canActivate: [authGuard]
  },
  {
    path: 'question-management',
    component: QuestionManagementComponent,
    data: {title:'Câu Hỏi'},
    canActivate : [authGuard]
  },
  {
    path: 'ki-thi',
    component: KiThiComponent,
    data: {title:'Kì Thi'},
    canActivate : [authGuard]
  },
  {
    path: 'de-thi',
    component: DeThiComponent,
    data: {title:'Đề Thi'},
    canActivate : [authGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
