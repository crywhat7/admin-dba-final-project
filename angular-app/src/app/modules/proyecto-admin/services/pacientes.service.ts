import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { WEB_SERVICE } from 'src/app/config/config';
import { Paciente } from '../types/types';
import { AlertaService } from 'src/app/services/alertas/alerta.service';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  constructor(private http: HttpClient, private alerta: AlertaService) {}

  getPacientes() {
    type Response = { msg: string; data: Paciente[] };
    return this.http.get<Response>(`${WEB_SERVICE}api/pacientes`).pipe(
      map((res: Response) => {
        const pacientes = res.data.map(paciente => {
          return {
            ...paciente,
            fechaIngreso: new Date(paciente.fechaIngreso),
          };
        });
        return pacientes;
      }),
      catchError(err => {
        this.alerta.showError('Error al obtener los pacientes');
        of([]);
        throw err;
      })
    );
  }

  eliminarPaciente(codPaciente: number) {
    type Response = { msg: string; data: boolean };
    return this.http
      .delete<Response>(`${WEB_SERVICE}api/pacientes/${codPaciente}`)
      .pipe(
        map((res: Response) => {
          const ok = res.data;
          return ok;
        }),
        catchError(err => {
          this.alerta.showError('Error al eliminar el paciente');
          of(false);
          throw err;
        })
      );
  }
}
