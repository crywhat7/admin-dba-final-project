import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './guards/session.guard';
import { AppHomeComponent } from './layout/app.home.component';
import { AppLayoutComponent } from './layout/app.layout.component';
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'acceso-denegado',
    loadChildren: () =>
      import('./modules/auth/accessdenied/accessdenied.module').then(
        m => m.AccessdeniedModule
      ),
  },
  {
    path: 'recurso-no-encontrado',
    loadChildren: () =>
      import('./modules/auth/error/error.module').then(m => m.ErrorModule),
  },
  {
    path: 'home',
    component: AppLayoutComponent,
    canLoad: [SessionGuard],
    canActivate: [SessionGuard],
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'politica-comercial',
    //     pathMatch: 'full',
    //   },
    //   {
    //     path: 'politica-comercial',
    //     canLoad: [SessionGuard],
    //     canActivate: [SessionGuard],
    //     data: {
    //       breadcrumb: 'Politica comercial',
    //     },
    //     loadChildren: () =>
    //       import('./modules/politica-comercial/politica-comercial.module').then(
    //         m => m.PoliticaComercialModule
    //       ),
    //   },
    // ],
  },
  {
    path: '**',
    redirectTo: '/recurso-no-encontrado',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
