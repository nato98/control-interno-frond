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
  quantities = [];
  titleActividades = "Actividades";
  numActividades = 0;
  numHallazgos = 0;
  numAcciones = 0;
  numPlanes = 0;
  /**PIE CHART */
  activities = [];
  data = [
    {
      name: 'Incumplidas',
      value: 3,
    },
    {
      name: 'Ejecutadas',
      value: 5,
    },
    {
      name: 'Activas',
      value: 7,
    },
    {
      name: 'Por vencerse',
      value: 6,
    },
  ];

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
    this.getNoPlanes();
    this.getNoHallazgos();
    this.getNoAcciones();
    this.getActividades();

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
      this.numHallazgos = response.hallazgo.length;
      this.quantities.push({
        quantity: response.hallazgo.length,
        title: 'Hallazgos',
      });
    });
  }

  getNoPlanes(): void {
    this.planService.getPlanes().subscribe((response: any) => {
      this.numPlanes = response.planes.length;
      this.quantities.push({
        quantity: response.planes.length,
        title: 'Planes',
      });
    });
  }

  getActividades(): void {
    this.actividadesService.getActividades().subscribe((response: any) => {
      this.activities = response.activades;
      this.numActividades = response.actividades.length;
      /*this.quantities.push({
        quantity: this.activities.length,
        title: 'Actividades',
      });*/
    });
  }

  getNoAcciones(): void {
    this.accionesService.getAcciones().subscribe((response: any) => {
      this.numAcciones = response.acciones.length;
      this.quantities.push({
        quantity: response.acciones.length,
        title: 'Acciones',
      });
    });
  }

  buildDataActivities(): void{

  }

  onVerDetalles(procesoSeleccionado): void {
    this.router.navigate([
      `home/estadisticas/all/proceso/${procesoSeleccionado.idProceso}`,
    ]);
  }
}
