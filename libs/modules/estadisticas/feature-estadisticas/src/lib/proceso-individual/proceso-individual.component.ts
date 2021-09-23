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

  streamDatos$ = new BehaviorSubject<any[]>([]);
  planes: plan[];
  titulo = 'Planes de Mejoramiento';
  idProceso: number;

  columnas: Columna[] = [
    { nombreCelda: 'idPlanMejoramiento',
      nombreCeldaHeader: 'Identificador' },
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
  noHallazgos: String;
  noActividades: String;
  noAcciones: String;

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
        this.streamDatos$.next(this.planes);
      });
  }

  public getHallazgosPorProceso(): void {
    this.hallazgoService
      .getHallazgosProceso(this.idProceso)
      .subscribe((response) => {
        this.noHallazgos = response.hallazgo.length;
      });
  }

  public getAccionesPorProceso(): void {
    this.accionesService
      .getAccionesPorProceso(this.idProceso)
      .subscribe((response) => {
        this.noAcciones = response.acciones;
      });
  }

  public getActividadesPorProceso(): void {
    this.actividadesService
      .getActividadesPorProceso(this.idProceso)
      .subscribe((response) => {
        this.noActividades = response.actividades.length;
      });
  }

  public onVerDetalles(planSeleccionado): void {
    const planVer: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === planSeleccionado.idPlanMejoramiento
    );
    let _idPlan = planVer[0].idPlanMejoramiento.replace('/','%');
    console.log(_idPlan);
    this.router.navigate([
      `home/estadisticas/all/plan-mejora/${_idPlan}`,
    ]);
  }
}
