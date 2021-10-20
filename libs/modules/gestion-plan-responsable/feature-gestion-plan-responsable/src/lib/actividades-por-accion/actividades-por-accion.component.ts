import { MatDialog } from '@angular/material/dialog';
import { Soporte } from './../../../../data-access/src/lib/model/soperte.model';
import { Actividad } from './../../../../../plan-mejoramiento/data-access/src/lib/model/actividad.model';
import { ActividadesService } from './../../../../../actividades/data-access/src/lib/service/actividades.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Columna, TipoColumna, EstadoButtons } from '@unicauca/shared/components/tabla';
import { GestionPlanResponsableService } from 'libs/modules/gestion-plan-responsable/data-access/src/lib/services/gestion-plan-responsable.service';
import { SubirEvidenciaComponent } from '../subir-evidencia/subir-evidencia.component';

@Component({
  selector: 'unicauca-actividades-por-accion',
  templateUrl: './actividades-por-accion.component.html',
  styleUrls: ['./actividades-por-accion.component.scss']
})
export class ActividadesPorAccionComponent implements OnInit {

  private idAccion: number;
  private soportes: Soporte[] = [];
  private unsubscribe$ = new Subject();

  public nombrePlan = '';
  public tipoAccion = '';
  public fechaFinPlan = '';
  public actividadSeleccionada: Actividad;
  public listaActividades: Actividad[] = [];

  public titulo = 'Evidencias de la actividad';

  public columnas: Columna[] = [
    { nombreCelda: 'nombreEvidencia', nombreCeldaHeader: 'Nombre de la evidencia' },
    // { nombreCelda: 'linkDescarga', nombreCeldaHeader: 'Link de descarga' },
    { nombreCelda: 'estadoEvaluacion', nombreCeldaHeader: 'Estado' },
    { nombreCelda: 'observaciones', nombreCeldaHeader: 'Observaciones del auditor' },
  ];

  public streamDatos$ = new BehaviorSubject<any[]>([]);
  public activarFiltroItems = true;
  public opened = true;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private actividadesService: ActividadesService,
    private gestionPlanResponsableService: GestionPlanResponsableService,
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
        this.tipoAccion = respuestaURL.get('tipoAccion');
        return this.actividadesService.getActividadesPorIdAccion(this.idAccion);
      }),
      tap(objActividades => {
        this.listaActividades = objActividades;
        this.actividadSeleccionada = this.listaActividades[0];
        this.actualizarSoporte();
      })
    )
    .subscribe();
  }

  private actualizarSoporte(): void{
    this.gestionPlanResponsableService.listadoSoportesIdActividad(this.actividadSeleccionada.id_Actividad)
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(objSoporte => {
      this.soportes = objSoporte;
      this.streamDatos$.next(this.soportes);
    },
    () => {
      this.streamDatos$.next([]);
    }
    );
  }

  public onChangeActividad(): void{
    this.actualizarSoporte();
  }

  public volverAlTablerResponsable(): void{
    this.router.navigate(['/home/gestion-plan-responsable/gestion-plan-responsable']);
  }

  public subirEvidencia(): void{
    const dialogRef = this.dialog.open(SubirEvidenciaComponent, {
      disableClose: true,
      width: '70%',
      data: this.actividadSeleccionada,
    });
    dialogRef.afterClosed().subscribe((x) => this.actualizarSoporte());
  }

  public click(): void{
    this.opened = !this.opened
  }

}

