import { Component } from '@angular/core';
import { Medico } from '../../types/types';
import { MedicosService } from '../../services/medicos.service';

@Component({
  selector: 'app-tabla-medicos',
  templateUrl: './tabla-medicos.component.html',
  styleUrls: ['./tabla-medicos.component.scss'],
})
export class TablaMedicosComponent {
  medicos: Medico[] = [];

  constructor(private medicosService: MedicosService) {
    this.getMedicos();
  }

  getMedicos() {
    this.medicosService.getMedicos().subscribe(medicos => {
      this.medicos = medicos;
    });
  }

  eliminarMedico(codMedico: number) {
    // this.medicosService.eliminarMedico(codMedico).subscribe(() => {
    //   this.getMedicos();
    // });
  }
}
