import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';

@Component({
  selector: 'unicauca-plan-mejoramiento',
  templateUrl: './plan-mejoramiento.component.html',
  styleUrls: ['./plan-mejoramiento.component.scss'],
})
export class PlanMejoramientoComponent implements OnInit {
  streamDatos$ = new BehaviorSubject<any[]>([]);
  titulo = 'Actividades';
  idPlan: string;
  actividades: [];

  avance: number = 95;
  cumplimiento: number = 50;
  titleAvance: string = "Porcentaje de Avance";
  titleCumplimiento: string = "Porcentaje de Cumplimiento";

  noAcciones: number = 2;
  titleAcciones: string = "Acciones";

  columnas: Columna[] = [
    { nombreCelda: 'idActividad', nombreCeldaHeader: 'Identificador' },
    {
      nombreCelda: 'actividad',
      nombreCeldaHeader: 'Actividad',
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

  datosGrafico = {
    estadoActividades: {
      titulo: "Estado Actividades",
      datos: this.dataEstadoActividades
    },
    avanceActividades: {
      titulo: "Avance Actividades",
      datos: this.dataAvanceActividades
    }
  }

  constructor(
    private actividadesService: ActividadesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idPlan = params.idPlan.replace('%', '/');
    });
    this.getTodasActividades();
  }

  public getTodasActividades() {
    this.actividadesService
      .getActividadesPorIdPlan(this.idPlan)
      .subscribe((response) => {
        this.actividades = response;
        this.streamDatos$.next(this.actividades);
      },
      () => {
        this.streamDatos$.next([]);
      });
  }
  public onVerDetalles(actividadSeleccionada) {
    console.log(actividadSeleccionada);
  }
}
