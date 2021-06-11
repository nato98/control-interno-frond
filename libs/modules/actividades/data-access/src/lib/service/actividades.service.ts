import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actividad } from '@unicauca/modules/plan-mejoramiento/data-access';
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class ActividadesService {

  private urlEndPoint: string = environment.apiRoot+'actividad/';

  constructor(private http: HttpClient) {}

  public getActividadesPorIdAccion(idAccion: number): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+`getActividadesPorIdAccion/${idAccion}`);
  }
  public deleteActividad(idActividad: number): Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+`actividades/${idActividad}`);
  }
  public crearActividad(actividad: Actividad): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'actividades', actividad)
  }
  public getActividadPorId(idActividad: number): Observable<Actividad>{
    return this.http.get<Actividad>(this.urlEndPoint+`actividades/${idActividad}`)
  }
  public editarActividad(actividad: Actividad, idActividad: number): Observable<any>{
    return this.http.put(this.urlEndPoint+`actividades/${idActividad}`, actividad);
  }
}
