import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { WEB_SERVICE } from 'src/app/config/config';
import { AlertaService } from 'src/app/services/alertas/alerta.service';
import { Duenio } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class DueniosService {
  constructor(private http: HttpClient, private alerta: AlertaService) {}

  getDuenios() {
    type Response = { msg: string; data: Duenio[] };
    return this.http.get<Response>(`${WEB_SERVICE}api/duenios`).pipe(
      map((res: Response) => {
        const duenios = res.data;
        return duenios;
      }),
      catchError(err => {
        this.alerta.showError('Error al obtener los duenios');
        of([]);
        throw err;
      })
    );
  }

  eliminarDuenio(codDuenio: number) {
    type Response = { msg: string; data: boolean };
    return this.http
      .delete<Response>(`${WEB_SERVICE}api/duenios/${codDuenio}`)
      .pipe(
        map((res: Response) => {
          return res.data;
        }),
        catchError(err => {
          this.alerta.showError('Error al eliminar el duenio');
          throw err;
        })
      );
  }
  crearDuenio(duenio: Duenio) {
    duenio.nombreCompleto = duenio.nombreCompleto.toUpperCase();
    duenio.direccion = duenio.direccion.toUpperCase();
    type Response = { msg: string; data: boolean };
    return this.http.post<Response>(`${WEB_SERVICE}api/duenios`, duenio).pipe(
      map((res: Response) => {
        return res.data;
      }),
      catchError(err => {
        this.alerta.showError('Error al crear el duenio');
        throw err;
      })
    );
  }
}
