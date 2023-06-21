import { Component } from '@angular/core';
import { MiscServiceService } from '../../services/misc-service.service';
import {
  Duenio,
  Especie,
  Familia,
  Medico,
  Paciente,
  Raza,
} from '../../types/types';
import { PacientesService } from '../../services/pacientes.service';
import { DueniosService } from '../../services/duenios.service';
import { MedicosService } from '../../services/medicos.service';
import { AlertaService } from 'src/app/services/alertas/alerta.service';

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
    fotoPaciente: null,
    fechaIngreso: new Date(),
  };
  especieSeleccionada: Especie | null = null;
  familiaSeleccionada: Familia | null = null;
  razaSeleccionada: Raza | null = null;
  duenioSeleccionado: Duenio | null = null;
  medicoSeleccionado: Medico | null = null;

  especies: Especie[] = [];
  familias: Familia[] = [];
  razas: Raza[] = [];
  duenios: Duenio[] = [];
  medicos: Medico[] = [];

  constructor(
    private miscService: MiscServiceService,
    private pacientesService: PacientesService,
    private medicosService: MedicosService,
    private dueniosService: DueniosService,
    private alerta: AlertaService
  ) {
    this.getFamilias();
    this.getPacientes();
    this.getDuenios();
    this.getMedicos();
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

  getDuenios() {
    this.dueniosService.getDuenios().subscribe(duenios => {
      this.duenios = duenios;
    });
  }

  getMedicos() {
    this.medicosService.getMedicos().subscribe(medicos => {
      this.medicos = medicos;
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
      fotoPaciente: null,
      fechaIngreso: new Date(),
    };
  }

  agregarPaciente() {
    this.paciente.codEspecie = this.especieSeleccionada?.codigoEspecie || 0;
    this.paciente.codRaza = this.razaSeleccionada?.codRaza || 0;
    this.paciente.codDuenio = this.duenioSeleccionado?.codDuenio || 0;
    this.paciente.codMedicoCabecera = this.medicoSeleccionado?.codMedico || 0;
    this.paciente.nombrePaciente = this.paciente.nombrePaciente
      .trim()
      .toUpperCase();

    this.pacientesService.crearPaciente(this.paciente).subscribe(ok => {
      if (ok) {
        this.getPacientes();
        this.dialogVisible = false;
        this.alerta.showSuccess('Paciente creado correctamente');
        return;
      }
    });
  }
}
