import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ProyectoAdminRoutingModule } from './proyecto-admin.routing.module';

import { ProyectoAdminComponent } from './proyecto-admin.component';
import { SelectorTablasComponent } from './components/selector-tablas/selector-tablas.component';
import { TablaPacientesComponent } from './views/tabla-pacientes/tabla-pacientes.component';
import { TablaDueniosComponent } from './views/tabla-duenios/tabla-duenios.component';
import { TablaMedicosComponent } from './views/tabla-medicos/tabla-medicos.component';
import { TablaGeneralComponent } from './views/tabla-general/tabla-general.component';

@NgModule({
  declarations: [
    ProyectoAdminComponent,
    SelectorTablasComponent,
    TablaPacientesComponent,
    TablaDueniosComponent,
    TablaMedicosComponent,
    TablaGeneralComponent,
  ],
  imports: [CommonModule, PrimeNgModule, ProyectoAdminRoutingModule],
})
export class ProyectoAdminModule {}
