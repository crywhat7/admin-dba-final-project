import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};
import { ProyectoAdminComponent } from './proyecto-admin.component';
import { TablaPacientesComponent } from './views/tabla-pacientes/tabla-pacientes.component';
import { TablaDueniosComponent } from './views/tabla-duenios/tabla-duenios.component';
import { TablaMedicosComponent } from './views/tabla-medicos/tabla-medicos.component';
import { TablaGeneralComponent } from './views/tabla-general/tabla-general.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectoAdminComponent,
  },
  {
    path: 'pacientes',
    component: TablaPacientesComponent,
  },
  {
    path: 'duenios',
    component: TablaDueniosComponent,
  },
  {
    path: 'empleados',
    component: TablaMedicosComponent,
  },
  {
    path: 'general',
    component: TablaGeneralComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoAdminRoutingModule {}
