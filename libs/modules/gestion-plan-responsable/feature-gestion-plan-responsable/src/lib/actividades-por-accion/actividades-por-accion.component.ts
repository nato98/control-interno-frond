import { Actividad } from './../../../../../plan-mejoramiento/data-access/src/lib/model/actividad.model';
import { ActividadesService } from './../../../../../actividades/data-access/src/lib/service/actividades.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Columna, TipoColumna, EstadoButtons } from '@unicauca/shared/components/tabla';

@Component({
  selector: 'unicauca-actividades-por-accion',
  templateUrl: './actividades-por-accion.component.html',
  styleUrls: ['./actividades-por-accion.component.scss']
})
export class ActividadesPorAccionComponent implements OnInit {

  private idAccion: number;
  private unsubscribe$ = new Subject();

  public nombrePlan = '';
  public fechaFinPlan = '';
  public actividadSeleccionada: Actividad;
  public listaActividades: Actividad[] = [];

  public titulo = 'Evidencias de la actividad';

  public columnas: Columna[] = [
    { nombreCelda: 'nombreEvidencia', nombreCeldaHeader: 'Nombre de la evidencia' },
    { nombreCelda: 'linkDescarga', nombreCeldaHeader: 'Link de descarga' },
    { nombreCelda: 'estado', nombreCeldaHeader: 'Estado' },
    { nombreCelda: 'observacion', nombreCeldaHeader: 'Observaciones del auditor' },
  ];

  public streamDatos$ = new BehaviorSubject<any[]>([]);
  public activarFiltroItems = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private actividadesService: ActividadesService
  ) { }

  ngOnInit(): void {
    this.verificarEstadoComponente();
  }

  private verificarEstadoComponente(): void{
    this.activatedRoute.paramMap
    .pipe(
      takeUntil(this.unsubscribe$),
      switchMap((respuestaURL) => {
        this.idAccion = parseInt(respuestaURL.get('idAccion'));
        this.nombrePlan = respuestaURL.get('nombrePlan');
        this.fechaFinPlan = respuestaURL.get('fechaFin');
        return this.actividadesService.getActividadesPorIdAccion(this.idAccion);
      })
    )
    .subscribe(objActividades => {
      this.listaActividades = objActividades;
      this.actividadSeleccionada = this.listaActividades[0];
    });
  }

  public onChangeActividad(): void{
    console.log(this.actividadSeleccionada);

  }
}

