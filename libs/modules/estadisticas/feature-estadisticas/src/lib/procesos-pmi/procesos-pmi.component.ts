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

  titulo = 'Todos los procesos';

  streamDatos$ = new BehaviorSubject<any[]>([]);
  procesos: Proceso[];

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
  cantidades = {
    planes: {titulo: "Planes de Mejora", valor: "0"},
    hallazgos: {titulo: "Hallazgos", valor: "0"},
    acciones: {titulo: "Acciones", valor: "0"},
    actividades: {titulo: "Actividades", valor: "0"}
  };

  /**PIE CHART */
  tituloLegend: string = "Estado Actividades";
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
    this.buildLabels();
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

  getNoPlanes(): void {
    this.planService.getPlanes().subscribe((response: any) => {
      this.cantidades['planes'].valor = response.planes.length.toString();
    });
  }

  getNoHallazgos(): void {
    this.hallazgoService.getTodosHallazgos().subscribe((response) => {
      this.cantidades['hallazgos'].valor = response.hallazgo.length.toString();
    });
  }

  getNoAcciones(): void {
    this.accionesService.getAcciones().subscribe((response: any) => {
      this.cantidades['acciones'].valor = response.acciones.length.toString();
    });
  }

  getActividades(): void {
    this.actividadesService.getActividades().subscribe((response: any) => {
      this.activities = response.activades;
      this.cantidades['actividades'].valor = response.actividades.length.toString();
    });
  }

  buildLabels(): void{
    let total = 0;
    this.data.forEach((item)=>{
      total += item.value;
    });
    for (let index = 0; index < this.data.length; index++) {
      let percent = Math.round((this.data[index].value * 100) / total);
      this.data[index].name = this.data[index].name + ": " + percent.toString() + "%";
    }
  }

  onVerDetalles(procesoSeleccionado): void {
    this.router.navigate([
      `home/estadisticas/all/proceso/${procesoSeleccionado.idProceso}`,
    ]);
    localStorage.setItem("proceso", procesoSeleccionado.nombreProceso);
  }
}
