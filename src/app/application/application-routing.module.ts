import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from '../_shared/layout/layout.component';
import {RoleGuard} from '../_core/guards/role.guard';
import {Role} from '../_core/models/role';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () => (await import('./dashboard/dashboard.module')).DashboardModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN], animation: 'isLeft'} // this for Admin Role
      },
      {
        path: 'dashboard',
        loadChildren: async () => (await import('./dashboard/dashboard.module')).DashboardModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN], animation: 'isLeft'} // this for Admin Role
      },
      {
        path: 'task',
        loadChildren: async () => (await import('./task/task.module')).TaskModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN], animation: 'isRight'} // this for Admin Role
      },
      {
        path: 'categorie',
        loadChildren: async () => (await import('./categorie/categorie.module')).CategorieModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN], animation: 'isRight'} // this for Admin Role
      },
      {
        path: 'language',
        loadChildren: async () => (await import('./language/language.module')).LanguageModule,
        data: {roles: [Role.ADMIN], animation: 'isLeft'}
      },
      {
        path: 'book',
        loadChildren: async () => (await import('./book/book.module')).BookModule,
        data: {roles: [Role.ADMIN], animation: 'isRight'}
      },
      {
        path: 'account',
        loadChildren: async () => (await import('./account/account.module')).AccountModule,
        data: {animation: 'isLeft'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
