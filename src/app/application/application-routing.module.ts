import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../_shared/layout/layout.component';
import {RoleGuard} from '../_core/guards/role.guard';
import {Role} from '../_core/models/role';
import {ImportExcelComponent} from '../_shared/components/import-excel/import-excel.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () => (await import('./dashboard/dashboard.module')).DashboardModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN, Role.BIBLIOTHECAIRE, Role.ADHERENT], animation: 'isLeft'} // this for Admin Role
      },
      {
        path: 'dashboard',
        loadChildren: async () => (await import('./dashboard/dashboard.module')).DashboardModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN, Role.BIBLIOTHECAIRE, Role.ADHERENT], animation: 'isLeft'} // this for Admin Role
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
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN], animation: 'isLeft'}
      },
      {
        path: 'book',
        loadChildren: async () => (await import('./book/book.module')).BookModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN], animation: 'isRight'}
      },
      {
        path: 'account',
        loadChildren: async () => (await import('./account/account.module')).AccountModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN], animation: 'isLeft'}
      },
      {
        path: 'reservation',
        loadChildren: async () => (await import('./reservation/reservation.module')).ReservationModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN, Role.BIBLIOTHECAIRE], animation: 'isRight'}
      },
      {
        path: 'adherent',
        loadChildren: async () => (await import('./adherent/adherent.module')).AdherentModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN, Role.BIBLIOTHECAIRE, Role.ADHERENT], animation: 'isRight'}
      },
      {
        path: 'profile',
        loadChildren: async () => (await import('./profile/profile.module')).ProfileModule,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN, Role.BIBLIOTHECAIRE, Role.ADHERENT], animation: 'isLeft'}
      },
      {
        path: 'import-excel/:source',
        component: ImportExcelComponent,
        canActivate: [RoleGuard],
        data: {roles: [Role.ADMIN], animation: 'isRight', source: null}
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
