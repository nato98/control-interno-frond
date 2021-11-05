import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';

import {
  plan,
  PlanService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { HallazgoService } from '@unicauca/modules/hallazgos/data-access';
import { AccionesService } from '@unicauca/modules/acciones/data-access';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';

@Component({
  selector: 'unicauca-proceso-individual',
  templateUrl: './proceso-individual.component.html',
  styleUrls: ['./proceso-individual.component.scss'],
})
export class ProcesoIndividualComponent implements OnInit {
  titulo = 'Planes de Mejoramiento';
  idProceso: number;
  nombreProceso: string;
  planes: plan[];

  /*INFORMACIÓN TABLA*/
  streamDatos$ = new BehaviorSubject<any[]>([]);

  columnas: Columna[] = [
    { nombreCelda: 'idPlanMejoramiento', nombreCeldaHeader: 'Identificador' },
    {
      nombreCelda: 'nombre',
      nombreCeldaHeader: 'Nombre Plan de Mejora',
    },
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

  /*INFORMACION DEL PROCESO*/
  cantidades = {
    planes: { titulo: 'Planes de Mejora', valor: '0' },
    hallazgos: { titulo: 'Hallazgos', valor: '0' },
    acciones: { titulo: 'Acciones', valor: '0' },
    actividades: { titulo: 'Actividades', valor: '0' },
  };

  /**PIE-CHART ESTADO ACTIVIDADES */
  dataEstadoActividades = [
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

  /**PIE-CHART AVANCE ACTIVIDADES */
  dataAvanceActividades = [
    {
      name: '(0-19%) Crítico',
      value: 5,
    },
    {
      name: '(20-49%) Inaceptable',
      value: 3,
    },
    {
      name: '(50-89%) Aceptable',
      value: 7,
    },
    {
      name: '(90-100%) Satisfac.',
      value: 9,
    },
  ];

  /*PIE-CHART PLANES*/
  dataPlanes = [
    {
      name: 'Formulación',
      value: 3,
    },
    {
      name: 'Ejecución',
      value: 5,
    },
    {
      name: 'Finalizado',
      value: 7,
    },
    {
      name: 'Revisión',
      value: 6,
    },
    {
      name: 'Suscripción',
      value: 6,
    },

  ];

  datosGrafico = {
    planes: {
      titulo: "Estado Planes de Mejora",
      datos: this.dataPlanes
    },
    estadoActividades: {
      titulo: "Estado Actividades",
      datos: this.dataEstadoActividades
    },
    avanceActividades: {
      titulo: "Estado Actividades",
      datos: this.dataAvanceActividades
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planService: PlanService,
    private hallazgoService: HallazgoService,
    private accionesService: AccionesService,
    private actividadesService: ActividadesService
  ) {}

  ngOnInit(): void {
    //Get id from the route
    this.route.params.subscribe((params) => {
      this.idProceso = params.idProceso;
    });
    this.nombreProceso = localStorage.getItem('proceso');

    //Get data from database
    this.getTodosPlanes();
    this.getHallazgosPorProceso();
    this.getAccionesPorProceso();
    this.getActividadesPorProceso();
  }

  public getTodosPlanes(): void {
    this.planService
      .getPlanesPorProceso(this.idProceso)
      .subscribe((response) => {
        this.planes = response.planes;
        this.cantidades['planes'].valor = this.planes.length.toString();
        this.streamDatos$.next(this.planes);
      });
  }

  public getHallazgosPorProceso(): void {
    this.hallazgoService
      .getHallazgosProceso(this.idProceso)
      .subscribe((response) => {
        this.cantidades[
          'hallazgos'
        ].valor = response.hallazgo.length.toString();
      });
  }

  public getAccionesPorProceso(): void {
    this.accionesService
      .countAccionesPorProceso(this.idProceso)
      .subscribe((response) => {
        this.cantidades['acciones'].valor = response.acciones.length.toString();
      });
  }

  public getActividadesPorProceso(): void {
    this.actividadesService
      .getActividadesPorProceso(this.idProceso)
      .subscribe((response) => {
        this.cantidades[
          'actividades'
        ].valor = response.actividades.length.toString();
      });
  }

  public onVerDetalles(planSeleccionado): void {
    const planVer: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === planSeleccionado.idPlanMejoramiento
    );

    let idPlan = planVer[0].idPlanMejoramiento.replace('/', '%');
    this.router.navigate([`home/estadisticas/all/plan-mejora/${idPlan}`]);

    localStorage.setItem('nombrePlan', planVer[0].nombre);
  }
}
