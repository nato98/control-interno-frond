import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../../../apps/control-interno/src/environments/environment';
import { Injectable } from '@angular/core';
import { TableroResponsable } from '../model/tableroResponsable.model';

@Injectable()
export class GestionPlanResponsableService {

  private urlEndPoint: string = environment.apiRoot+'evidencia/';

  constructor(private http: HttpClient) {}

  public tableroResponsable(idResponsable: number): Observable<TableroResponsable[]>{
    return this.http.get<TableroResponsable[]>(this.urlEndPoint +`getTablaResponsable/${idResponsable}`);
  }
}
