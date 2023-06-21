import { Component } from '@angular/core';
import { MiscServiceService } from '../../services/misc-service.service';
import { Especie, Familia, Paciente, Raza } from '../../types/types';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss'],
})
export class TablaPacientesComponent {
  pacientes: Paciente[] = [];
  dialogVisible = false;
  paciente: Paciente = {
    codPaciente: 0,
    nombrePaciente: '',
    codEspecie: 0,
    codRaza: 0,
    codDuenio: 0,
    codMedicoCabecera: 0,
    fotoPaciente: 0,
    fechaIngreso: new Date(),
  };
  especieSeleccionada: Especie | null = null;
  familiaSeleccionada: Familia | null = null;
  razaSeleccionada: Raza | null = null;
  duenioSeleccionado: any = null;
  medicoSeleccionado: any = null;

  especies: Especie[] = [];
  familias: Familia[] = [];
  razas: Raza[] = [];
  duenios: any[] = [];
  medicos: any[] = [];

  constructor(
    private miscService: MiscServiceService,
    private pacientesService: PacientesService
  ) {
    this.getFamilias();
    this.getEspecies();
    this.getPacientes();
  }

  getFamilias() {
    this.miscService.getFamilias().subscribe(familias => {
      this.familias = familias;
    });
  }

  getEspecies() {
    const codFamilia = this.familiaSeleccionada?.codFamilia;

    if (!codFamilia) {
      return;
    }

    this.miscService.getEspecies(codFamilia).subscribe(especies => {
      this.especies = especies;
    });
  }

  getRazas() {
    const codEspecie = this.especieSeleccionada?.codigoEspecie;

    if (!codEspecie) {
      return;
    }

    this.miscService.getRazas(codEspecie).subscribe(razas => {
      this.razas = razas;
    });
  }

  getPacientes() {
    this.pacientesService.getPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  eliminarPaciente(codPaciente: number) {
    this.pacientesService.eliminarPaciente(codPaciente).subscribe(ok => {
      if (ok) {
        this.getPacientes();
        return;
      }
    });
  }

  showModalCrearPaciente() {
    this.dialogVisible = true;
    this.paciente = {
      codPaciente: 0,
      nombrePaciente: '',
      codEspecie: 0,
      codRaza: 0,
      codDuenio: 0,
      codMedicoCabecera: 0,
      fotoPaciente: 0,
      fechaIngreso: new Date(),
    };
  }
}
