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

  constructor(private dueniosService: DueniosService) {
    this.getDuenios();
  }

  getDuenios() {
    this.dueniosService.getDuenios().subscribe(duenios => {
      this.duenios = duenios;
    });
  }
  showModalCrearDuenio() {}

  eliminarDuenio(codDuenio: number) {
    this.dueniosService.eliminarDuenio(codDuenio).subscribe(() => {
      this.getDuenios();
    });
  }
}
