import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Libs
import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import {
  Proceso,
  ProcesoService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { HallazgoService } from '@unicauca/modules/hallazgos/data-access';
import { PlanService } from '@unicauca/modules/plan-mejoramiento/data-access';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';
import { AccionesService } from '@unicauca/modules/acciones/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'unicauca-procesos-pmi',
  templateUrl: './procesos-pmi.component.html',
  styleUrls: ['./procesos-pmi.component.scss'],
})
export class ProcesosPmiComponent implements OnInit {
  streamDatos$ = new BehaviorSubject<any[]>([]);
  procesos: Proceso[];
  titulo = 'Procesos';
  columnas: Columna[] = [
    { nombreCelda: 'idProceso', nombreCeldaHeader: 'Identificador' },
    { nombreCelda: 'nombreProceso', nombreCeldaHeader: 'Nombre Proceso' },
    {
      nombreCelda: 'acciones',
      nombreCeldaHeader: 'Acciones',
      tipo: TipoColumna.ACCIONES,
    },
  ];

  estadoButtons: EstadoButtons = {
    crear: false,
    editar: false,
    eliminar: false,
    upload: false,
    visualizar: true,
  };

  /*Plan de Mejora Institucional*/

  titleHallazgos: String = 'Hallazgos';
  titleAcciones: String = 'Acciones';
  titlePlanes: String = 'Planes de Mejora';
  titleActividades: String = 'Actividades';
  noHallazgos: String;
  noPlanes: String;
  noAcciones: String;
  noActividades: String;

  constructor(
    private router: Router,
    private procesoService: ProcesoService,
    private hallazgoService: HallazgoService,
    private planService: PlanService,
    private actividadesService: ActividadesService,
    private accionesService: AccionesService
  ) {}

  ngOnInit(): void {
    this.getTodosProcesos();
    this.getNoHallazgos();
    this.getNoPlanes();
    this.getNoActividades();
    this.getNoAcciones();
  }

  getTodosProcesos(): void {
    this.procesoService.getProcesos().subscribe(
      (res) => {
        this.procesos = res.procesos;
        this.streamDatos$.next(this.procesos);
      },
      () => {
        this.streamDatos$.next([]);
      }
    );
  }

  getNoHallazgos(): void {
    this.hallazgoService.getTodosHallazgos().subscribe((response) => {
      this.noHallazgos = response.hallazgo.length;
    });
  }

  getNoPlanes(): void {
    this.planService.getPlanes().subscribe((response: any) => {
      this.noPlanes = response.planes.length;
    });
  }

  getNoAcciones(): void {
    this.actividadesService.getActividades().subscribe((response: any) => {
      this.noActividades = response.actividades.length;
    });
  }

  getNoActividades(): void {
    this.accionesService.getAcciones().subscribe((response: any) => {
      this.noAcciones = response.acciones.length;
    });
  }

  onVerDetalles(procesoSeleccionado): void {
    this.router.navigate([
      `home/estadisticas/all/proceso/${procesoSeleccionado.idProceso}`,
    ]);
  }
}
