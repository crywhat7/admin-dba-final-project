import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Especie, Familia, GeneralInfo, Raza } from '../types/types';
import { WEB_SERVICE } from 'src/app/config/config';
import { AlertaService } from 'src/app/services/alertas/alerta.service';

@Injectable({
  providedIn: 'root',
})
export class MiscServiceService {
  constructor(private http: HttpClient, private alerta: AlertaService) {}

  getFamilias(): Observable<Familia[]> {
    type Response = { msg: string; data: Familia[] };
    return this.http.get<Response>(`${WEB_SERVICE}api/misc/familias`).pipe(
      map((res: Response) => {
        const familias = res.data.map(familia => {
          return {
            ...familia,
            fechaIngreso: new Date(familia.fechaIngreso),
          };
        });
        return familias;
      }),
      catchError(err => {
        this.alerta.showError('Error al obtener las familias');
        of([]);
        throw err;
      })
    );
  }

  getEspecies(codFamilia: number): Observable<Especie[]> {
    type Response = { msg: string; data: Especie[] };
    return this.http
      .get<Response>(`${WEB_SERVICE}api/misc/especies/${codFamilia}`)
      .pipe(
        map((res: Response) => {
          const especies = res.data;
          return especies;
        }),
        catchError(err => {
          this.alerta.showError('Error al obtener las especies');
          of([]);
          throw err;
        })
      );
  }

  getRazas(codEspecie: number): Observable<Raza[]> {
    type Response = { msg: string; data: Raza[] };
    return this.http
      .get<Response>(`${WEB_SERVICE}api/misc/razas/${codEspecie}`)
      .pipe(
        map((res: Response) => {
          const razas = res.data;
          return razas;
        }),
        catchError(err => {
          this.alerta.showError('Error al obtener las razas');
          of([]);
          throw err;
        })
      );
  }

  getGeneral() {
    type Response = { msg: string; data: GeneralInfo[] };
    return this.http.get<Response>(`${WEB_SERVICE}api/misc/general`).pipe(
      map((res: Response) => {
        const general = res.data.map(g => {
          return {
            ...g,
            fechaIngreso: new Date(g.fechaIngreso),
            fechaCita: new Date(g.fechaCita),
          };
        });
        return general;
      }),
      catchError(err => {
        this.alerta.showError('Error al obtener los datos generales');
        of([]);
        throw err;
      })
    );
  }
}
