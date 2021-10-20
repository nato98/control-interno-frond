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
