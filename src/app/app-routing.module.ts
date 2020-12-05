import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {PageNotFoundComponent} from './_shared/components/page-not-found/page-not-found.component';
import {AfterAuthGuard} from './_core/guards/after-auth.guard';
import {AuthGuard} from './_core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    // loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    loadChildren: async () => (await import('./auth/auth.module')).AuthModule,
    canActivate: [AfterAuthGuard],
    data: {animation: 'isLeft'}
  },
  {
    path: 'application',
    // loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    loadChildren: async () => (await import('./application/application.module')).ApplicationModule,
    canActivate: [AuthGuard],
    data: {animation: 'isRight'}
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
