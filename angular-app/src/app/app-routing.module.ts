import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tablas',
    pathMatch: 'full',
  },
  {
    path: 'tablas',
    loadChildren: () =>
      import('./modules/proyecto-admin/proyecto-admin.module').then(
        m => m.ProyectoAdminModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
