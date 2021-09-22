import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// Terceros
import Swal from 'sweetalert2';

//Modelos
import { plan } from './../model/plan.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class PlanService {
  private urlEndPoint: string = environment.apiRoot;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private planMejora: plan;

  constructor(private http: HttpClient) {}

  createPlan(planMejora: plan) {
    planMejora.pathSoporte = 'url';
    return this.http
      .post<plan>(this.urlEndPoint + 'mpdm/planes', planMejora, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            Swal.fire(
              'Ocurrió un error, todos los campos son obligatorios!',
              e.error.mensaje,
              'error'
            );
            return throwError(e);
          }
          Swal.fire('Error al crear el plan', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  deletePlan(planMejora: plan) {
    const options = {
      headers: this.httpHeaders,
      body: {
        id: planMejora.codeURL,
      },
    };
    return this.http
      .delete<plan>(`${this.urlEndPoint}mpdm/eliminar-plan`, options)
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            Swal.fire(
              'Ocurrió un error, lo estamos solucionando!',
              e.error.mensaje,
              'error'
            );
            return throwError(e);
          }
          Swal.fire('Error al eliminar el plan', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  updatePlan(planMejora: plan) {
    return this.http
      .put<plan>(this.urlEndPoint + 'mpdm/editar-plan', planMejora, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            Swal.fire(
              'Ocurrió un error, lo estamos solucionando!',
              e.error.mensaje,
              'error'
            );
            return throwError(e);
          }
          Swal.fire('Error al actualizar el plan', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  getPlanConsultar(codeUrl: string): Observable<plan> {
    const options = {
      headers: {
        'code-url': codeUrl,
        'Content-Type': 'application/json',
      },
    };

    return this.http.get<plan>(`${this.urlEndPoint}mpdm/ver-plan`, options);
  }

  getPlanes(): Observable<plan[]> {
    return this.http.get<plan[]>(this.urlEndPoint + 'mpdm/planes');
  }

  getPlanesPorProceso(idProceso: number): Observable<any> {
    return this.http.get<any>(this.urlEndPoint+ `mpdm/planes-proceso/${idProceso}`);
  }

  getResumenPlan(codeUrl: string): Observable<any>{
    const options = {
      headers: {
        'code-url': codeUrl,
        'Content-Type': 'application/json',
      },
    };
    return this.http.get<any>(this.urlEndPoint+ 'mpdm/resumenPlan', options)
  }

  setPlan(p: plan) {
    this.planMejora = p;
  }

  getPlan() {
    return this.planMejora;
  }

  getIdPlanMejoramiento(): Observable<string> {
    return this.http.get<string>(this.urlEndPoint + 'mpdm/GeneradorId');
  }
}
