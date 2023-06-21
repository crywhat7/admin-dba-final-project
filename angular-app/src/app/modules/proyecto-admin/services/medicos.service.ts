import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertaService } from 'src/app/services/alertas/alerta.service';
import { map, catchError, of } from 'rxjs';
import { WEB_SERVICE } from 'src/app/config/config';
import { Medico } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  constructor(private http: HttpClient, private alerta: AlertaService) {}

  getMedicos() {
    type Response = { msg: string; data: Medico[] };
    return this.http.get<Response>(`${WEB_SERVICE}api/medicos`).pipe(
      map((res: Response) => {
        const medicos = res.data.map(medico => {
          return {
            ...medico,
            fechaNacimiento: new Date(medico.fechaNacimiento),
          };
        });
        return medicos;
      }),
      catchError(err => {
        this.alerta.showError('Error al obtener los medicos');
        of([]);
        throw err;
      })
    );
  }
}
