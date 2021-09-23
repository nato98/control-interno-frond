import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';


import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';


@Component({
  selector: 'unicauca-plan-mejoramiento',
  templateUrl: './plan-mejoramiento.component.html',
  styleUrls: ['./plan-mejoramiento.component.scss']
})
export class PlanMejoramientoComponent implements OnInit {
  streamDatos$ = new BehaviorSubject<any[]>([]);
  titulo = 'Actividades';
  idProceso: number;

  columnas: Columna[] = [
    { nombreCelda: 'idPlanMejoramiento',
      nombreCeldaHeader: 'Identificador' },
    {
      nombreCelda: 'nombre',
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

  constructor() { }

  ngOnInit(): void {
  }

  public onVerDetalles(actividadSeleccionada){
    console.log(actividadSeleccionada);
  }
}
