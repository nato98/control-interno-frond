import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
// Angular
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Terceros
import Swal from 'sweetalert2';

// Libs
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  plan,
  PlanService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthService } from '@unicauca/auth';
import { Columna, EstadoButtons, TipoColumna } from '@unicauca/shared/components/tabla';
import { EstadosComunService } from '@unicauca/core';
@Component({
  selector: 'unicauca-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  @Output() evPlan = new EventEmitter<plan>();
  @Output() evSelectedIndex = new EventEmitter<number>();

  titulo = '';
  activarFiltroItems = true;

  unsubscribe$ = new Subject();

  esAuditor = false;
  esLiderProceso = false;
  esAdministrado = false;
  idPersona: number;

  hintAgregarOVerAuditor = ''
  estadoButtons: EstadoButtons = {};

  /**Array de titulos de columnas */
  columnas: Columna[] = [
    { nombreCelda: 'identificadorPlan', nombreCeldaHeader: 'Identificador' },
    { nombreCelda: 'nombrePlan', nombreCeldaHeader: 'Nombre' },
    {
      nombreCelda: 'procesoResponsable',
      nombreCeldaHeader: 'Proceso responsable',
    },
    { nombreCelda: 'estado', nombreCeldaHeader: 'Estado' },
    {
      nombreCelda: 'acciones',
      nombreCeldaHeader: 'Acciones',
      tipo: TipoColumna.ACCIONES,
    },
  ];

  streamDatos$ = new BehaviorSubject<any[]>([]);

  public planes: plan[];
  public idPlan: string;

  correo: string;
  rol: string;

  public plan: plan;

  constructor(
    private router: Router,
    private authService: AuthService,
    private servicioPlan: PlanService,
    private estadosComunService: EstadosComunService
  ) {}

  ngOnInit(): void {
    this.correo = this.authService.getUsuario().objPerson.email;
    this.rol = this.authService.getUsuario().objRole[0];
    this.esAuditor = (this.authService.getUsuario().objRole[0] === 'ROLE_auditor');
    this.esLiderProceso = (this.authService.getUsuario().objRole[0] === 'ROLE_liderDeProceso');
    this.esAdministrado = (this.authService.getUsuario().objRole[0] === 'ROLE_administrador');
    this.idPersona = this.authService.getUsuario().objPerson.id;
    this.hintAgregarOVerAuditor = (this.esAuditor ? 'Ver' : 'Agregar');
    this.llenarBotones();

    this.listar();
    this.estadosComunService.customPlan
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.estadosComunService.customSelectedIndex
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
  llenarBotones(){
    this.estadoButtons = {
      crear: true,
      editar: true,
      eliminar: !this.esAuditor,
      upload: false,
      visualizar: true,
      seleccionar: false,
    };
  }

  listar() {
    if (this.esAuditor) {
      this.servicioPlan.getPlanesPorRol(this.idPersona, 'ROLE_auditor').subscribe((res: any) => {
        this.planes = res.planes;
        const listaDatosPlanes = res.planes.map((obj) => ({
          identificadorPlan: obj.idPlanMejoramiento,
          nombrePlan: obj.nombre,
          procesoResponsable: obj?.proceso?.nombreProceso,
          estado: obj.estado,
        }));
        this.streamDatos$.next(listaDatosPlanes);
      },
      () => {
        this.streamDatos$.next([]);
      });
    }
    if (this.esLiderProceso) {
      this.servicioPlan.getPlanesPorRol(this.idPersona, 'ROLE_liderDeProceso').subscribe((res: any) => {
        this.planes = res.planes;
        const listaDatosPlanes = res.planes.map((obj) => ({
          identificadorPlan: obj.idPlanMejoramiento,
          nombrePlan: obj.nombre,
          procesoResponsable: obj?.proceso?.nombreProceso,
          estado: obj.estado,
        }));
        this.streamDatos$.next(listaDatosPlanes);
      },
      () => {
        this.streamDatos$.next([]);
      });
    }
    if (this.esAdministrado) {
      this.servicioPlan.getPlanes().subscribe((res: any) => {
        this.planes = res.planes;
        const listaDatosPlanes = res.planes.map((obj) => ({
          identificadorPlan: obj.idPlanMejoramiento,
          nombrePlan: obj.nombre,
          procesoResponsable: obj?.proceso?.nombreProceso,
          estado: obj.estado,
        }));
        this.streamDatos$.next(listaDatosPlanes);
      },
      () => {
        this.streamDatos$.next([]);
      });
    }
  }

  agregar() {
    this.router.navigate(['/home/planes-mejora/historial/planes/agregar']);
    // this.evSelectedIndex.emit(0);
  }

  onDeletePlan(planSeleccionado) {
    //this.servicioPlan.getPlanConsultar(this.planes[0].codeURL).subscribe(res=>console.log(res))
    Swal.fire({
      title: '¿Deseas eliminar el plan de mejoramiento?',
      text: 'Los datos serán eliminados permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const planAEliminar: plan[] = this.planes.filter(
          (plan) =>
            plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
        );
        this.servicioPlan.deletePlan(planAEliminar[0]).subscribe(() => {
          this.listar();
          Swal.fire('Se elimino con exito el plan de mejora', '', 'success');
        });
      }
    });
  }

  onEditarPlan(planSeleccionado) {
    const planAEditar: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
    );
    this.router.navigate([
      this.router.url + '/agregar',
      planAEditar[0].codeURL,
    ]);
    localStorage.setItem('visualizar', 'false');
    this.estadosComunService.changeSelectedIndex(0);
  }

  onVisualizar(planSeleccionado) {
    const planAEditar: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
    );
    this.router.navigate([
      this.router.url + '/ver-plan',
      planAEditar[0].codeURL,
    ]);
    localStorage.setItem('visualizar', 'true');
    this.estadosComunService.changeSelectedIndex(0);
  }

  onCrearHallazgo(planSeleccionado) {
    const planAAgregarHallazgo: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
    );
    this.estadosComunService.changePlan(planAAgregarHallazgo[0]);
    this.estadosComunService.changeSelectedIndex(1);
    // this.evPlan.emit(planAAgregarHallazgo[0]);
    // this.evSelectedIndex.emit(1);
    this.router.navigate(['/home/planes-mejora/historial/hallazgos']);
  }
}
