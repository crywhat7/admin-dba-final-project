import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};
import { ProyectoAdminComponent } from './proyecto-admin.component';
import { TablaPacientesComponent } from './views/tabla-pacientes/tabla-pacientes.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectoAdminComponent,
  },
  {
    path: 'pacientes',
    component: TablaPacientesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoAdminRoutingModule {}
