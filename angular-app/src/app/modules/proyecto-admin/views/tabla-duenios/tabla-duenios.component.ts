import { Component } from '@angular/core';
import { Duenio } from '../../types/types';
import { DueniosService } from '../../services/duenios.service';

@Component({
  selector: 'app-tabla-duenios',
  templateUrl: './tabla-duenios.component.html',
  styleUrls: ['./tabla-duenios.component.scss'],
})
export class TablaDueniosComponent {
  duenios: Duenio[] = [];
  modalCrearDuenio = false;
  duenio: Duenio = {
    codDuenio: 0,
    nombreCompleto: '',
    direccion: '',
    identidad: '',
  };

  constructor(private dueniosService: DueniosService) {
    this.getDuenios();
  }

  getDuenios() {
    this.dueniosService.getDuenios().subscribe(duenios => {
      this.duenios = duenios;
    });
  }
  showModalCrearDuenio() {
    this.modalCrearDuenio = true;
  }

  eliminarDuenio(codDuenio: number) {
    this.dueniosService.eliminarDuenio(codDuenio).subscribe(() => {
      this.getDuenios();
    });
  }

  agregarDuenio() {
    this.dueniosService.crearDuenio(this.duenio).subscribe(() => {
      this.getDuenios();
      this.modalCrearDuenio = false;
    });
  }
}
